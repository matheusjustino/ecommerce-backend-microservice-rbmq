import { Module } from '@nestjs/common';

// RMBQ
import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';

// SERVICES
import { StockService } from './stock.service';

// CONTROLLERS
import { StockController } from './stock.controller';

// INTERFACES
import { STOCK_SERVICE } from '@src/shared/stock/interfaces/stock.service';

@Module({
	imports: [ProxyRbmqModule],
	controllers: [StockController],
	providers: [
		{
			useClass: StockService,
			provide: STOCK_SERVICE,
		},
	],
	exports: [
		{
			useClass: StockService,
			provide: STOCK_SERVICE,
		},
	],
})
export class StockModule {}
