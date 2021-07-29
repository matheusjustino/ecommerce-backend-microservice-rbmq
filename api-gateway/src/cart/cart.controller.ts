import { Observable } from 'rxjs';
import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put,
} from '@nestjs/common';

// INTERFACES
import {
	CART_SERVICE,
	ICartService,
} from '@src/shared/cart/interfaces/cart.service';
import {
	AddItemToCartMessage,
	CartModel,
	CreateCartModel,
	UpdateCartMessageModel,
	CartItemModel,
	RemoveItemCartMessage,
} from '@src/shared/cart/models/cart.model';

@Controller('carts')
export class CartController {
	constructor(
		@Inject(CART_SERVICE)
		private readonly cartService: ICartService,
	) {}

	@Get()
	public getAllCarts(): Observable<CartModel[]> {
		return this.cartService.getCarts();
	}

	@Get('user/:userId')
	public getUserCarts(
		@Param('userId') userId: string,
	): Observable<CartModel[]> {
		return this.cartService.getUserCarts(userId);
	}

	@Get(':cartId')
	public getCartById(@Param('cartId') cartId: string): Observable<CartModel> {
		return this.cartService.getCartById(cartId);
	}

	@Post()
	public createCart(@Body() body: CreateCartModel) {
		const { userId } = body;
		return this.cartService.createCart(userId);
	}

	@Put(':cartId')
	public updateCart(@Param('cartId') cartId: string, @Body() body) {
		const data: UpdateCartMessageModel = {
			cartId,
			updateCart: body,
		};

		return this.cartService.updateCart(data);
	}

	@Delete('delete-cart/:cartId')
	public deleteCart(@Param('cartId') cartId: string) {
		return this.cartService.deleteCart(cartId);
	}

	@Post('add-item/:cartId')
	public addItemToCart(
		@Param('cartId') cartId: string,
		@Body() body: CartItemModel,
	) {
		const data: AddItemToCartMessage = {
			cartId,
			item: body,
		};

		return this.cartService.addItemToCart(data);
	}

	@Post('remove-item/:cartId')
	public removeItemCart(
		@Param('cartId') cartId: string,
		@Body() body: CartItemModel,
	) {
		const data: RemoveItemCartMessage = {
			cartId,
			item: body,
		};

		return this.cartService.addItemToCart(data);
	}
}
