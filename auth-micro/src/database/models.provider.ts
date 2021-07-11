import { AsyncModelFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

// SCHEMAS
import {
	Account,
	AccountSchema,
	AccountDocument,
} from './schemas/account.schema';
import { UserToken, UserTokenSchema } from './schemas/user-token.schema';

export const ModelsProviderAsync: AsyncModelFactory[] = [
	{
		name: Account.name,
		collection: 'accounts',
		useFactory: () => {
			const schema = AccountSchema;
			schema.pre<AccountDocument>('save', async function (next) {
				if (!this.isModified('password')) next();

				const salt: string = await bcrypt.genSalt(5);
				const hash = await bcrypt.hash(this.password, salt);
				this.password = hash;
				next();
			});
			return schema;
		},
	},
	{
		name: UserToken.name,
		collection: 'user-tokens',
		useFactory: () => UserTokenSchema,
	},
];
