import { Controller, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

// INTERFACES
import { CATEGORY_SERVICE } from '@src/shared/category/interfaces/category.service';
import { FindCategoriesMessageModel } from '@src/shared/category/models/find-categories-message.model';

// MODELS
import { CreateCategoryMessageModel } from '@src/shared/category/models/create-category-message.model';
import { UpdateCategoryMessageModel } from '@src/shared/category/models/update-category-message.model';

// INTERFACES
import { ICategoryService } from '@src/shared/category/interfaces/category.service';

@Controller('category')
export class CategoryController {
	constructor(
		@Inject(CATEGORY_SERVICE)
		private readonly categoryService: ICategoryService,
	) {}

	@MessagePattern('create-category')
	public createCategory(data: CreateCategoryMessageModel) {
		return this.categoryService.createCategory(data);
	}

	@EventPattern('update-category')
	public updateCategory(data: UpdateCategoryMessageModel) {
		return this.categoryService.updateCategory(data);
	}

	@MessagePattern('find-all-categories')
	public findAll(data: FindCategoriesMessageModel) {
		return this.categoryService.findAll(data);
	}

	@MessagePattern('find-by-id')
	public findById(categoryId: string) {
		return this.categoryService.findById(categoryId);
	}

	@EventPattern('delete-category')
	public deleteCategory(categoryId: string) {
		return this.categoryService.deleteCategory(categoryId);
	}
}
