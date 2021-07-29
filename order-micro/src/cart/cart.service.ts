import { Observable, from, catchError, map, switchMap } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';

// INTERFACES
import { ICartService } from '@src/shared/cart/services/cart.service';

// REPOSITORIES
import { CartRepository } from '@src/database/repositories/cart.repository';

// SCHEMAS
import { CartDocument } from '@src/database/schemas/cart.schema';
import {
	AddItemToCartMessage,
	CartModel,
	RemoveItemCartMessage,
	UpdateCartMessageModel,
} from '../shared/cart/models/cart.model';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';

@Injectable()
export class CartService implements ICartService {
	private logger = new Logger(CartService.name);

	constructor(
		private readonly cartRepository: CartRepository,
		private readonly clientProxyRbmq: ClientProxyRbmq,
	) {}

	public getCarts(): Observable<CartModel[]> {
		this.logger.log(`Get All Carts`);

		return from(this.cartRepository.cartModel.find()).pipe(
			map((carts) => carts as CartModel[]),
			catchError((error) => {
				this.logger.error(`Get All Carts Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public getUserCarts(accountId: string): Observable<CartModel[]> {
		this.logger.log(`Get User Carts - Payload: ${accountId}`);

		const findByIdData = {
			accountId,
		};

		return from(
			this.clientProxyRbmq.clientMicroUsers.send(
				'find-by-id',
				findByIdData,
			),
		).pipe(
			switchMap((user) => {
				if (!user) {
					throw new RpcException('User not found');
				}

				return from(
					this.cartRepository.cartModel.find({
						user: Types.ObjectId(user.accountId),
					}),
				).pipe(
					map((carts) => {
						return carts as CartModel[];
					}),
				);
			}),
			catchError((error) => {
				this.logger.error(`Get User Carts Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public getCartById(cartId: string): Observable<CartModel> {
		this.logger.log(`Get Cart By Id - Payload: ${cartId}`);

		return from(this.cartRepository.cartModel.findById(cartId)).pipe(
			map((cart) => {
				if (!cart) {
					throw new RpcException('Cart not found');
				}

				return cart;
			}),
			catchError((error) => {
				this.logger.error(`Get Cart By Id Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public createCart(accountId: string): Observable<CartModel> {
		this.logger.log(`Create Cart - Payload: ${accountId}`);

		const findByIdData = {
			accountId,
		};

		return from(
			this.clientProxyRbmq.clientMicroUsers.send(
				'find-by-id',
				findByIdData,
			),
		).pipe(
			switchMap((user) => {
				if (!user) {
					throw new RpcException('User not found');
				}

				return from(
					this.cartRepository.cartModel.create({
						user: Types.ObjectId(accountId),
					}),
				);
			}),
			catchError((error) => {
				this.logger.error(`Create Cart Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public updateCart(data: UpdateCartMessageModel): Observable<CartModel> {
		this.logger.log(`Update Cart - Payload: ${JSON.stringify(data)}`);

		const { cartId, updateCart } = data;

		return from(this.cartRepository.cartModel.findById(cartId)).pipe(
			switchMap((cart) => {
				if (!cart) {
					throw new RpcException('Cart not found');
				}

				return from(
					this.cartRepository.cartModel.findByIdAndUpdate(
						cartId,
						{ $set: updateCart },
						{ new: true },
					),
				).pipe(map((cart) => cart as CartModel));
			}),
			catchError((error) => {
				this.logger.error(`Update Cart Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public deleteCart(cartId: string): Observable<CartModel> {
		this.logger.log(`Delete Cart - Payload: ${cartId}`);

		return from(
			this.cartRepository.cartModel.findByIdAndDelete(cartId),
		).pipe(
			map((cart) => {
				if (!cart) {
					throw new RpcException('Cart not found');
				}

				return cart as CartModel;
			}),
			catchError((error) => {
				this.logger.error(`Delete Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public addItemToCart(data: AddItemToCartMessage): Observable<CartModel> {
		this.logger.log(`Add Item To Cart - Payload: ${JSON.stringify(data)}`);

		const { cartId, item } = data;

		return from(this.cartRepository.cartModel.findById(cartId)).pipe(
			switchMap((cart: CartDocument) => {
				if (!cart) {
					throw new RpcException('Cart not found');
				}

				const itemCart = cart.items.find(
					(item) => item.productId === item.productId,
				);

				if (!itemCart) {
					cart.items.push(item);
					cart.quantity += item.quantity;
					cart.total += item.quantity * item.price;
				} else {
					for (let i = 0; i < cart.items.length; i++) {
						const cartItem = cart.items[i];

						if (cartItem.productId === item.productId) {
							cart.quantity += 1;
							cart.total += item.price;
							cartItem.quantity += 1;

							break;
						}
					}
				}

				return from(cart.save()).pipe(map((cart) => cart as CartModel));
			}),
			catchError((error) => {
				this.logger.error(`Add Item To Cart Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public removeItemCart(data: RemoveItemCartMessage): Observable<CartModel> {
		this.logger.log(`Remove Item Cart - Payload: ${JSON.stringify(data)}`);

		const { cartId, item } = data;

		return from(this.cartRepository.cartModel.findById(cartId)).pipe(
			switchMap((cart: CartDocument) => {
				if (!cart) {
					throw new RpcException('Cart not found');
				}

				const itemCart = cart.items.find(
					(item) => item.productId === item.productId,
				);

				if (!itemCart) {
					throw new RpcException('Item do not exists in the cart');
				}

				for (let i = 0; i < cart.items.length; i++) {
					const cartItem = cart.items[i];

					if (cartItem.productId === item.productId) {
						if (cartItem.quantity > 1) {
							cart.quantity -= 1;
							cart.total -= item.price;
							cartItem.quantity -= 1;

							break;
						} else {
							cart.items.splice(i, 1);
							cart.quantity -= 1;
							cart.total -= item.price;
						}
					}
				}

				return from(cart.save()).pipe(map((cart) => cart as CartModel));
			}),
			catchError((error) => {
				this.logger.error(`Remove Item Cart Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}
}
