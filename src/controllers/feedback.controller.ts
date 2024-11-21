import type { NextFunction, Response } from 'express';
import { assert } from 'superstruct';
import type { FeedbackService } from '#services/feedback.service.js';
import type { BasicOptions, BasicQueries, Request } from '#types/common.types.js';
import type { CreateFeedbackDTO, UpdateFeedbackDTO } from '#types/feedback.types.js';
import MESSAGES from '#utils/constants/messages.js';
import { CreateFeedback, PatchFeedback, Uuid } from '#utils/struct.js';

export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  getFeedbacks = async (req: Request<{ query: BasicQueries }>, res: Response, next: NextFunction) => {
    const { orderBy = 'latest', page = '1', pageSize = '10' } = req.query;

    const options: BasicOptions = {
      orderBy,
      page: parseInt(page, 10) ?? 1,
      pageSize: parseInt(pageSize, 10) ?? 10,
    };
    const Feedbacks = await this.feedbackService.getFeedbacks(options);

    res.json(Feedbacks);
  };

  getFeedbackById = async (req: Request<{ params: { id: string } }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    const Feedback = await this.feedbackService.getFeedbackById(id);

    res.json(Feedback);
  };

  postFeedback = async (req: Request, res: Response, next: NextFunction) => {
    assert(req.body, CreateFeedback, MESSAGES.WRONG_FORMAT);

    const user = await this.feedbackService.createFeedback(req.body as CreateFeedbackDTO);

    res.json(user);
  };

  patchFeedback = async (
    req: Request<{ params: { id: string }; body: UpdateFeedbackDTO }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    assert(req.body, PatchFeedback, MESSAGES.WRONG_FORMAT);

    const user = await this.feedbackService.updateFeedback(id, req.body);

    res.json(user);
  };

  deleteChallege = async (req: Request<{ params: { id: string } }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await this.feedbackService.deleteFeedback(id);

    res.json(user);
  };
}
