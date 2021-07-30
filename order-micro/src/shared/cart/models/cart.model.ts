import { Types } from 'mongoose';

import {
	ShippingMethodCode,
	// ShippingMethodCodeValidator,
} from '@src/common/enums/shipping-method-code.enum';
import {
	BillingAddressModel,
	ShippingAddressModel,
} from '@src/shared/checkout/models/checkout.model';
import { CalculateShippingAndDeadlineResponseModel } from '@src/shared/correios/models/correios.model';
// import { UserModel } from '../database/schemas/userModel';

export class ShippingMethod extends CalculateShippingAndDeadlineResponseModel {
	public Metodo: string;
	public CepOrigem: string;
	public CepDestino: string;
}

export class CartItemModel {
	public _id?: string;
	public productId: Types.ObjectId;
	public productName: string;
	public quantity: number;
	public price: number;
	public attributes: [];
	public createdAt?: Date;
	public updatedAt?: Date;
}

export class CartModel {
	public _id?: string;
	public user: Types.ObjectId;
	public items: CartItemModel[];
	public total: number;
	public quantity: number;
	public shippingMethod: ShippingMethod;
	public billing: BillingAddressModel;
	public shipping: ShippingAddressModel;
	public createdAt?: Date;
	public updatedAt?: Date;
}

export class CartAddModel {
	public productId: string;
	public quantity: number;
}

export class CartUpdateModel {
	public cartItemId: string;
	public quantity: number;
}

export class CartRemoveModel {
	public cartItemId: string;
}

export class SetShippingMethodBody {
	public zip: string;
	public shippingMethod: ShippingMethodCode;
}

export class SetShippingMethod extends SetShippingMethodBody {
	public cartId: string;
}

export class SetBillingShippingAddressesModel {
	public billing: BillingAddressModel;
	public shipping: ShippingAddressModel;
}

export class UpdateCartMessageModel {
	public cartId: string;
	public updateCart: SetBillingShippingAddressesModel;
}

export class AddItemToCartMessage {
	public cartId: string;
	public item: CartItemModel;
}

export class RemoveItemCartMessage {
	public cartId: string;
	public item: CartItemModel;
}
