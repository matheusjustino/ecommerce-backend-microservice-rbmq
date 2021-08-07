import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

// RBMQ
import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';

// MODULES
import { DatabaseModule } from '@src/database/database.module';
import { StockModule } from '../stock/stock.module';

// INTERFACES
import { PRODUCT_SERVICE } from '@src/shared/product/interfaces/product.service';

@Module({
	imports: [DatabaseModule, ProxyRbmqModule, StockModule],
	controllers: [ProductController],
	providers: [
		{
			useClass: ProductService,
			provide: PRODUCT_SERVICE,
		},
	],
	exports: [
		{
			useClass: ProductService,
			provide: PRODUCT_SERVICE,
		},
	],
})
export class ProductModule {}
