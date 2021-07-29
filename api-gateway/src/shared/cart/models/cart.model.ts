import {
	IsArray,
	IsDate,
	IsEnum,
	IsMongoId,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

import {
	ShippingMethodCode,
	ShippingMethodCodeValidator,
} from '@src/common/enums/shipping-method-code.enum';
import {
	BillingAddressModel,
	ShippingAddressModel,
} from '@src/shared/checkout/models/checkout.model';
import { CalculateShippingAndDeadlineResponseModel } from '@src/shared/correios/models/correios.model';
// import { UserModel } from '../database/schemas/userModel';

export class ShippingMethod extends CalculateShippingAndDeadlineResponseModel {
	@IsString()
	@IsNotEmpty()
	public Metodo: string;

	@IsString()
	@IsNotEmpty()
	public CepOrigem: string;

	@IsString()
	@IsNotEmpty()
	public CepDestino: string;
}

export class CartItemModel {
	@IsString()
	@IsOptional()
	public _id?: string;

	@IsMongoId()
	@IsNotEmpty()
	public productId: Types.ObjectId;

	@IsString()
	@IsNotEmpty()
	public productName: string;

	@IsNumber()
	@IsNotEmpty()
	public quantity: number;

	@IsNumber()
	@IsNotEmpty()
	public price: number;

	@IsArray()
	@IsNotEmpty()
	public attributes: [];

	@IsDate()
	@IsOptional()
	public createdAt?: Date;

	@IsDate()
	@IsOptional()
	public updatedAt?: Date;
}

export class CartModel {
	@IsOptional()
	@IsOptional()
	public _id?: string;

	@IsMongoId()
	@IsNotEmpty()
	public user: Types.ObjectId;

	@Type(() => CartItemModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public items: CartItemModel[];

	@IsNumber()
	@IsNotEmpty()
	public total: number;

	@IsNumber()
	@IsNotEmpty()
	public quantity: number;

	@Type(() => ShippingMethod)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public shippingMethod: ShippingMethod;

	@Type(() => BillingAddressModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public billingAddress: BillingAddressModel;

	@Type(() => ShippingAddressModel)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public shippingAddress: ShippingAddressModel;

	@IsDate()
	@IsNotEmpty()
	public createdAt?: Date;

	@IsDate()
	@IsNotEmpty()
	public updatedAt?: Date;
}

export class CartAddModel {
	@IsString()
	@IsNotEmpty()
	public productId: string;

	@IsString()
	@IsNumber()
	public quantity: number;
}

export class CartUpdateModel {
	@IsString()
	@IsNotEmpty()
	public cartItemId: string;

	@IsString()
	@IsNumber()
	public quantity: number;
}

export class CartRemoveModel {
	@IsString()
	@IsNotEmpty()
	public cartItemId: string;
}

export class SetShippingMethodBody {
	@IsString()
	@IsNotEmpty()
	public zip: string;

	@IsEnum(ShippingMethodCodeValidator, {
		message: `O método de envio deve ser SEDEX ou PAC`,
	})
	@IsNotEmpty()
	public shippingMethod: ShippingMethodCode;
}

export class SetShippingMethod extends SetShippingMethodBody {
	@IsString()
	@IsNotEmpty()
	public cartId: string;
}

export class SetBillingShippingAddressesModel {
	@Type(() => BillingAddressModel)
	@ValidateNested({ always: true })
	@IsNotEmpty()
	public billing: BillingAddressModel;

	@Type(() => ShippingAddressModel)
	@ValidateNested({ always: true })
	@IsNotEmpty()
	public shipping: ShippingAddressModel;
}

export class UpdateCartMessageModel {
	@IsString()
	@IsNotEmpty()
	public cartId: string;

	@Type(() => ShippingAddressModel)
	@ValidateNested({ always: true })
	@IsNotEmpty()
	public updateCart: SetBillingShippingAddressesModel;
}

export class AddItemToCartMessage {
	@IsString()
	@IsNotEmpty()
	public cartId: string;

	@Type(() => CartItemModel)
	@ValidateNested({ always: true })
	@IsNotEmpty()
	public item: CartItemModel;
}

export class RemoveItemCartMessage {
	@IsString()
	@IsNotEmpty()
	public cartId: string;

	@Type(() => CartItemModel)
	@ValidateNested({ always: true })
	@IsNotEmpty()
	public item: CartItemModel;
}

export class CreateCartModel {
	@IsString()
	@IsNotEmpty()
	public userId: string;
}
