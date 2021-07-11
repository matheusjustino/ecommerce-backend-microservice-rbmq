import { Sex } from '../../../common/enums/sex.enum';

export class UpdateUserModel {
	public firstName?: string;
	public lastName?: string;
	public legalDocument?: string;
	public phone?: string;
	public gender?: Sex;
	public email?: string;
}
