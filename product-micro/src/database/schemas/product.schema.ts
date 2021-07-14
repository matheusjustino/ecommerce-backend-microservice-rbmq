import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// MODELS
import { ProductModel } from '@src/shared/product/models/product.model';

@Schema({ timestamps: true })
export class Product implements ProductModel {
	@Prop({ type: String, required: true })
	public name: string;

	@Prop({ type: [String], required: true })
	public category: string[];

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
