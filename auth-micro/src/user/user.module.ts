import { Module } from '@nestjs/common';

import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';

import { UserService } from './user.service';

@Module({
	imports: [ProxyRbmqModule],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
