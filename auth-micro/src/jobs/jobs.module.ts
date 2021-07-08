import { Module } from '@nestjs/common';

import { JobsService } from './jobs.service';

import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';

@Module({
	imports: [ProxyRbmqModule],
	providers: [JobsService],
	exports: [JobsService],
})
export class JobsModule {}
