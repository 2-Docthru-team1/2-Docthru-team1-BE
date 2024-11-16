import { Router } from 'express';
import type { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


const router = Router();

// 레시피 목록 조회 API
router.get('/recipes', async (req: Request, res: Response) => {
  try {
    // 페이지네이션 관련 파라미터
    const { page = '1', limit = '10' } = req.query;
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // 레시피 목록을 가져오기
    const recipes = await prisma.recipe.findMany({
      skip,
      take: limitNumber,
    });

    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Error fetching recipes' });
  }
});

// 레시피 개별 조회 API
router.get('/recipes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // 특정 레시피 조회
    const recipe = await prisma.recipe.findUnique({
      where: { id },
    });

    if (recipe) {
      res.status(200).json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (error) {
    console.error('Error fetching recipe:', error);
    res.status(500).json({ message: 'Error fetching recipe' });
  }
});

export default router;
