import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';

// MODELS
import { CategoryModel } from '@src/shared/category/models/category.model';
import { CreateCategoryMessageModel } from '@src/shared/category/models/create-category-message.model';
import { UpdateCategoryMessageModel } from '@src/shared/category/models/update-category-message.model';
import { FindCategoriesMessageModel } from '@src/shared/category/models/find-categories-message.model';

// INTERFACES
import { ICategoryService } from '@src/shared/category/interfaces/category.service';

@Injectable()
export class CategoryService implements ICategoryService {
	private logger = new Logger(CategoryService.name);
	private clientProxyProductMicro: ClientProxy = null;

	constructor(private readonly clientProxyRmq: ClientProxyRbmq) {
		this.clientProxyProductMicro = this.clientProxyRmq.clientMicroProduct;
	}

	public createCategory(
		data: CreateCategoryMessageModel,
	): Observable<CategoryModel> {
		this.logger.log(`Create Category - Payload: ${JSON.stringify(data)}`);

		return from(
			this.clientProxyProductMicro.send('create-category', data),
		).pipe(
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
			this.clientProxyProductMicro.emit('update-category', data),
		).pipe(
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

		return from(
			this.clientProxyProductMicro.send('find-all-categories', query),
		).pipe(
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
			this.clientProxyProductMicro.send('find-by-id', categoryId),
		).pipe(
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
			this.clientProxyProductMicro.emit('delete-category', categoryId),
		).pipe(
			catchError((err) => {
				this.logger.error(`Update Category Error: ${err}`);
				return throwError(err);
			}),
		);
	}
}
