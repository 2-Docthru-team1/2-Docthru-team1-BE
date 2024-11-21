import prismaClient from '#connection/postgres.connection.js';
import { ChallengeAuth } from '#middlewares/challengeAuth.js';
import { ChallengeRepository } from '#repositories/challenge.repository.js';

const challengeRepository = new ChallengeRepository(prismaClient);
const challengeAuth = new ChallengeAuth(challengeRepository);

export default challengeAuth;
