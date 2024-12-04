import prismaClient from '#connection/postgres.connection.js';
import { UserController } from '#controllers/user.controller.js';
import { UserRepository } from '#repositories/user.repository.js';
import { WorkLikeRepository } from '#repositories/workLike.repository.js';
import { UserService } from '#services/user.service.js';

// 여기서 Repository, Service, Controller를 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const userRepository = new UserRepository(prismaClient);
const workLikeRepository = new WorkLikeRepository(prismaClient);
const userService = new UserService(userRepository, workLikeRepository);
const userController = new UserController(userService);

export default userController;
