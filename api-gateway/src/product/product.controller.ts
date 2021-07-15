import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put,
	Query,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';

// INTERFACES
import {
	PRODUCT_SERVICE,
	IProductService,
} from '@src/shared/product/interfaces/product.service';

// MODELS
import { CreateProductModel } from '@src/shared/product/models/create-product.model';
import { ProductModel } from '@src/shared/product/models/product.model';
import { FindProductsQueryModel } from '@src/shared/product/models/find-products-query.model';
import { UpdateProductModel } from '@src/shared/product/models/update-product.model';

// PIPES
import { FindProductsQueryPipe } from '@src/common/pipes/find-products-query.pipe';

@ApiTags('Product')
@Controller('products')
export class ProductController {
	constructor(
		@Inject(PRODUCT_SERVICE)
		private readonly productService: IProductService,
	) {}

	@Post()
	public createProduct(
		@Body() body: CreateProductModel,
	): Observable<ProductModel> {
		return this.productService.createProduct(body);
	}

	@Get()
	public findAll(
		@Query(FindProductsQueryPipe) query: FindProductsQueryModel,
	): Observable<{
		count: number;
		products: ProductModel[];
	}> {
		return this.productService.findAll(query);
	}

	@Get(':id')
	public findById(@Param('id') productId: string): Observable<ProductModel> {
		return this.productService.findById(productId);
	}

	@Put(':id')
	public updateProduct(
		@Param('id') productId: string,
		@Body() body: UpdateProductModel,
	): Observable<ProductModel> {
		return this.productService.updateProduct(productId, body);
	}

	@Delete(':id')
	public deleteProduct(
		@Param('id') productId: string,
	): Observable<ProductModel> {
		return this.productService.deleteProduct(productId);
	}
}
