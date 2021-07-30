import { RpcException } from '@nestjs/microservices';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { catchError, map, switchMap } from 'rxjs/operators';
import { from, Observable } from 'rxjs';

// ENUMS
import { CompanyZip } from '@src/common/enums/company-zip.enum';
import { ShippingMethodCode } from '@src/common/enums/shipping-method-code.enum';

// MODELS
import {
	CalculateShippingAndDeadlineResponseModel,
	CalculateShippingModel,
} from '@src/shared/correios/models/correios.model';
import { SetBillingShippingAddressesMessageModel } from '@src/shared/checkout/models/checkout.model';
import {
	CartModel,
	SetShippingMethod,
	SetShippingMethodBody,
} from '@src/shared/cart/models/cart.model';

// INTERFACES
import {
	CORREIOS_SERVICE,
	ICorreiosService,
} from '@src/shared/correios/services/correios.service';
import { ICheckoutService } from '@src/shared/checkout/services/checkout.service';

// REPOSITORES
import { CartRepository } from '@src/database/repositories/cart.repository';

@Injectable()
export class CheckoutService implements ICheckoutService {
	private logger: Logger = new Logger(CheckoutService.name);

	private CalculateShippingDataDefault: CalculateShippingModel = {
		nCdServico: ShippingMethodCode.SEDEX,
		sCepOrigem: CompanyZip.MAIN,
		sCepDestino: CompanyZip.MAIN,
		nCdFormato: 1,
		nVlAltura: 8,
		nVlComprimento: 27,
		nVlDiametro: 18,
		nVlLargura: 10,
		nVlPeso: '1',
	};

	constructor(
		@Inject(CORREIOS_SERVICE)
		private readonly correiosService: ICorreiosService,
		private readonly cartRepository: CartRepository,
	) {}

	public setBillingShippingAddress(
		data: SetBillingShippingAddressesMessageModel,
	) {
		this.logger.log(
			`Set BillingShippingAddress - Payload: ${JSON.stringify(data)}`,
		);

		const { cartId, billing, shipping } = data;

		return from(this.cartRepository.cartModel.findById(cartId)).pipe(
			switchMap((cart) => {
				if (!cart) {
					throw new RpcException('Cart not found');
				}

				const data = {
					billing,
					shipping,
				};

				return from(
					this.cartRepository.cartModel.findByIdAndUpdate(
						cart,
						{ $set: data },
						{ new: true },
					),
				).pipe(map((cart) => cart as CartModel));
			}),
			catchError((error) => {
				this.logger.error(`Set BillingShippingAddress Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public calculateShippingAndDeadline(
		shippingMethod: SetShippingMethodBody,
	): Observable<CalculateShippingAndDeadlineResponseModel[]> {
		this.logger.log(
			`Calculate Shipping And Dead Line - Payload: ${JSON.stringify(
				shippingMethod,
			)}`,
		);

		const calculateShippingData = {
			...this.CalculateShippingDataDefault,
			nCdServico: ShippingMethodCode[shippingMethod.shippingMethod],
			sCepDestino: shippingMethod.zip,
		};

		return from(
			this.correiosService.calculateShippingAndDeadline(
				calculateShippingData,
			),
		).pipe(
			catchError((error) => {
				this.logger.error(
					`Calculate Shipping And Dead Line Error: ${error}`,
				);

				throw new RpcException(error);
			}),
		);
	}

	public setShippingMethod(data: SetShippingMethod): Observable<CartModel> {
		this.logger.log(
			`Set Shipping Method - Payload: ${JSON.stringify(data)}`,
		);

		const { cartId, zip, shippingMethod } = data;

		return from(this.cartRepository.cartModel.findById(cartId)).pipe(
			switchMap((cart) => {
				if (!cart) {
					throw new RpcException('Cart not found');
				}

				return from(
					this.calculateShippingAndDeadline({ zip, shippingMethod }),
				).pipe(
					switchMap((shippingCostAndDeadline) => {
						const updatedCart = Object.assign(cart, {
							shippingMethod: {
								Metodo: data.shippingMethod,
								CepOrigem: CompanyZip.MAIN,
								CepDestino: data.zip,
								...shippingCostAndDeadline[0],
							},
						});

						return from(updatedCart.save()).pipe(
							map((cart) => cart as CartModel),
						);
					}),
				);
			}),
			catchError((error) => {
				this.logger.error(
					`Calculate Shipping And Dead Line Error: ${error}`,
				);

				throw new RpcException(error);
			}),
		);
	}

	public calculateShipping(shippingMethod: SetShippingMethodBody) {
		this.logger.log(
			`Calculate Shipping - Payload: ${JSON.stringify(shippingMethod)}`,
		);

		const calculateShippingData = {
			...this.CalculateShippingDataDefault,
			nCdServico: ShippingMethodCode[shippingMethod.shippingMethod],
			sCepDestino: shippingMethod.zip,
		};

		return from(
			this.correiosService.calculateShipping(calculateShippingData),
		).pipe(
			catchError((error) => {
				this.logger.error(`Calculate Shipping Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}
}
