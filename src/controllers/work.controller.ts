import type { NextFunction, Response } from 'express';
import { assert } from 'superstruct';
import type { WorkService } from '#services/work.service.js';
import type { BasicQueries, Request } from '#types/common.types.js';
import { type RequestCreateWorkDTO, type UpdateWorkDTO } from '#types/work.types.js';
import MESSAGES from '#utils/constants/messages.js';
import { CreateWork, PatchWork, Uuid } from '#utils/struct.js';

export class WorkController {
  constructor(private WorkService: WorkService) {}

  getWorks = async (req: Request<{ params: { id: string }; query: BasicQueries }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { page = '1', pageSize = '4' } = req.query;
    const options: { challengeId: string; page: number; pageSize: number } = {
      challengeId: id,
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

    res.json(work);
  };

  postWork = async (req: Request<{ params: { id: string }; body: RequestCreateWorkDTO }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);
    assert(req.body, CreateWork, MESSAGES.WRONG_FORMAT);
    const { title, content, imageCount } = req.body;
    const workData = {
      challengeId: id,
      title,
      content,
      imageCount,
    };
    const work = await this.WorkService.createWork(workData);
    res.json(work);
  };

  patchWork = async (req: Request<{ params: { id: string }; body: UpdateWorkDTO }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);
    assert(req.body, PatchWork, MESSAGES.WRONG_FORMAT);
    const work = await this.WorkService.updateWork(id, req.body);
    res.json(work);
  };

  deleteWork = async (req: Request<{ params: { id: string } }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);
    const work = await this.WorkService.deleteWork(id);
    res.json(work);
  };

  likeWork = async (req: Request<{ params: { id: string } }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);
    const work = await this.WorkService.likeWork(id);
    res.sendStatus(204);
  };

  unlikeWork = async (req: Request<{ params: { id: string } }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    assert(id, Uuid, MESSAGES.WRONG_ID_FORMAT);
    const work = await this.WorkService.unlikeWork(id);
    res.sendStatus(204);
  };
}
