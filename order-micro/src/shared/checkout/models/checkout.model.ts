export class BillingAddressModel {
	public firstName: string;
	public lastName: string;
	public country: string;
	public address: string;
	public city: string;
	public zip: string;
	public phone: string;
	public emailAddress: string;
}

export class ShippingAddressModel {
	public firstName: string;
	public lastName: string;
	public country: string;
	public address: string;
	public city: string;
	public zip: string;
	public orderNotes?: string;
}

export class SetBillingShippingAddressesMessageModel {
	public cartId: string;
	public billing: BillingAddressModel;
	public shipping: ShippingAddressModel;
}
