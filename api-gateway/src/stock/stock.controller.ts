import {
	Controller,
	Inject,
	Param,
	Post,
	Body,
	Put,
	Get,
	Query,
} from '@nestjs/common';

// INTERFACES
import {
	STOCK_SERVICE,
	IStockService,
} from '@src/shared/stock/interfaces/stock.service';

// MODELS
import {
	ListStockByMessageModel,
	ListStockByQueryModel,
	UpdateInStockProductMessageModel,
	UpdateProductQuantityStockMessageModel,
} from '@src/shared/stock/models/stock.model';

@Controller('stock')
export class StockController {
	constructor(
		@Inject(STOCK_SERVICE)
		private readonly stockService: IStockService,
	) {}

	@Put('product/increment')
	public incrementProductQuantityStock(
		@Body() body: UpdateProductQuantityStockMessageModel,
	) {
		return this.stockService.incrementProductQuantityStock(body);
	}

	@Put('product/decrement')
	public decrementProductQuantityStock(
		@Body() body: UpdateProductQuantityStockMessageModel,
	) {
		return this.stockService.decrementProductQuantityStock(body);
	}

	@Put('product/stock-status')
	public setInStockProduct(@Body() body: UpdateInStockProductMessageModel) {
		return this.stockService.setInStockProduct(body);
	}

	@Get('list-stock')
	public listStock(@Query('withDetails') withDetails = false) {
		withDetails = !!JSON.parse(String(withDetails).toLowerCase());
		const data = {
			withProductDetails: withDetails,
		};
		return this.stockService.listStock(data);
	}

	@Get('list-stock-by')
	public listStockBy(@Query() query: ListStockByQueryModel) {
		const categories: string[] = query.categories.split(',');
		const data = {
			categories,
			...query,
		} as ListStockByMessageModel;

		return this.stockService.listStockBy(data);
	}
}
