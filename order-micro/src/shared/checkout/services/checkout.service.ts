import { Observable } from 'rxjs';
import {
	CartModel,
	SetShippingMethod,
	SetShippingMethodBody,
} from '@src/shared/cart/models/cart.model';
import {
	CalculateShippingAndDeadlineResponseModel,
	CalculateShippingResponseModel,
} from '@src/shared/correios/models/correios.model';
import { SetBillingShippingAddressesMessageModel } from '../models/checkout.model';

export const CHECKOUT_SERVICE = 'CHECKOUT SERVICE';

export interface ICheckoutService {
	setBillingShippingAddress(
		data: SetBillingShippingAddressesMessageModel,
	): Observable<CartModel>;
	setShippingMethod(data: SetShippingMethod): Observable<CartModel>;
	calculateShipping(
		shippingMethod: SetShippingMethodBody,
	): Observable<CalculateShippingResponseModel[]>;
	calculateShippingAndDeadline(
		shippingMethod: SetShippingMethodBody,
	): Observable<CalculateShippingAndDeadlineResponseModel[]>;
}
