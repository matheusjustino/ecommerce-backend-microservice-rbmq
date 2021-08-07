import { StockDocument } from './../database/schemas/stock.schema';
import { RpcException } from '@nestjs/microservices';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Injectable, Logger } from '@nestjs/common';
import { Observable, from, throwError } from 'rxjs';
import { Types } from 'mongoose';

// REPOSITORIES
import { StockRepository } from '@src/database/repositories/stock.repository';

// INTERFACES
import { IStockService } from '@src/shared/stock/interfaces/stock.service';

// MODELS
import {
	CreateProductStockMessageModel,
	GetProductStockMessageModel,
	ListStockByMessageModel,
	ListStockMessageModel,
	StockModel,
	UpdateInStockProductMessageModel,
	UpdateProductQuantityStockMessageModel,
} from '@src/shared/stock/models/stock.model';

@Injectable()
export class StockService implements IStockService {
	private readonly logger: Logger = new Logger(StockService.name);

	constructor(private readonly stockRepository: StockRepository) {}

	public createProductStock(
		data: CreateProductStockMessageModel,
	): Observable<StockModel> {
		this.logger.log(
			`Create Product Stock - Payload: ${JSON.stringify(data)}`,
		);

		return from(this.stockRepository.stockModel.create(data)).pipe(
			map((stock) => stock as StockModel),
			catchError((err) => {
				this.logger.error(
					`Create Product Stock Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}

	public incrementProductQuantityStock(
		data: UpdateProductQuantityStockMessageModel,
	) {
		this.logger.log(
			`Increment Product Quantity - Payload: ${JSON.stringify(data)}`,
		);

		const { product, quantity } = data;

		return from(
			this.stockRepository.stockModel.findOne().where({
				product: Types.ObjectId(product),
			}),
		).pipe(
			switchMap((productStock) => {
				productStock.quantity += quantity;
				productStock.inStock = productStock.quantity > 0 && true;
				return from(productStock.save());
			}),
			map((updatedProductStock) => updatedProductStock as StockModel),
			catchError((err) => {
				this.logger.error(
					`Increment Product Quantity Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}

	public decrementProductQuantityStock(
		data: UpdateProductQuantityStockMessageModel,
	): Observable<StockModel> {
		this.logger.log(
			`Decrement Product Quantity - Payload: ${JSON.stringify(data)}`,
		);

		const { product, quantity } = data;

		return from(
			this.stockRepository.stockModel.findOne().where({
				product: Types.ObjectId(product),
			}),
		).pipe(
			switchMap((productStock: StockDocument) => {
				const finalQuantityProductStock =
					productStock.quantity - quantity;

				if (finalQuantityProductStock >= 1) {
					productStock.quantity -= quantity;
				} else if (finalQuantityProductStock === 0) {
					productStock.quantity -= quantity;
					productStock.inStock = false;
				} else {
					throw new RpcException('Insufficient Stock');
				}

				return from(productStock.save());
			}),
			map((stock) => stock as StockModel),
			catchError((err) => {
				this.logger.error(
					`Decrement Product Quantity Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}

	public setInStockProduct(
		data: UpdateInStockProductMessageModel,
	): Observable<StockModel> {
		this.logger.log(
			`Set In Stock Product - Payload: ${JSON.stringify(data)}`,
		);

		const { product, inStock } = data;

		return from(
			this.stockRepository.stockModel.findByIdAndUpdate(
				product,
				{
					$set: {
						inStock,
					},
				},
				{ new: true },
			),
		).pipe(
			map((stock) => stock as StockModel),
			catchError((err) => {
				this.logger.error(
					`Set In Stock Product Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}

	public listStock(data: ListStockMessageModel): Observable<StockModel[]> {
		this.logger.log(`List Stock - Payload: ${JSON.stringify(data)}`);

		if (data.withProductDetails) {
			return from(
				this.stockRepository.stockModel.find().populate('product'),
			).pipe(
				map((stocks) => stocks as StockModel[]),
				catchError((err) => {
					this.logger.error(
						`List Stock Error: ${JSON.stringify(err)}`,
					);

					return throwError(err);
				}),
			);
		} else {
			return from(this.stockRepository.stockModel.find()).pipe(
				map((stocks) => stocks as StockModel[]),
				catchError((err) => {
					this.logger.error(
						`List Stock Error: ${JSON.stringify(err)}`,
					);

					return throwError(err);
				}),
			);
		}
	}

	public listStockBy(data: ListStockByMessageModel) {
		this.logger.log(`List Stock By - Payload: ${JSON.stringify(data)}`);

		let { categories, quantity, inStock } = data;

		if (!Array.isArray(categories)) {
			categories = [categories];
		}

		console.log(categories);
		return from(
			this.stockRepository.stockModel.find().where({
				'product.category': {
					$in: [Types.ObjectId(categories[0])],
				},
			}),
		) as any;
		// return from(
		// 	this.stockRepository.stockModel.aggregate([
		// 		{
		// 			$lookup: {
		// 				from: 'categories',
		// 				pipeline: [
		// 					{
		// 						$match: {
		// 							_id: {
		// 								$in: [Types.ObjectId(categories[0])],
		// 							},
		// 						},
		// 					},
		// 				],
		// 				as: 'match',
		// 			},
		// 		},
		// 	]),
		// ).pipe(
		// 	map((stocks) => stocks as StockModel[]),
		// 	catchError((err) => {
		// 		this.logger.error(
		// 			`List Stock By Error: ${JSON.stringify(err)}`,
		// 		);

		// 		return throwError(err);
		// 	}),
		// );
	}

	// .where({
	// 	'product.category': {
	// 		$nin: [Types.ObjectId('60ef7defab1eea2228189eb1')],
	// 	},
	// })

	public getProductStock(
		data: GetProductStockMessageModel,
	): Observable<StockModel> {
		this.logger.log(`Get Product Stock - Payload: ${JSON.stringify(data)}`);

		return from(
			this.stockRepository.stockModel.findOne({
				'product._id': data.productId,
			}),
		).pipe(
			map((stocks) => stocks as StockModel),
			catchError((err) => {
				this.logger.error(
					`Get Product Stock Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}

	public deleteProductStock(
		data: GetProductStockMessageModel,
	): Observable<StockModel> {
		this.logger.log(
			`Delete Product Stock - Payload: ${JSON.stringify(data)}`,
		);

		return from(
			this.stockRepository.stockModel.findByIdAndDelete({
				'product._id': data.productId,
			}),
		).pipe(
			map((stocks) => stocks as StockModel),
			catchError((err) => {
				this.logger.error(
					`Delete Product Stock Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}
}
