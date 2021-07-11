import { AsyncModelFactory } from '@nestjs/mongoose';

// SCHEMAS
import { User, UserSchema } from './schemas/user.schema';

export const ModelsProviderAsync: AsyncModelFactory[] = [
	{
		name: User.name,
		collection: 'users',
		useFactory: () => UserSchema,
	},
];
