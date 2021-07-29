import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// SCHEMAS
import { OrderItem, OrderItemSchema } from './order-item.schema';

// MODELS
import { UserModel } from '@src/shared/user/models/user.model';
import { ShippingMethod } from '@src/shared/cart/models/cart.model';
import {
	BillingAddressModel,
	ShippingAddressModel,
} from '@src/shared/checkout/models/checkout.model';
import { PaymentModel } from '@src/shared/payment/model/payment.model';

@Schema({ timestamps: true })
export class Order {
	@Prop({ type: UserModel, required: true })
	public user: UserModel;

	@Prop({ type: Number, required: true, default: 0 })
	public total: number;

	@Prop({ type: Number, required: true, default: 0 })
	public quantity: number;

	@Prop({ type: String, required: true, default: 'Pending' })
	public status: string;

	@Prop({
		type: ShippingMethod,
		required: true,
		default: new ShippingMethod(),
	})
	public shippingMethod: ShippingMethod;

	@Prop({
		type: BillingAddressModel,
		required: true,
		default: new BillingAddressModel(),
	})
	public billingAddress: BillingAddressModel;

	@Prop({
		type: ShippingAddressModel,
		required: true,
		default: new ShippingAddressModel(),
	})
	public shippingAddress: ShippingAddressModel;

	@Prop({
		type: PaymentModel,
		required: true,
	})
	public payment: PaymentModel;

	@Prop({ type: [OrderItemSchema], required: true, default: [] })
	public items: OrderItem[];
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
