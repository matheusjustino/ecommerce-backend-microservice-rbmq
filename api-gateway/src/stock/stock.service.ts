import { Observable } from 'rxjs';
import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';

// MODELS
import {
	ListStockByMessageModel,
	ListStockMessageModel,
	StockModel,
	UpdateInStockProductMessageModel,
	UpdateProductQuantityStockMessageModel,
} from '@src/shared/stock/models/stock.model';

@Injectable()
export class StockService {
	private readonly logger: Logger = new Logger(StockService.name);
	private clientProxyProductMicro: ClientProxy = null;

	constructor(private readonly clientProxyRmq: ClientProxyRbmq) {
		this.clientProxyProductMicro = this.clientProxyRmq.clientMicroProduct;
	}

	public incrementProductQuantityStock(
		data: UpdateProductQuantityStockMessageModel,
	): Observable<StockModel> {
		this.logger.log(
			`Increment Product Quantity - Payload: ${JSON.stringify(data)}`,
		);

		return this.clientProxyProductMicro.send<
			StockModel,
			UpdateProductQuantityStockMessageModel
		>('increment-product-quantity-stock', data);
	}

	public decrementProductQuantityStock(
		data: UpdateProductQuantityStockMessageModel,
	): Observable<StockModel> {
		this.logger.log(
			`Decrement Product Quantity - Payload: ${JSON.stringify(data)}`,
		);

		return this.clientProxyProductMicro.send<
			StockModel,
			UpdateProductQuantityStockMessageModel
		>('decrement-product-quantity-stock', data);
	}

	public setInStockProduct(
		data: UpdateInStockProductMessageModel,
	): Observable<StockModel> {
		this.logger.log(
			`Set In Stock Product - Payload: ${JSON.stringify(data)}`,
		);

		return this.clientProxyProductMicro.send<
			StockModel,
			UpdateInStockProductMessageModel
		>('set-in-stock-product', data);
	}

	public listStock(data: ListStockMessageModel): Observable<StockModel[]> {
		this.logger.log(`List Stock - Payload: ${JSON.stringify(data)}`);

		return this.clientProxyProductMicro.send<
			StockModel[],
			ListStockMessageModel
		>('list-stock', data);
	}

	public listStockBy(
		data: ListStockByMessageModel,
	): Observable<StockModel[]> {
		this.logger.log(`List Stock - Payload: ${JSON.stringify(data)}`);

		return this.clientProxyProductMicro.send<
			StockModel[],
			ListStockByMessageModel
		>('list-stock-by', data);
	}
}
