import prismaClient from '#connection/postgres.connection.js';
import { RequestController } from '#controllers/request.controller.js';
import { RequestRepository } from '#repositories/request.repository.js';
import { RequestService } from '#services/request.service.js';

// 여기서 Repository, Service, Controller를 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const requestRepository = new RequestRepository(prismaClient);
const requestService = new RequestService(requestRepository);
const requestController = new RequestController(requestService);

export default requestController;
