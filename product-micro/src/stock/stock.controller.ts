import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

// INTERFACES
import {
	IStockService,
	STOCK_SERVICE,
} from '@src/shared/stock/interfaces/stock.service';

// MODELS
import {
	CreateProductStockMessageModel,
	DeleteProductStockMessageModel,
	GetProductStockMessageModel,
	ListStockByMessageModel,
	ListStockMessageModel,
	UpdateInStockProductMessageModel,
	UpdateProductQuantityStockMessageModel,
} from '@src/shared/stock/models/stock.model';

@Controller('stock')
export class StockController {
	constructor(
		@Inject(STOCK_SERVICE)
		private readonly stockService: IStockService,
	) {}

	@MessagePattern('create-product-stock')
	public createProductStock(data: CreateProductStockMessageModel) {
		return this.stockService.createProductStock(data);
	}

	@MessagePattern('increment-product-quantity-stock')
	public incrementProductQuantityStock(
		data: UpdateProductQuantityStockMessageModel,
	) {
		return this.stockService.incrementProductQuantityStock(data);
	}

	@MessagePattern('decrement-product-quantity-stock')
	public decrementProductQuantityStock(
		data: UpdateProductQuantityStockMessageModel,
	) {
		return this.stockService.decrementProductQuantityStock(data);
	}

	@MessagePattern('set-in-stock-product')
	public setInStockProduct(data: UpdateInStockProductMessageModel) {
		return this.stockService.setInStockProduct(data);
	}

	@MessagePattern('list-stock')
	public listStock(data: ListStockMessageModel) {
		return this.stockService.listStock(data);
	}

	@MessagePattern('list-stock-by')
	public listStockBy(data: ListStockByMessageModel) {
		return this.stockService.listStockBy(data);
	}

	@MessagePattern('get-product-stock')
	public getProductStock(data: GetProductStockMessageModel) {
		return this.stockService.getProductStock(data);
	}

	@MessagePattern('delete-product-stock')
	public deleteProductStock(data: DeleteProductStockMessageModel) {
		return this.stockService.deleteProductStock(data);
	}
}
