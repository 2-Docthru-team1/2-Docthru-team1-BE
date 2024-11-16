import type { IWorkService } from '#interfaces/services/work.service.interface.js';
import type { WorkRepository } from '#repositories/work.repository.js';
import type { ChallengeWork, CreateWorkDTO, UpdateWorkDTO } from '#types/work.types.js';

export class WorkService implements IWorkService {
  constructor(private WorkRepository: WorkRepository) {} // 이 부분에 Repository를 연결합니다.

  // 이 아래로 데이터를 가공하는 코드를 작성합니다.
  // 비즈니스 로직, DB에서 가져온 데이터를 가공하는 코드가 주로 작성됩니다.
  // 여기서 가공된 데이터를 controller로 올려줍니다.
  getWorks = async (options: { orderBy: string; page: number; pageSize: number }): Promise<ChallengeWork[] | null> => {
    const Works = await this.WorkRepository.findMany(options);

    return Works;
  };

  getWorkById = async (id: string): Promise<ChallengeWork | null> => {
    const Work = await this.WorkRepository.findById(id);

    return Work;
  };

  createWork = async (WorkData: CreateWorkDTO): Promise<ChallengeWork> => {
    const Work = await this.WorkRepository.create(WorkData);

    return Work;
  };

  updateWork = async (id: string, WorkData: UpdateWorkDTO): Promise<ChallengeWork> => {
    const Work = await this.WorkRepository.update(id, WorkData);
    return Work;
  };

  deleteWork = async (id: string): Promise<ChallengeWork> => {
    const Work = await this.WorkRepository.delete(id);

    return Work;
  };
}
