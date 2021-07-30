import { Module } from '@nestjs/common';

import { CheckoutController } from './checkout.controller';

// MODULES
import { CorreiosModule } from '@src/correios/correios.module';
import { DatabaseModule } from '@src/database/database.module';

// SERVICES
import { CheckoutService } from './checkout.service';

// INTERFACES
import { CHECKOUT_SERVICE } from '@src/shared/checkout/services/checkout.service';

@Module({
	imports: [DatabaseModule, CorreiosModule],
	controllers: [CheckoutController],
	providers: [
		{
			useClass: CheckoutService,
			provide: CHECKOUT_SERVICE,
		},
	],
	exports: [
		{
			useClass: CheckoutService,
			provide: CHECKOUT_SERVICE,
		},
	],
})
export class CheckoutModule {}
