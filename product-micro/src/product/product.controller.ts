import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';

// INTERFACES
import {
	PRODUCT_SERVICE,
	IProductService,
} from '@src/shared/product/interfaces/product.service';

// MODELS
import { CreateProductMessageModel } from '@src/shared/product/models/create-product-message.model';
import { UpdateProductMessageModel } from '@src/shared/product/models/update-product-message.model';
import { ProductModel } from '@src/shared/product/models/product.model';
import { FindProductsQueryModel } from '@src/shared/product/models/find-products-query.model';

@Controller('products')
export class ProductController {
	constructor(
		@Inject(PRODUCT_SERVICE)
		private readonly productService: IProductService,
	) {}

	@EventPattern('create-product')
	public createProduct(
		data: CreateProductMessageModel,
	): Observable<ProductModel> {
		return this.productService.createProduct(data);
	}

	@MessagePattern('find-all-products')
	public findAll(query?: FindProductsQueryModel): Observable<{
		count: number;
		products: ProductModel[];
	}> {
		return this.productService.findAll(query);
	}

	@MessagePattern('find-product-by-id')
	public findById(productId: string): Observable<ProductModel> {
		return this.productService.findById(productId);
	}

	@EventPattern('update-product')
	updateProduct(data: UpdateProductMessageModel): Observable<ProductModel> {
		const { productId, updateModel } = data;

		return this.productService.updateProduct(productId, updateModel);
	}

	@EventPattern('delete-product')
	public deleteProduct(productId: string): Observable<ProductModel> {
		return this.productService.deleteProduct(productId);
	}
}
