import { Observable } from 'rxjs';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

// INTERFACES
import {
	CART_SERVICE,
	ICartService,
} from '@src/shared/cart/interfaces/cart.service';
import { CartModel } from '@src/shared/cart/models/cart.model';

@Controller('carts')
export class CartController {
	constructor(
		@Inject(CART_SERVICE)
		private readonly cartService: ICartService,
	) {}

	@Get()
	getAllCarts(): Observable<CartModel[]> {
		return this.cartService.getCarts();
	}

	@Post()
	createCart(@Body() body) {
		return this.cartService.createCart(body);
	}
}
