import { AsyncModelFactory } from '@nestjs/mongoose';

// SCHEMAS
import { Product, ProductSchema } from './schemas/product.schema';
import { Category, CategorySchema } from './schemas/category.schema';

export const ModelsProviderAsync: AsyncModelFactory[] = [
	{
		name: Product.name,
		collection: 'products',
		useFactory: () => ProductSchema,
	},
	{
		name: Category.name,
		collection: 'categories',
		useFactory: () => CategorySchema,
	},
];
