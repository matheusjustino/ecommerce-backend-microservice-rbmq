import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// MODELS
import { ProductModel } from '@src/shared/product/models/product.model';

// SCHEMAS
import { Category, CategoryDocument } from './category.schema';

@Schema({ timestamps: true })
export class Product implements ProductModel {
	@Prop({ type: String, required: true })
	public name: string;

	@Prop({ type: [Types.ObjectId], required: true, ref: Category.name })
	public category: CategoryDocument[];

	@Prop({ type: String, required: true })
	public description: string;

	@Prop({ type: [{}], required: false })
	public specification: {
		[key: string]: {};
	}[];

	@Prop({ type: Number, required: true })
	public price: number;
}

export type ProductDocument = Product & Document;
export const ProductSchema = SchemaFactory.createForClass(Product);
