import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// SCHEMAS
import { CartItemSchema } from './cart-item.schema';

// MODELS
// import { UserModel } from '@src/shared/user/models/user.model';
import {
	CartItemModel,
	CartModel,
	ShippingMethod,
} from '@src/shared/cart/models/cart.model';
import {
	BillingAddressModel,
	ShippingAddressModel,
} from '@src/shared/checkout/models/checkout.model';

@Schema({ timestamps: true })
export class Cart implements CartModel {
	@Prop({ type: Types.ObjectId, required: true })
	public user: Types.ObjectId;

	@Prop({ type: [CartItemSchema], default: [] })
	public items: CartItemModel[];

	@Prop({ type: Number, default: 0 })
	public total: number;

	@Prop({ type: Number, default: 0 })
	public quantity: number;

	@Prop({ type: ShippingMethod, default: new ShippingMethod() })
	public shippingMethod: ShippingMethod;

	@Prop({ type: BillingAddressModel, default: new BillingAddressModel() })
	public billing: BillingAddressModel;

	@Prop({ type: ShippingAddressModel, default: new ShippingAddressModel() })
	public shipping: ShippingAddressModel;
}

export type CartDocument = Cart & Document;
export const CartSchema = SchemaFactory.createForClass(Cart);
