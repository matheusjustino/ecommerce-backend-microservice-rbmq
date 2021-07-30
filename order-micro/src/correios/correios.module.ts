import { Module } from '@nestjs/common';

// SERVICES
import { CorreiosService } from './correios.service';

// INTERFACES
import { CORREIOS_SERVICE } from '@src/shared/correios/services/correios.service';

@Module({
	providers: [
		{
			useClass: CorreiosService,
			provide: CORREIOS_SERVICE,
		},
	],
	exports: [
		{
			useClass: CorreiosService,
			provide: CORREIOS_SERVICE,
		},
	],
})
export class CorreiosModule {}
