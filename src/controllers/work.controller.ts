import type { NextFunction, Response } from 'express';
import { assert } from 'superstruct';
import type { WorkService } from '#services/work.service.js';
import type { Request } from '#types/common.types.js';
//import type { Request } from '#types/common.types.js';
import type { BasicOptions } from '#types/common.types.js';
import { NotFound } from '#types/http-error.types.js';
import { WorkOrder } from '#types/work.types.js';
import { generatePresignedDownloadUrl } from '#utils/S3/generate-presigned-download-url.js';
import { Order } from '#utils/constants/enum.js';
import MESSAGES from '#utils/constants/messages.js';
import { CreateWork, PatchWork, Uuid } from '#utils/struct.js';

export class WorkController {
  constructor(private WorkService: WorkService) {} // 이 부분에서 service에 연결합니다.

  // 여기서 api로써 통신합니다.
  // 요청을 받아오는 부분이자, 응답을 전달하는 부분입니다.
  // 받아온 요청을 분해해서 service에서 요구하는 형식에 맞게 수정해줍니다.
  // 요청의 유효성 검사는 middleware를 작성해 route단에서 하는 것이 좋습니다.
  // 간단한 유효성 검사라면 이곳에 작성해도 됩니다.
  // 응답의 status를 지정하고, body를 전달합니다.
  getWorks = async (req: Request<{ params: { id: string }; query: BasicOptions }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { orderBy = 'favoritest', page = '1', pageSize = '4' } = req.query;
    const finalOrderBy: WorkOrder = orderBy in WorkOrder ? (orderBy as WorkOrder) : WorkOrder.recent;
    const options: { challengeId: string; orderBy: WorkOrder; page: number; pageSize: number } = {
      challengeId: id,
      orderBy: finalOrderBy,
      page: parseInt(page, 10),
      pageSize: parseInt(pageSize, 10),
    };
    const result = await this.WorkService.getWorks(options);
    res.json(result);
  };
  getWorkById = async (req: Request<{ params: { id: string } }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);
    const work = await this.WorkService.getWorkById(id);
    if (!work) {
      const error = new NotFound(MESSAGES.WORK_NOT_FOUND);
      throw error;
    }
    res.json(work);
  };

  postWork = async (req: Request, res: Response, next: NextFunction) => {
    assert(req.body, CreateWork, MESSAGES.WRONG_FORMAT);

    // const user = await this.WorkService.createWork(req.body);

    // res.json(user);
  };

  patchWork = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(req.body, PatchWork, MESSAGES.WRONG_FORMAT);

    // const user = await this.WorkService.updateWork(id, req.body);

    // res.json(user);
  };

  deleteChallege = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await this.WorkService.deleteWork(id);

    res.json(user);
  };
}

// 챌린지, 작업물 등 관련된 것들

// Work, Work, Feedback WorkImage
// 경호님
// 태연님

// User팀이 도와줌
