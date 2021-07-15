import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

// ENUMS
import { Sex } from '@src/common/enums/sex.enum';

export class UpdateUserModel {
	@IsOptional()
	@IsNotEmpty()
	public firstName?: string = null;

	@IsOptional()
	@IsNotEmpty()
	public lastName?: string = null;

	@IsOptional()
	@IsNotEmpty()
	public legalDocument?: string = null;

	@IsOptional()
	@IsNotEmpty()
	public phone?: string = null;

	@IsEnum(Sex, {
		message: `O gênero deve ser Male, Female ou Other.`,
	})
	@IsOptional()
	public gender?: Sex = null;

	constructor(init?: Partial<UpdateUserModel>) {
		Object.assign(this, init);
	}
}
