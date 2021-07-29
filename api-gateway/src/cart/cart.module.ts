import { Module } from '@nestjs/common';

import { CartController } from './cart.controller';

// SERVICES
import { CartService } from './cart.service';

// RBMQ
import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';

// INTERFACES
import { CART_SERVICE } from '@src/shared/cart/interfaces/cart.service';

@Module({
	imports: [ProxyRbmqModule],
	controllers: [CartController],
	providers: [
		{
			useClass: CartService,
			provide: CART_SERVICE,
		},
	],
})
export class CartModule {}
