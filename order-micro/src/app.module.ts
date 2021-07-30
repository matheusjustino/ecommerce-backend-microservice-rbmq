import { Module } from '@nestjs/common';

// MODULES
import { AppConfigModule } from './app-config/app-config.module';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';
import { CartModule } from './cart/cart.module';
import { ProxyRbmqModule } from './proxy-rbmq/proxy-rbmq.module';
import { CheckoutModule } from './checkout/checkout.module';
import { CorreiosModule } from './correios/correios.module';

@Module({
	imports: [
		AppConfigModule,
		OrderModule,
		DatabaseModule,
		CartModule,
		ProxyRbmqModule,
		CheckoutModule,
		CorreiosModule,
	],
})
export class AppModule {}
