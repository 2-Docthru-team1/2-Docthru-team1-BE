import type { FeedbackService } from '#services/feedback.service.js';
import MESSAGES from '#utils/constants/messages.js';
import { CreateFeedback, PatchFeedback, Uuid } from '#utils/struct.js';
import type { NextFunction, Request, Response } from 'express';
import { assert } from 'superstruct';

export class FeedbackController {
  constructor(private FeedbackService: FeedbackService) {} // 이 부분에서 service에 연결합니다.

  // 여기서 api로써 통신합니다.
  // 요청을 받아오는 부분이자, 응답을 전달하는 부분입니다.
  // 받아온 요청을 분해해서 service에서 요구하는 형식에 맞게 수정해줍니다.
  // 요청의 유효성 검사는 middleware를 작성해 route단에서 하는 것이 좋습니다.
  // 간단한 유효성 검사라면 이곳에 작성해도 됩니다.
  // 응답의 status를 지정하고, body를 전달합니다.
  getFeedbacks = async (
    req: Request<{}, {}, {}, { orderBy: string; page: string; pageSize: string }>,
    res: Response,
    next: NextFunction,
  ) => {
    const { orderBy, page, pageSize } = req.query;

    const options: { orderBy: string; page: number; pageSize: number } = {
      orderBy,
      page: Number(page),
      pageSize: Number(pageSize),
    };
    const Feedback = await this.FeedbackService.getFeedbacks(options);

    res.json(Feedback);
  };

  getFeedbackById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);

    const Feedback = await this.FeedbackService.getFeedbackById(id);

    res.json(Feedback);
  };

  postFeedback = async (req: Request, res: Response, next: NextFunction) => {
    assert(req.body, CreateFeedback, MESSAGES.WRONG_FORMAT);

    const user = await this.FeedbackService.createFeedback(req.body);

    res.json(user);
  };

  patchFeedback = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(req.body, PatchFeedback, MESSAGES.WRONG_FORMAT);

    const user = await this.FeedbackService.updateFeedback(id, req.body);

    res.json(user);
  };

  deleteChallege = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await this.FeedbackService.deleteFeedback(id);

    res.json(user);
  };
}

// 챌린지, 작업물 등 관련된 것들

// Feedback, Work, Feedback WorkImage
// 경호님
// 태연님

// User팀이 도와줌
