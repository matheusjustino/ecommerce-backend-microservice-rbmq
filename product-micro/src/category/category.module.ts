import { Module } from '@nestjs/common';

// MODULES
import { DatabaseModule } from '@src/database/database.module';
import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';

// CONTROLLERS
import { CategoryController } from './category.controller';

// SERVICES
import { CategoryService } from './category.service';

// INTERFACES
import { CATEGORY_SERVICE } from '@src/shared/category/interfaces/category.service';

@Module({
	imports: [DatabaseModule],
	controllers: [CategoryController],
	providers: [
		{
			useClass: CategoryService,
			provide: CATEGORY_SERVICE,
		},
	],
	exports: [
		{
			useClass: CategoryService,
			provide: CATEGORY_SERVICE,
		},
	],
})
export class CategoryModule {}
