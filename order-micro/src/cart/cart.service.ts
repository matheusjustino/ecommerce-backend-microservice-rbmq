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
import { CartModel } from './../shared/cart/models/cart.model';

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
				this.logger.error(`Get All Carts Error: ${JSON.parse(error)}`);

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
				this.logger.error(`Create Cart Error: ${JSON.parse(error)}`);

				throw new RpcException(error);
			}),
		);
	}
}
