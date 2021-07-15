import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { ProxyRbmqModule } from './proxy-rbmq/proxy-rbmq.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';

@Module({
	imports: [
		AppConfigModule,
		ProxyRbmqModule,
		DatabaseModule,
		ProductModule,
		CategoryModule,
	],
})
export class AppModule {}
