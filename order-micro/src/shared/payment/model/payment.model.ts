export class PaymentSource {
	public id: string;
	public object: string;
	public address_city: string;
	public address_country: string;
	public address_line1: string;
	public address_line1_check: string;
	public address_line2: string;
	public address_state: string;
	public address_zip: string;
	public address_zip_check: string;
	public brand: string;
	public country: string;
	public customer: string;
	public cvc_check;
	public dynamic_last4string;
	public exp_month: number;
	public exp_year: number;
	public fingerprint: string;
	public funding: string;
	public last4: string;
	public name: string;
	public status: string;

	constructor() {
		this.id = '';
		this.object = '';
		this.address_city = '';
		this.address_country = '';
		this.address_line1 = '';
		this.address_line1_check = '';
		this.address_line2 = '';
		this.address_state = '';
		this.address_zip = '';
		this.address_zip_check = '';
		this.brand = '';
		this.country = '';
		this.customer = '';
		this.cvc_check = '';
		this.dynamic_last4string = '';
		this.exp_month = null;
		this.exp_year = null;
		this.fingerprint = '';
		this.funding = '';
		this.last4 = '';
		this.name = '';
		this.status = '';
	}
}

export class PaymentMethodDetails {
	public card: {
		brand: string;
		checks: {
			address_line1_check: string;
			address_postal_code_check: string;
			cvc_check;
		};
		country: string;
		exp_month: number;
		exp_year: number;
		fingerprint: string;
		funding: string;
		installments;
		last4: string;
	};

	public type: string;

	constructor() {
		this.card = {
			brand: '',
			checks: {
				address_line1_check: '',
				address_postal_code_check: '',
				cvc_check: null,
			},
			country: '',
			exp_month: null,
			exp_year: null,
			fingerprint: '',
			funding: '',
			installments: null,
			last4: '',
		};
		this.type = '';
	}
}

export class PaymentChargesBillingDetailsAddressModel {
	public city: string;
	public country: string;
	public line1: string;
	public line2: string;
	public postal_code: string;
	public state: string;

	constructor() {
		this.city = '';
		this.country = '';
		this.line1 = '';
		this.line2 = '';
		this.postal_code = '';
		this.state = '';
	}
}

export class PaymentChargesBillingDetailsModel {
	public address: PaymentChargesBillingDetailsAddressModel;
	public email: string;
	public name: string;
	public phone: string;

	constructor() {
		this.address = new PaymentChargesBillingDetailsAddressModel();
		this.email = '';
		this.name = '';
		this.phone = '';
	}
}

export class PaymentChargesModel {
	public _id: string;
	public amount: number;
	public amount_captured: number;
	public amount_refunded: number;
	public balance_transaction: string;
	public billing_details: PaymentChargesBillingDetailsModel;
	public captured: boolean;
	public currency: string;
	public customer: string;
	public description: string;
	public failure_code: number;
	public failure_message: string;
	public fraud_details: {};
	public paid: boolean;
	public payment_intent: string;
	public payment_method: string;
	public payment_method_details: PaymentMethodDetails;
	public receipt_url: string;
	public refunded: boolean;
	public refunds: {};
	public source: PaymentSource;

	constructor() {
		this._id = '';
		this.amount = 0;
		this.amount_captured = 0;
		this.amount_refunded = 0;
		this.balance_transaction = '';
		this.billing_details = new PaymentChargesBillingDetailsModel();
		this.captured = false;
		this.currency = '';
		this.customer = '';
		this.description = '';
		this.failure_code = 0;
		this.failure_message = '';
		this.fraud_details = {};
		this.paid = false;
		this.payment_intent = '';
		this.payment_method = '';
		this.payment_method_details = new PaymentMethodDetails();
		this.receipt_url = '';
		this.refunded = false;
		this.refunds = {};
		this.source = new PaymentSource();
	}
}

export class PaymentModel {
	public _id?: string;
	public status: string;
	public stripChargeId: string;
	public amount: number;
	public amount_capturable: number;
	public amount_received: number;
	public canceled_at: string;
	public cancellation_reason: string;
	public capture_method: string;
	public charges: PaymentChargesModel;
	public createdAt?: Date;
	public updatedAt?: Date;
}
