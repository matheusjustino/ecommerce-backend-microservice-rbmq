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
import {
	AddItemToCartMessage,
	CartModel,
	RemoveItemCartMessage,
	UpdateCartMessageModel,
} from '@src/shared/cart/models/cart.model';

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

	@MessagePattern('get-user-carts')
	public getUserCarts(accountId: string): Observable<CartModel[]> {
		return this.cartService.getUserCarts(accountId);
	}

	@MessagePattern('get-cart-by-id')
	public getCartById(cartId: string): Observable<CartModel> {
		return this.cartService.getCartById(cartId);
	}

	@MessagePattern('create-cart')
	public createCart(accountId: string): Observable<CartModel> {
		return this.cartService.createCart(accountId);
	}

	@MessagePattern('update-cart')
	public updateCart(data: UpdateCartMessageModel): Observable<CartModel> {
		return this.cartService.updateCart(data);
	}

	@MessagePattern('delete-cart')
	public deleteCart(cartId: string): Observable<CartModel> {
		return this.cartService.deleteCart(cartId);
	}

	@MessagePattern('add-item-to-cart')
	public addItemToCart(data: AddItemToCartMessage): Observable<CartModel> {
		return this.cartService.addItemToCart(data);
	}

	@MessagePattern('remove-item-cart')
	public removeItemCart(data: RemoveItemCartMessage): Observable<CartModel> {
		return this.cartService.removeItemCart(data);
	}
}
