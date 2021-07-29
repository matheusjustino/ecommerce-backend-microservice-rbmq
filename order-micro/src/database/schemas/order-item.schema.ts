import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class OrderItem {
	@Prop({ type: String, required: true })
	public productId: string;

	@Prop({ type: String, required: true })
	public productName: string;

	@Prop({ type: Number, required: true, default: 0 })
	public quantity: number;

	@Prop({ type: Number, required: true, default: 0 })
	public price: number;

	@Prop({ type: [], required: true, default: [] })
	public custom_attributes: [];
}

export type OrderItemDocument = OrderItem & Document;
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
