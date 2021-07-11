import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { DatabaseModule } from '../database/database.module';
import { ProxyRbmqModule } from '../proxy-rbmq/proxy-rbmq.module';
import { USER_SERVICE } from '../shared/user/interfaces/user.service';

@Module({
	imports: [DatabaseModule, ProxyRbmqModule],
	controllers: [UserController],
	providers: [
		{
			useClass: UserService,
			provide: USER_SERVICE
		}
	],
})
export class UserModule { }
