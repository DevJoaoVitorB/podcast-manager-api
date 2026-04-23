import { prisma } from '@/lib/prisma';

// Category
import { CategoryRepository } from '@/repositories/category.repository';
import { CategoryService } from '@/services/category.service';
import { CategoryController } from '@/controllers/category.controller';

// Episode
import { EpisodeRepository } from '@/repositories/episode.repository';
import { EpisodeService } from '@/services/episode.service';
import { EpisodeController } from '@/controllers/episode.controller';

// Repositories
export const categoryRepository = new CategoryRepository(prisma);
export const episodeRepository = new EpisodeRepository(prisma);

// Services
export const categoryService = new CategoryService(categoryRepository);
export const episodeService = new EpisodeService(episodeRepository);

// Controllers
export const categoryController = new CategoryController(categoryService);
export const episodeController = new EpisodeController(episodeService);

// Routes
export { categoryRoutes } from '@/routes/category.routes';
export { episodeRoutes } from '@/routes/episode.routes';
