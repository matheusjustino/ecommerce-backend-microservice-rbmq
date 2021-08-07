import { Module } from '@nestjs/common';

// MODULES
import { DatabaseModule } from '@src/database/database.module';
import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';

// SERVICES
import { StockService } from './stock.service';

// INTERFACES
import { STOCK_SERVICE } from '../shared/stock/interfaces/stock.service';

// CONTROLLERS
import { StockController } from './stock.controller';

@Module({
	imports: [DatabaseModule, ProxyRbmqModule],
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
