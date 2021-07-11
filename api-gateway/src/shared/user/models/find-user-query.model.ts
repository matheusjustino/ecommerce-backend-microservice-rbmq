// ENUMS
import { Sex } from '../../../common/enums/sex.enum';

export class FindUserQueryModel {
	public firstName?: string;
	public lastName?: string;
	public legalDocument?: string;
	public gender?: Sex;
	public email?: string;
}
