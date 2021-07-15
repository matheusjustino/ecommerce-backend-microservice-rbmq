import { Module } from '@nestjs/common';

// SERVICES
import { CategoryService } from './category.service';

// CONTROLLERS
import { CategoryController } from './category.controller';

// RBMQ
import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';

// INTERFACES
import { CATEGORY_SERVICE } from '@src/shared/category/interfaces/category.service';

@Module({
	imports: [ProxyRbmqModule],
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
