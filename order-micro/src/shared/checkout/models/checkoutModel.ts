import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class BillingAddressModel {
	@IsString()
	@IsNotEmpty()
	public firstName: string;

	@IsString()
	@IsNotEmpty()
	public lastName: string;

	@IsString()
	@IsNotEmpty()
	public country: string;

	@IsString()
	@IsNotEmpty()
	public address: string;

	@IsString()
	@IsNotEmpty()
	public city: string;

	@IsString()
	@IsNotEmpty()
	public zip: string;

	@IsString()
	@IsNotEmpty()
	public phone: string;

	@IsString()
	@IsEmail()
	@IsNotEmpty()
	public emailAddress: string;
}

export class ShippingAddressModel {
	@IsString()
	@IsNotEmpty()
	public firstName: string;

	@IsString()
	@IsNotEmpty()
	public lastName: string;

	@IsString()
	@IsNotEmpty()
	public country: string;

	@IsString()
	@IsNotEmpty()
	public address: string;

	@IsString()
	@IsNotEmpty()
	public city: string;

	@IsString()
	@IsNotEmpty()
	public zip: string;

	@IsString()
	@IsOptional()
	public orderNotes?: string;
}

export class SetBillingShippingAddressesModel2 {
	public billing: BillingAddressModel;

	public shipping: ShippingAddressModel;
}
