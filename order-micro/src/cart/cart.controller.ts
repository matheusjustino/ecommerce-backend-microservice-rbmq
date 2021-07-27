import { MessagePattern } from '@nestjs/microservices';
import { Controller, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Types } from 'mongoose';

// INTERFACES
import {
	CART_SERVICE,
	ICartService,
} from '@src/shared/cart/services/cart.service';

// MODELS
import { CartModel } from '@src/shared/cart/models/cart.model';

@Controller('carts')
export class CartController {
	constructor(
		@Inject(CART_SERVICE)
		private readonly cartService: ICartService,
	) {}

	@MessagePattern('get-all-carts')
	public getCarts(): Observable<CartModel[]> {
		return this.cartService.getCarts();
	}

	@MessagePattern('create-cart')
	public createCart({ accountId }): Observable<CartModel> {
		return this.cartService.createCart(accountId);
	}
}
