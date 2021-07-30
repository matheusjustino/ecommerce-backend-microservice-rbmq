import { Injectable, Logger } from '@nestjs/common';
import { catchError, from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RpcException } from '@nestjs/microservices';
import Correios from 'node-correios';

// INTERFACES
import { ICorreiosService } from '@src/shared/correios/services/correios.service';

// MODELS
import {
	CalculateShippingAndDeadlineResponseModel,
	CalculateShippingModel,
	CalculateShippingResponseModel,
	VerifyCepResponseErrorModel,
	VerifyCepResponseSuccessModel,
} from '@src/shared/correios/models/correios.model';

@Injectable()
export class CorreiosService implements ICorreiosService {
	private logger: Logger = new Logger(CorreiosService.name);
	private ApiCorreios;

	constructor() {
		this.ApiCorreios = new Correios();
	}

	public verifyZip(
		zip: string,
	): Observable<VerifyCepResponseSuccessModel | VerifyCepResponseErrorModel> {
		this.logger.log(`Verify Zip - Payload: ${zip}`);

		return from(this.ApiCorreios.consultaCEP({ cep: zip })).pipe(
			catchError((error) => {
				this.logger.error(`Verify Zip Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public calculateShipping(
		data: CalculateShippingModel,
	): Observable<CalculateShippingResponseModel[]> {
		this.logger.log(
			`Calculate Shipping - Payload: ${JSON.stringify(data)}`,
		);

		return from(this.ApiCorreios.calcPreco(data)).pipe(
			map((result) => result as CalculateShippingResponseModel[]),
			catchError((error) => {
				this.logger.error(`Calculate Shipping Error: ${error}`);

				throw new RpcException(error);
			}),
		);
	}

	public calculateShippingAndDeadline(
		data: CalculateShippingModel,
	): Observable<CalculateShippingAndDeadlineResponseModel[]> {
		this.logger.log(
			`Calculate Shipping And Deadline - Payload: ${JSON.stringify(
				data,
			)}`,
		);

		return from(this.ApiCorreios.calcPrecoPrazo(data)).pipe(
			map(
				(result) =>
					result as CalculateShippingAndDeadlineResponseModel[],
			),
			catchError((error) => {
				this.logger.error(
					`Calculate Shipping And Deadline Error: ${error}`,
				);

				throw new RpcException(error);
			}),
		);
	}
}
