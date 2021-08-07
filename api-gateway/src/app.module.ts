import { Module } from '@nestjs/common';

// MODULES
import { AppConfigModule } from './app-config/app-config.module';
import { AuthModule } from './auth/auth.module';
import { ProxyRbmqModule } from './proxy-rbmq/proxy-rbmq.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { CartModule } from './cart/cart.module';
import { StockModule } from './stock/stock.module';

@Module({
	imports: [
		AppConfigModule,
		AuthModule,
		ProxyRbmqModule,
		UserModule,
		ProductModule,
		CategoryModule,
		CartModule,
		StockModule,
	],
})
export class AppModule {}
