import { Observable, from, catchError, throwError } from 'rxjs';
import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Types } from 'mongoose';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';

// MODELS
import { CartModel } from '@src/shared/cart/models/cart.model';

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

	public createCart(userId: string): Observable<CartModel> {
		this.logger.log(`Create Cart - Payload: ${JSON.stringify(userId)}`);

		return from(
			this.clientProxyOrderMicro.send('create-cart', userId),
		).pipe(
			catchError((error) => {
				this.logger.error(`Create Cart Error: ${error}`);
				return throwError(error);
			}),
		);
	}
}
