import type { NextFunction, Request, Response } from 'express';
import { assert } from 'superstruct';
import type { FeedbackService } from '#services/feedback.service.js';
import type { CreateFeedbackDTO } from '#types/feedback.types.js';
import MESSAGES from '#utils/constants/messages.js';
import { CreateFeedback, PatchFeedback, Uuid } from '#utils/struct.js';

export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  getFeedbacks = async (req: Request, res: Response, next: NextFunction) => {
    const { orderBy = 'latest', page = 1, pageSize = 10 } = req.query;

    const options: { orderBy: string; page: number; pageSize: number } = {
      orderBy: orderBy as string,
      page: parseInt(page as string) ?? 1,
      pageSize: parseInt(pageSize as string) ?? 10,
    };
    const Feedbacks = await this.feedbackService.getFeedbacks(options);

    res.json(Feedbacks);
  };

  getFeedbackById = async (req: Request, res: Response, next: NextFunction) => {
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

  patchFeedback = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(req.body, PatchFeedback, MESSAGES.WRONG_FORMAT);

    const user = await this.feedbackService.updateFeedback(id, req.body);

    res.json(user);
  };

  deleteChallege = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await this.feedbackService.deleteFeedback(id);

    res.json(user);
  };
}

// 챌린지, 작업물 등 관련된 것들

// Feedback, Work, Feedback WorkImage
// 경호님
// 태연님

// User팀이 도와줌
