import prismaClient from '#connection/postgres.connection.js';
import { WorkController } from '#controllers/work.controller.js';
import { WorkRepository } from '#repositories/work.repository.js';
import { WorkService } from '#services/work.service.js';

// 여기서 Repository, Service, Controller를 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const workRepository = new WorkRepository(prismaClient);
const workService = new WorkService(workRepository);
const workController = new WorkController(workService);

export default workController;
