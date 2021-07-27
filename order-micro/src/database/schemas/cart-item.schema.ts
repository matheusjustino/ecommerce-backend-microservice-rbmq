import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// MODELS
import { CartItemModel } from '@src/shared/cart/models/cart.model';

@Schema({ timestamps: true })
export class CartItem implements CartItemModel {
	@Prop({ type: Types.ObjectId, required: true })
	public productId: Types.ObjectId;

	@Prop({ type: String, required: true })
	public productName: string;

	@Prop({ type: Number, required: true, default: 0 })
	public quantity: number;

	@Prop({ type: Number, required: true, default: 0 })
	public price: number;

	@Prop({ type: [], required: true, default: [] })
	public attributes: [];
}

export type CartItemDocument = CartItem & Document;
export const CartItemSchema = SchemaFactory.createForClass(CartItem);
