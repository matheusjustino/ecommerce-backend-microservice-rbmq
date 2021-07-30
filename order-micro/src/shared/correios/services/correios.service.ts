import { Observable } from 'rxjs';
import {
	CalculateShippingModel,
	VerifyCepResponseSuccessModel,
	VerifyCepResponseErrorModel,
	CalculateShippingResponseModel,
	CalculateShippingAndDeadlineResponseModel,
} from '../models/correios.model';

export const CORREIOS_SERVICE = 'CORREIOS SERVICE';

export interface ICorreiosService {
	verifyZip(
		zip: string,
	): Observable<VerifyCepResponseSuccessModel | VerifyCepResponseErrorModel>;
	calculateShipping(
		data: CalculateShippingModel,
	): Observable<CalculateShippingResponseModel[]>;
	calculateShippingAndDeadline(
		data: CalculateShippingModel,
	): Observable<CalculateShippingAndDeadlineResponseModel[]>;
}
