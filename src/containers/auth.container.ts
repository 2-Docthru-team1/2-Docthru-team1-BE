import prismaClient from '#connection/postgres.connection.js';
import { AuthController } from '#controllers/auth.controller.js';
import { UserRepository } from '#repositories/user.repository.js';
import { AuthService } from '#services/auth.service.js';

// 여기서 Repository, Service, Controller를 연결합니다. 그리고 컨트롤러를 export 해줍니다.
const authRepository = new UserRepository(prismaClient);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

export default authController;
