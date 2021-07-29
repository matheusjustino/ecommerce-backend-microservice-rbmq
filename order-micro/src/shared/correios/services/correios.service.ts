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
	): Promise<VerifyCepResponseSuccessModel | VerifyCepResponseErrorModel>;
	calculateShipping(
		data: CalculateShippingModel,
	): Promise<CalculateShippingResponseModel[]>;
	calculateShippingAndDeadline(
		data: CalculateShippingModel,
	): Promise<CalculateShippingAndDeadlineResponseModel[]>;
}
