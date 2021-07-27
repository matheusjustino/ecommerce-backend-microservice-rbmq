import { Observable } from 'rxjs';
import { Types } from 'mongoose';

export const CART_SERVICE = 'CART SERVICE';

// SCHEMAS
import { CartDocument } from '@src/database/schemas/cart.schema';
import { CartModel } from '../models/cart.model';

export interface ICartService {
	getCarts(): Observable<CartModel[]>;
	// getUserCarts(userId: Types.ObjectId): Observable<CartModel>;
	createCart(accountId: string): Observable<CartModel>;
	// deleteCart(userId: Types.ObjectId): Observable<CartDocument>;
	// addItemToCart(userId: Types.ObjectId, data): Observable<CartDocument>;
	// removeItemToCart(userId: Types.ObjectId, data): Observable<CartDocument>;
}
