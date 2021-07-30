import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';

// INTERFACES
import {
	CHECKOUT_SERVICE,
	ICheckoutService,
} from '@src/shared/checkout/services/checkout.service';

// MODELS
import { SetBillingShippingAddressesMessageModel } from '@src/shared/checkout/models/checkout.model';
import {
	CartModel,
	SetShippingMethod,
	SetShippingMethodBody,
} from '@src/shared/cart/models/cart.model';
import {
	CalculateShippingAndDeadlineResponseModel,
	CalculateShippingResponseModel,
} from '@src/shared/correios/models/correios.model';

@Controller('checkout')
export class CheckoutController {
	constructor(
		@Inject(CHECKOUT_SERVICE)
		private readonly checkoutService: ICheckoutService,
	) {}

	@MessagePattern('set-billing-shipping')
	public setBillingShippingAddress(
		data: SetBillingShippingAddressesMessageModel,
	): Observable<CartModel> {
		return this.checkoutService.setBillingShippingAddress(data);
	}

	@MessagePattern('set-shipping-method')
	public setShippingMethod(data: SetShippingMethod): Observable<CartModel> {
		return this.checkoutService.setShippingMethod(data);
	}

	@MessagePattern('calculate-shipping')
	public calculateShipping(
		shippingMethod: SetShippingMethodBody,
	): Observable<CalculateShippingResponseModel[]> {
		return this.checkoutService.calculateShipping(shippingMethod);
	}

	@MessagePattern('calculate-billing-shipping-deadline')
	public calculateShippingAndDeadline(
		shippingMethod: SetShippingMethodBody,
	): Observable<CalculateShippingAndDeadlineResponseModel[]> {
		return this.checkoutService.calculateShippingAndDeadline(
			shippingMethod,
		);
	}
}
