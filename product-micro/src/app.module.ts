import { Module } from '@nestjs/common';
import { AppConfigModule } from './app-config/app-config.module';
import { ProxyRbmqModule } from './proxy-rbmq/proxy-rbmq.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';

@Module({
	imports: [AppConfigModule, ProxyRbmqModule, DatabaseModule, ProductModule],
})
export class AppModule {}
