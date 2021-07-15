import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// MODELS
import { CategoryModel } from '@src/shared/category/models/category.model';

@Schema({ timestamps: true })
export class Category implements CategoryModel {
	@Prop({ type: String, required: true })
	public name: string;

	@Prop({ type: String, required: true })
	public description: string;

	@Prop({ type: String, required: true })
	public image: string;

	@Prop({ type: [], default: [] })
	public customAttributes: [];
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
