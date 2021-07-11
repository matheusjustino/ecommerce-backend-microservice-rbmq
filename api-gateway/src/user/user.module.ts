import { Module } from '@nestjs/common';

// MODULES
import { AppConfigModule } from '@src/app-config/app-config.module';
import { ProxyRbmqModule } from '@src/proxy-rbmq/proxy-rbmq.module';

// SERVICES
import { UserService } from './user.service';

import { UserController } from './user.controller';

// INTERFACES
import { USER_SERVICE } from '@src/shared/user/interfaces/user.service';

@Module({
	imports: [AppConfigModule, ProxyRbmqModule],
	controllers: [UserController],
	providers: [
		{
			useClass: UserService,
			provide: USER_SERVICE
		}
	],
	exports: [
		{
			useClass: UserService,
			provide: USER_SERVICE
		}
	]
})
export class UserModule { }
