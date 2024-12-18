import { Category } from '@prisma/client';
import type { BasicOptions, BasicQueries } from '#types/common.types.js';

export interface RecipeQueries extends Omit<BasicQueries, 'orderBy'> {
  filter?: string;
  keyword?: string;
}

export interface RecipeOptions extends Omit<BasicOptions, 'orderBy'> {
  orderBy?: string;
  category?: Category;
  keyword?: string;
}

export interface CreateRecipeDTO {
  title: string;
  ingredients: string[];
  benefits: string[];
  likeCount: number;
  category: Category;
  direction: string[];
  servings: number;
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
  sugars: number;
  sodium: number;
  fiber: number;
  images: string[];
}

export interface UpdateRecipeDTO {
  title?: string;
  ingredients?: string[];
  benefits?: string[];
  likeCount?: number;
  category?: Category;
  direction?: string[];
  servings?: number;
  calories?: number;
  carbs?: number;
  protein?: number;
  fat?: number;
  sugars?: number;
  sodium?: number;
  fiber?: number;
  images?: string[];
}
