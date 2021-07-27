import { Observable } from 'rxjs';
import { Types } from 'mongoose';

export const CART_SERVICE = 'CART SERVICE';

// SCHEMAS
import { CartModel } from '../models/cart.model';

export interface ICartService {
	getCarts(): Observable<CartModel[]>;
	// getUserCarts(userId: Types.ObjectId): Observable<CartModel>;
	createCart(userId: string): Observable<CartModel>;
	// deleteCart(userId: Types.ObjectId): Observable<CartDocument>;
	// addItemToCart(userId: Types.ObjectId, data): Observable<CartDocument>;
	// removeItemToCart(userId: Types.ObjectId, data): Observable<CartDocument>;
}
