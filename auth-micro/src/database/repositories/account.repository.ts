import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

// SCHEMAS
import { Account, AccountDocument } from '../schemas/account.schema';

@Injectable()
export class AccountRepository {
	constructor(
		@InjectModel(Account.name)
		private readonly AccountModel: Model<AccountDocument>,
	) {}

	public get accountModel(): Model<AccountDocument> {
		return this.AccountModel;
	}
}
