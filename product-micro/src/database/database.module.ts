import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// MODULES
import { AppConfigModule } from '@src/app-config/app-config.module';

// SERVICES
import { AppConfigService } from '@src/app-config/app-config.service';

// PROVIDERS
import { ModelsProviderAsync } from './models.provider';

// REPOSITORIES
import { ProductRepository } from './repositories/product.repository';
import { CategoryRepository } from './repositories/schema.repository';
import { StockRepository } from './repositories/stock.repository';

@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [AppConfigModule],
			useFactory: (appConfigService: AppConfigService) => ({
				uri: appConfigService.databaseUrl,
				useNewUrlParser: true,
				useFindAndModify: false,
				useUnifiedTopology: true,
				useCreateIndex: true,
			}),
			inject: [AppConfigService],
		}),
		MongooseModule.forFeatureAsync(ModelsProviderAsync),
	],
	providers: [ProductRepository, CategoryRepository, StockRepository],
	exports: [ProductRepository, CategoryRepository, StockRepository],
})
export class DatabaseModule {}
