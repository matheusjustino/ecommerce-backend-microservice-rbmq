import { Observable } from 'rxjs';

// MODELS
import {
	CreateProductStockMessageModel,
	StockModel,
	ListStockMessageModel,
	ListStockByMessageModel,
	GetProductStockMessageModel,
	DeleteProductStockMessageModel,
	UpdateProductQuantityStockMessageModel,
	UpdateInStockProductMessageModel,
} from '../models/stock.model';

export const STOCK_SERVICE = 'STOCK SERVICE';

export interface IStockService {
	createProductStock(
		data: CreateProductStockMessageModel,
	): Observable<StockModel>;
	incrementProductQuantityStock(
		data: UpdateProductQuantityStockMessageModel,
	): Observable<StockModel>;
	decrementProductQuantityStock(
		data: UpdateProductQuantityStockMessageModel,
	): Observable<StockModel>;
	setInStockProduct(
		data: UpdateInStockProductMessageModel,
	): Observable<StockModel>;
	listStock(data: ListStockMessageModel): Observable<StockModel[]>;
	listStockBy(data: ListStockByMessageModel): Observable<StockModel[]>;
	getProductStock(data: GetProductStockMessageModel): Observable<StockModel>;
	deleteProductStock(
		data: DeleteProductStockMessageModel,
	): Observable<StockModel>;
}
