import { Observable } from 'rxjs';

// MODELS
import { CreateProductModel } from '@src/shared/product/models/create-product.model';
import { UpdateProductModel } from '@src/shared/product/models/update-product.model';
import { ProductModel } from '@src/shared/product/models/product.model';
import { FindProductsQueryModel } from '../models/find-products-query.model';

export const PRODUCT_SERVICE = 'PRODUCT_SERVICE';

export interface IProductService {
	createProduct(data: CreateProductModel): Observable<ProductModel>;
	findAll(query?: FindProductsQueryModel): Observable<{
		count: number;
		products: ProductModel[];
	}>;
	findById(productId: string): Observable<ProductModel>;
	updateProduct(
		productId: string,
		data: UpdateProductModel,
	): Observable<ProductModel>;
	deleteProduct(productId: string): Observable<ProductModel>;
}
