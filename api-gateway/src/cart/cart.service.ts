import { Observable, from, catchError, throwError } from 'rxjs';
import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Types } from 'mongoose';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';

// MODELS
import {
	AddItemToCartMessage,
	CartModel,
	RemoveItemCartMessage,
	UpdateCartMessageModel,
} from '@src/shared/cart/models/cart.model';

// INTERFACES
import { ICartService } from '@src/shared/cart/interfaces/cart.service';

@Injectable()
export class CartService implements ICartService {
	private logger = new Logger(CartService.name);
	private clientProxyOrderMicro: ClientProxy = null;

	constructor(private readonly clientProxyRmq: ClientProxyRbmq) {
		this.clientProxyOrderMicro = this.clientProxyRmq.clientMicroOrder;
	}

	public getCarts(): Observable<CartModel[]> {
		this.logger.log(`Get All Carts`);

		return from(this.clientProxyOrderMicro.send('get-all-carts', {})).pipe(
			catchError((error) => {
				this.logger.error(`Get All Carts Error: ${error}`);
				return throwError(error);
			}),
		);
	}

	public getUserCarts(accountId: string): Observable<CartModel[]> {
		this.logger.log(`Get User Carts`);

		return from(
			this.clientProxyOrderMicro.send('get-user-carts', accountId),
		).pipe(
			catchError((error) => {
				this.logger.error(`Get User Carts Error: ${error}`);
				return throwError(error);
			}),
		);
	}

	public getCartById(cartId: string): Observable<CartModel> {
		this.logger.log(`Get Cart By Id`);

		return from(
			this.clientProxyOrderMicro.send('get-cart-by-id', cartId),
		).pipe(
			catchError((error) => {
				this.logger.error(`Get Cart By Id Error: ${error}`);
				return throwError(error);
			}),
		);
	}

	public createCart(accountId: string): Observable<CartModel> {
		this.logger.log(`Create Cart - Payload: ${JSON.stringify(accountId)}`);

		return from(
			this.clientProxyOrderMicro.send('create-cart', accountId),
		).pipe(
			catchError((error) => {
				this.logger.error(`Create Cart Error: ${error}`);
				return throwError(error);
			}),
		);
	}

	public updateCart(data: UpdateCartMessageModel): Observable<CartModel> {
		this.logger.log(`Update Cart - Payload: ${JSON.stringify(data)}`);

		return from(this.clientProxyOrderMicro.send('update-cart', data)).pipe(
			catchError((error) => {
				this.logger.error(`Update Cart Error: ${error}`);
				return throwError(error);
			}),
		);
	}

	public deleteCart(cartId: string): Observable<CartModel> {
		this.logger.log(`Delete Cart - Payload: ${JSON.stringify(cartId)}`);

		return from(
			this.clientProxyOrderMicro.send('delete-cart', cartId),
		).pipe(
			catchError((error) => {
				this.logger.error(`Delete Cart Error: ${error}`);
				return throwError(error);
			}),
		);
	}

	public addItemToCart(data: AddItemToCartMessage): Observable<CartModel> {
		this.logger.log(`Add Item To Cart - Payload: ${JSON.stringify(data)}`);

		return from(
			this.clientProxyOrderMicro.send('add-item-to-cart', data),
		).pipe(
			catchError((error) => {
				this.logger.error(`Add Item To Cart Error: ${error}`);
				return throwError(error);
			}),
		);
	}

	public removeItemCart(data: RemoveItemCartMessage): Observable<CartModel> {
		this.logger.log(`Remove Item Cart - Payload: ${JSON.stringify(data)}`);

		return from(
			this.clientProxyOrderMicro.send('remove-item-cart', data),
		).pipe(
			catchError((error) => {
				this.logger.error(`Remove Item Cart Error: ${error}`);
				return throwError(error);
			}),
		);
	}
}
