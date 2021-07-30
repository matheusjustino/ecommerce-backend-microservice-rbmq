import { Observable } from 'rxjs';

// MODELS
import {
	AddItemToCartMessage,
	CartModel,
	RemoveItemCartMessage,
	UpdateCartMessageModel,
} from '../models/cart.model';

export const CART_SERVICE = 'CART SERVICE';

export interface ICartService {
	getCarts(): Observable<CartModel[]>;
	getUserCarts(accountId: string): Observable<CartModel[]>;
	getCartById(cartId: string): Observable<CartModel>;
	createCart(accountId: string): Observable<CartModel>;
	updateCart(data: UpdateCartMessageModel): Observable<CartModel>;
	deleteCart(cartId: string): Observable<CartModel>;
	addItemToCart(data: AddItemToCartMessage): Observable<CartModel>;
	removeItemCart(data: RemoveItemCartMessage): Observable<CartModel>;
}
