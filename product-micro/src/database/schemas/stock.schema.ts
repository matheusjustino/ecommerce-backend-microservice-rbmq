import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// SCHEMAS
import { Product, ProductDocument } from '@src/database/schemas/product.schema';

// MODELS
import { StockModel } from '@src/shared/stock/models/stock.model';

@Schema({ timestamps: true })
export class Stock implements StockModel {
	@Prop({
		type: Types.ObjectId,
		ref: Product.name,
		required: true,
		unique: true,
	})
	public product: ProductDocument;

	@Prop({ type: Number, required: true, default: 0 })
	public quantity: number;

	@Prop({ type: Boolean, required: true, default: false })
	public inStock: boolean;
}

export type StockDocument = Stock & Document;
export const StockSchema = SchemaFactory.createForClass(Stock);
