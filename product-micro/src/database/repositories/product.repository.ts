import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import { Product, ProductDocument } from '@src/database/schemas/product.schema';

@Injectable()
export class ProductRepository {
	constructor(
		@InjectModel(Product.name)
		private readonly ProductModel: Model<ProductDocument>,
	) {}

	public get productModel(): Model<ProductDocument> {
		return this.ProductModel;
	}
}
