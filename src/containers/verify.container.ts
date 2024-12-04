import prismaClient from '#connection/postgres.connection.js';
import { TokenVerifier } from '#middlewares/token.verifier.js';
import { UserRepository } from '#repositories/user.repository.js';
import { WorkLikeRepository } from '#repositories/workLike.repository.js';
import { UserService } from '#services/user.service.js';

const userRepository = new UserRepository(prismaClient);
const workLikeRepository = new WorkLikeRepository(prismaClient);
const userService = new UserService(userRepository, workLikeRepository);
const tokenVerifier = new TokenVerifier(userService);

export default tokenVerifier;
