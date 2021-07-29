import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// MODULES
import { AppConfigModule } from '@src/app-config/app-config.module';

// SERVICES
import { AppConfigService } from '@src/app-config/app-config.service';

// PROVIDERS
import { ModelsProviderAsync } from './models.provider';

// REPOSITORIES
import { CartRepository } from './repositories/cart.repository';

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
	providers: [CartRepository],
	exports: [CartRepository],
})
export class DatabaseModule {}
