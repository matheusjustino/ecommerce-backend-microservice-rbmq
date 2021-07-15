import { Module } from '@nestjs/common';

// RBMQ
import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';

// INTERFACES
import { PRODUCT_SERVICE } from '@src/shared/product/interfaces/product.service';

// CONTROLEERS
import { ProductController } from './product.controller';

// SERVICES
import { ProductService } from './product.service';

@Module({
	imports: [ProxyRbmqModule],
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
