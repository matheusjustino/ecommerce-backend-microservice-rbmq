import { AsyncModelFactory } from '@nestjs/mongoose';

// SCHEMAS
import { Product, ProductSchema } from './schemas/product.schema';

export const ModelsProviderAsync: AsyncModelFactory[] = [
	{
		name: Product.name,
		collection: 'products',
		useFactory: () => ProductSchema,
	},
];
