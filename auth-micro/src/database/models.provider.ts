import { AsyncModelFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

// SCHEMAS
import { User, UserDocument, UserSchema } from './schemas/user.schema';

export const ModelsProviderAsync: AsyncModelFactory[] = [
	{
		name: User.name,
		collection: 'users',
		useFactory: () => {
			const schema = UserSchema;
			schema.pre<UserDocument>('save', async function (next) {
				if (!this.isModified('password')) next();

				const salt: string = await bcrypt.genSalt(5);
				const hash = await bcrypt.hash(this.password, salt);
				this.password = hash;
				next();
			});
			return schema;
		},
	},
];
