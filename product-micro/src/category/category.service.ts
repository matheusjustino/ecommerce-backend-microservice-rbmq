import { RpcException } from '@nestjs/microservices';
import { Injectable, Logger } from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap, map } from 'rxjs/operators';

// INTERFACES
import { ICategoryService } from '@src/shared/category/interfaces/category.service';

// REPOSITORES
import { CategoryRepository } from '@src/database/repositories/schema.repository';

// MODELS
import { CreateCategoryMessageModel } from '@src/shared/category/models/create-category-message.model';
import { UpdateCategoryMessageModel } from '@src/shared/category/models/update-category-message.model';
import { CategoryModel } from '@src/shared/category/models/category.model';
import { FindCategoriesMessageModel } from '@src/shared/category/models/find-categories-message.model';

@Injectable()
export class CategoryService implements ICategoryService {
	private readonly logger: Logger = new Logger(CategoryService.name);

	constructor(private readonly categoryRepository: CategoryRepository) {}

	public createCategory(
		data: CreateCategoryMessageModel,
	): Observable<CategoryModel> {
		this.logger.log(`Create Category - Payload: ${JSON.stringify(data)}`);

		return from(this.categoryRepository.categoryModel.create(data)).pipe(
			catchError((err) => {
				this.logger.error(`Create Category Error: ${err}`);
				return throwError(err);
			}),
		);
	}

	public updateCategory(
		data: UpdateCategoryMessageModel,
	): Observable<CategoryModel> {
		this.logger.log(`Create Category - Payload: ${JSON.stringify(data)}`);

		return from(
			this.categoryRepository.categoryModel.findById(data.categoryId),
		).pipe(
			switchMap((category) => {
				if (!category) {
					throw new RpcException('Category not found');
				}

				const updatedCategory = Object.assign(
					category,
					data.updateModel,
				);

				return from(updatedCategory.save());
			}),
			catchError((err) => {
				this.logger.error(`Update Category Error: ${err}`);
				return throwError(err);
			}),
		);
	}

	public findAll(
		query?: FindCategoriesMessageModel,
	): Observable<CategoryModel[]> {
		this.logger.log(
			`Find All Categories - Payload: ${JSON.stringify(query)}`,
		);

		return from(this.categoryRepository.categoryModel.find(query)).pipe(
			map((categories) => categories as CategoryModel[]),
			catchError((err) => {
				this.logger.error(`Update Category Error: ${err}`);
				return throwError(err);
			}),
		);
	}

	public findById(categoryId: string): Observable<CategoryModel> {
		this.logger.log(
			`Find Category By Id - Payload: ${JSON.stringify(categoryId)}`,
		);

		return from(
			this.categoryRepository.categoryModel.findById(categoryId),
		).pipe(
			map((category) => {
				if (!category) {
					throw new RpcException('Category not found');
				}

				return category;
			}),
			catchError((err) => {
				this.logger.error(`Update Category Error: ${err}`);
				return throwError(err);
			}),
		);
	}

	public deleteCategory(categoryId: string): Observable<CategoryModel> {
		this.logger.log(
			`Delete Category - Payload: ${JSON.stringify(categoryId)}`,
		);

		return from(
			this.categoryRepository.categoryModel.findByIdAndDelete(categoryId),
		).pipe(
			map((category) => {
				if (!category) {
					throw new RpcException('Category not found');
				}

				return category;
			}),
			catchError((err) => {
				this.logger.error(`Update Category Error: ${err}`);
				return throwError(err);
			}),
		);
	}
}
