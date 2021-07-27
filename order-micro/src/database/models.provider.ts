import { AsyncModelFactory } from '@nestjs/mongoose';

// SCHEMAS
import { Cart, CartSchema } from './schemas/cart.schema';

export const ModelsProviderAsync: AsyncModelFactory[] = [
	{
		name: Cart.name,
		collection: 'carts',
		useFactory: () => CartSchema,
	},
];
