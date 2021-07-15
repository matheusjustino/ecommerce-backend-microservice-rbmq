import { catchError, map } from 'rxjs/operators';
import { Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

// RBMQ
import { ClientProxyRbmq } from '@src/proxy-rbmq/client-proxy-rbmq';
import { UpdateProductMessageModel } from '@src/shared/product/models/update-product-message.model';
import { UpdateProductModel } from '@src/shared/product/models/update-product.model';
import { throwError } from 'rxjs';

@Injectable()
export class ProductService {
	private logger = new Logger(ProductService.name);
	private clientProxyProductMicro: ClientProxy = null;

	constructor(private readonly clientProxyRmq: ClientProxyRbmq) {
		this.clientProxyProductMicro = this.clientProxyRmq.clientMicroProduct;
	}

	public createProduct(data) {
		this.logger.log(`Create Product - Payload: ${JSON.stringify(data)}`);

		return this.clientProxyProductMicro.send('create-product', data).pipe(
			map(() => ({ message: 'Producto Criado' })),
			catchError((err) => {
				this.logger.error(
					`Create Product Error: ${JSON.stringify(err)}`,
				);

				return throwError(err);
			}),
		);
	}

	public findAll(query?) {
		this.logger.log(
			`Find All Products - Payload: ${JSON.stringify(query)}`,
		);

		return this.clientProxyProductMicro
			.send('find-all-products', query)
			.pipe(
				catchError((err) => {
					this.logger.error(
						`Find All Products Error: ${JSON.stringify(err)}`,
					);

					return throwError(err);
				}),
			);
	}

	public findById(productId: string) {
		this.logger.log(
			`Find Product By Id - Payload: ${JSON.stringify(productId)}`,
		);

		return this.clientProxyProductMicro
			.send('find-product-by-id', productId)
			.pipe(
				catchError((err) => {
					this.logger.error(
						`Find Product By Id Error: ${JSON.stringify(err)}`,
					);

					return throwError(err);
				}),
			);
	}

	public updateProduct(productId: string, data: UpdateProductModel) {
		this.logger.log(`Update Product - Payload: ${{ productId, data }}`);

		const updateProductMessage: UpdateProductMessageModel = {
			productId,
			updateModel: data,
		};

		return this.clientProxyProductMicro
			.emit('update-product', updateProductMessage)
			.pipe(
				catchError((err) => {
					this.logger.error(
						`Update Product Error: ${JSON.stringify(err)}`,
					);

					return throwError(err);
				}),
			);
	}

	public deleteProduct(productId: string) {
		this.logger.log(`Delete Product - Payload: ${productId}`);

		return this.clientProxyProductMicro
			.emit('delete-product', productId)
			.pipe(
				catchError((err) => {
					this.logger.error(
						`Delete Product Error: ${JSON.stringify(err)}`,
					);

					return throwError(err);
				}),
			);
	}
}
