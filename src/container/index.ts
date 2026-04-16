import { prisma } from '@/lib/prisma';

// Category
import { CategoryRepository } from '@/repositories/category.repository';
import { CategoryService } from '@/services/category.service';
import { CategoryController } from '@/controllers/category.controller';

// Repositories
export const categoryRepository = new CategoryRepository(prisma);

// Services
export const categoryService = new CategoryService(categoryRepository);

// Controllers
export const categoryController = new CategoryController(categoryService);
