import { Module } from '@nestjs/common';

// MODULES
import { AppConfigModule } from '@src/app-config/app-config.module';

// RBMQ
import { ClientProxyRbmq } from './client-proxy-rbmq';

@Module({
	imports: [AppConfigModule],
	providers: [ClientProxyRbmq],
	exports: [ClientProxyRbmq],
})
export class ProxyRbmqModule {}
