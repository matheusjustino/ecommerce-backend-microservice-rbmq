import { ProductModel } from '@src/shared/product/models/product.model';

export class StockModel {
	public _id?: string;
	public product: ProductModel;
	public quantity: number;
	public inStock: boolean;
	public createdAt?: Date;
	public UpdatedAt?: Date;
}

export class CreateProductStockMessageModel {
	public product: string;
	public quantity: number;
	public inStock?: boolean;
}

export class UpdateProductStockMessageModel {
	public product: string;
	public quantity?: number;
	public inStock?: boolean;
}

export class UpdateProductQuantityStockMessageModel {
	public product: string;
	public quantity: number;
}

export class UpdateInStockProductMessageModel {
	public product: string;
	public inStock: boolean;
}

export class ListStockMessageModel {
	public withProductDetails?: boolean = false;
}

export class ListStockByQueryModel {
	public categories?: string;
	public quantity?: number;
	public inStock?: boolean;
}

export class ListStockByMessageModel {
	public categories?: string[];
	public quantity?: number;
	public inStock?: boolean;
}

export class GetProductStockMessageModel {
	public productId: string;
}

export class DeleteProductStockMessageModel {
	public productId: string;
}
