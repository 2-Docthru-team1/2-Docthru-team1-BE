import prismaClient from '#connection/postgres.connection.js';
import { ChallengeController } from '#controllers/challenge.controller.js';
import { ChallengeRepository } from '#repositories/challenge.repository.js';
import { ChallengeService } from '#services/challenge.service.js';

// 여기서 Repository, Service, Controller를 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const challengeRepository = new ChallengeRepository(prismaClient);
const challengeService = new ChallengeService(challengeRepository);
const challengeController = new ChallengeController(challengeService);

export default challengeController;
