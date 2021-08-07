import { catchError, map, switchMap } from 'rxjs/operators';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { from, Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

// REPOSITORIES
import { ProductRepository } from '@src/database/repositories/product.repository';
import { CategoryRepository } from '@src/database/repositories/schema.repository';

// INTERFACES
import { IProductService } from '@src/shared/product/interfaces/product.service';
import {
	STOCK_SERVICE,
	IStockService,
} from '@src/shared/stock/interfaces/stock.service';

// MODELS
import { CreateProductMessageModel } from '@src/shared/product/models/create-product-message.model';
import { FindProductsQueryModel } from '@src/shared/product/models/find-products-query.model';
import { UpdateProductModel } from '@src/shared/product/models/update-product.model';
import { ProductModel } from '@src/shared/product/models/product.model';
import { CreateProductStockMessageModel } from '@src/shared/stock/models/stock.model';

// SCHEMAS
import { CategoryDocument } from '@src/database/schemas/category.schema';

@Injectable()
export class ProductService implements IProductService {
	private logger = new Logger(ProductService.name);

	constructor(
		@Inject(STOCK_SERVICE)
		private readonly stockService: IStockService,
		private readonly productRepository: ProductRepository,
		private readonly categoryRepository: CategoryRepository,
	) {}

	public createProduct(
		data: CreateProductMessageModel,
	): Observable<ProductModel> {
		this.logger.log(`Create Product - Payload: ${JSON.stringify(data)}`);

		const product = new this.productRepository.productModel(data);
		const productStock: CreateProductStockMessageModel = {
			product: product._id,
			quantity: 0,
			inStock: false,
		};

		return from(this.stockService.createProductStock(productStock)).pipe(
			switchMap(() => {
				return from(
					this.categoryRepository.categoryModel.find({
						_id: {
							$in: data.category,
						},
					}),
				);
			}),
			switchMap((categories: CategoryDocument[]) => {
				if (!categories || categories.length !== data.category.length) {
					throw new RpcException('Some category does not exists');
				}

				return from(product.save());
			}),
			catchError((err) => {
				this.logger.error(
					`Create Product Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}

	public findAll(query?: FindProductsQueryModel): Observable<{
		count: number;
		products: ProductModel[];
	}> {
		this.logger.log(`Get All Products - Payload: ${JSON.stringify(query)}`);

		const { sort, price, category, page, perPage } = query;

		const { sortValues, priceRange, categoryValue } =
			this.mappingSortValues(sort, price, category);

		return from(
			this.productRepository.productModel
				.find({
					...categoryValue,
					...priceRange,
				})
				.sort(sortValues)
				.limit(perPage)
				.skip(perPage * page),
		).pipe(
			map((products) => {
				if (!products) {
					throw new RpcException('Products not found');
				}

				return {
					count: (products as ProductModel[]).length,
					products: products as ProductModel[],
				};

				// return from(this.countProducts()).pipe(
				// 	map((productsNumber) => {
				// 		return {
				// 			count: productsNumber,
				// 			products: products as ProductModel[],
				// 		};
				// 	}),
				// );
			}),
			catchError((err) => {
				this.logger.error(
					`Get All Products Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}

	public findById(productId: string): Observable<ProductModel> {
		this.logger.log(`Get Products By Id - Payload: ${productId}`);

		return from(
			this.productRepository.productModel
				.findById(productId)
				.populate('category'),
		).pipe(
			map((product) => {
				if (!product) {
					throw new RpcException('Product not found');
				}

				return product;
			}),
			catchError((err) => {
				this.logger.error(
					`Get Product By Id Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}

	public updateProduct(
		productId: string,
		updateModel: UpdateProductModel,
	): Observable<ProductModel> {
		this.logger.log(
			`Update Product - Payload: ${{ productId, updateModel }}`,
		);

		return from(
			this.productRepository.productModel.findByIdAndUpdate(
				productId,
				{
					$set: updateModel,
				},
				{
					new: true,
				},
			),
		).pipe(
			map((product) => {
				if (!product) {
					throw new RpcException('Product not found');
				}

				return product;
			}),
			catchError((err) => {
				this.logger.error(
					`Update Product Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}

	public deleteProduct(productId: string): Observable<ProductModel> {
		this.logger.log(`Update Product - Payload: ${productId}`);

		return from(
			this.productRepository.productModel.findByIdAndDelete(productId),
		).pipe(
			map((product) => {
				if (!product) {
					throw new RpcException('Product not found');
				}

				return product;
			}),
			catchError((err) => {
				this.logger.error(
					`Delete Product Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}

	private countProducts(): Observable<number> {
		return from(this.productRepository.productModel.countDocuments()).pipe(
			map((result) => result as number),
			catchError((err) => {
				this.logger.error(
					`Count Products Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}

	private mappingSortValues(sort: string, price: string, category: string) {
		const sortValues = {};
		const priceRange = {};
		let categoryValue;

		if (sort === 'lowest') {
			sortValues['price'] = 1;
		} else if (sort === 'biggest') {
			sortValues['price'] = -1;
		} else if (sort === 'new') {
			sortValues['createdAt'] = -1;
		} else if (sort === 'az') {
			sortValues['name'] = 1;
		} else if (sort === 'za') {
			sortValues['name'] = -1;
		}

		if (price) {
			const priceSplit = price.split('-');
			if (priceSplit.length > 1) {
				priceRange['price'] = {
					$lte: priceSplit[1] || 1000000000,
					$gte: priceSplit[0] || -1,
				};
			} else if (price.includes('600.01')) {
				priceRange['price'] = {
					$gte: price.split('+')[0],
				};
			}
		}

		if (category && category !== '' && category !== 'all') {
			categoryValue = {
				category,
			};
		}

		return {
			sortValues,
			priceRange,
			categoryValue,
		};
	}
}
