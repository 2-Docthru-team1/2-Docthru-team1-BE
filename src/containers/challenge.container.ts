import prismaClient from '#connection/postgres.connection.js';
import { ChallengeController } from '#controllers/challenge.controller.js';
import { ChallengeRepository } from '#repositories/challenge.repository.js';
import { ChallengeService } from '#services/challenge.service.js';

const challengeRepository = new ChallengeRepository(prismaClient);
const challengeService = new ChallengeService(challengeRepository);
const challengeController = new ChallengeController(challengeService);

export default challengeController;
