import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

// RBMQ
import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';

// MODULES
import { DatabaseModule } from '@src/database/database.module';

// INTERFACES
import { CART_SERVICE } from '@src/shared/cart/services/cart.service';

@Module({
	imports: [DatabaseModule, ProxyRbmqModule],
	controllers: [CartController],
	providers: [
		{
			useClass: CartService,
			provide: CART_SERVICE,
		},
	],
})
export class CartModule {}
