import { Type } from 'class-transformer';
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';

export class MailContact {
	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsString()
	@IsEmail()
	@IsNotEmpty()
	public email: string;
}

export class TemplateVariable {
	[key: string]: string | number;
}

export class ParserMailTemplate {
	@IsString()
	@IsNotEmpty()
	public file: string;

	@Type(() => TemplateVariable)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public variables: TemplateVariable;
}

export class SendEmail {
	@Type(() => MailContact)
	@ValidateNested({ each: true })
	@IsOptional()
	public from?: MailContact;

	@Type(() => MailContact)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public to: MailContact;

	@IsString()
	@IsNotEmpty()
	public subject: string;

	@Type(() => ParserMailTemplate)
	@ValidateNested({ each: true })
	@IsNotEmpty()
	public templateData: ParserMailTemplate;
}
