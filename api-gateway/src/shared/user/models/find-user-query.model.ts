import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

// ENUMS
import { Sex } from '../../../common/enums/sex.enum';

export class FindUserQueryModel {
	@IsOptional()
	@IsNotEmpty()
	public firstName?: string;

	@IsOptional()
	@IsNotEmpty()
	public lastName?: string;

	@IsOptional()
	@IsNotEmpty()
	public legalDocument?: string;

	@IsEnum(Sex, {
		message: `O gênero deve ser Male, Female ou Other.`,
	})
	@IsOptional()
	public gender?: Sex;

	@IsOptional()
	@IsNotEmpty()
	public email?: string;
}
