import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// INTERFACES
import {
	CATEGORY_SERVICE,
	ICategoryService,
} from '@src/shared/category/interfaces/category.service';

// MODELS
import { CreateCategoryMessageModel } from '@src/shared/category/models/create-category-message.model';
import { FindCategoriesMessageModel } from '@src/shared/category/models/find-categories-message.model';
import { UpdateCategoryMessageModel } from '@src/shared/category/models/update-category-message.model';
import { UpdateCategoryModel } from '@src/shared/category/models/update-category.model';

@ApiTags('Category')
@Controller('categories')
export class CategoryController {
	constructor(
		@Inject(CATEGORY_SERVICE)
		private readonly categoryService: ICategoryService,
	) {}

	@Post()
	public createCategory(@Body() body: CreateCategoryMessageModel) {
		return this.categoryService.createCategory(body);
	}

	@Put(':id')
	public updateCategory(
		@Param('id') categoryId: string,
		@Body() body: UpdateCategoryModel,
	) {
		const updateCategoryMessage: UpdateCategoryMessageModel = {
			categoryId,
			updateModel: body,
		};

		return this.categoryService.updateCategory(updateCategoryMessage);
	}

	@Get()
	public findAll(@Query() query: FindCategoriesMessageModel) {
		return this.categoryService.findAll(query);
	}

	@Get(':id')
	public findById(@Param('id') categoryId: string) {
		return this.categoryService.findById(categoryId);
	}

	@Delete(':id')
	public deleteCategory(@Param('id') categoryId: string) {
		return this.categoryService.deleteCategory(categoryId);
	}
}
