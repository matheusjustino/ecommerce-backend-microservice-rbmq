import { NestFactory } from '@nestjs/core';
import momentTimezone from 'moment-timezone';
import helmet from 'helmet';

// MODULES
import { AppModule } from './app.module';

// FILTERS
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

// INTERCEPTORS
import { RateLimitInterceptor } from './common/interceptors/rate-limit.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

// PIPES
import { CustomValidationPipe } from './common/pipes/custom-validation-pipe.pipe';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(helmet());

	app.setGlobalPrefix('api/v1');

	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalInterceptors(
		new RateLimitInterceptor(),
		new TimeoutInterceptor(),
	);
	app.useGlobalPipes(new CustomValidationPipe());

	Date.prototype.toJSON = function (): any {
		return momentTimezone(this)
			.tz('America/Sao_Paulo')
			.format('YYYY-MM-DD HH:mm:ss.SSSS');
	};

	await app.listen(8080);
}
bootstrap();
