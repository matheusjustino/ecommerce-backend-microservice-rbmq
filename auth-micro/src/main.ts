import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { AppConfigService } from './app-config/app-config.service';
import { ExceptionFilter } from './common/filters/rpc-exception.filter';
import { CustomValidationPipe } from './common/pipes/custom-validation-pipe.pipe';

const logger = new Logger('MAIN-MICRO-AUTH');
const configService = new ConfigService();
const appConfigService = new AppConfigService(configService);

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.RMQ,
			options: {
				urls: [appConfigService.amqpUrl],
				queue: appConfigService.queue,
				queueOptions: {
					durable: false,
				},
			},
		},
	);

	app.useGlobalPipes(new CustomValidationPipe());
	app.useGlobalFilters(new ExceptionFilter());

	app.listen(() =>
		logger.log(
			`Nestjs-Auth-RBMQ Microservice is listening: ${appConfigService.queue}`,
		),
	);
}
bootstrap();
