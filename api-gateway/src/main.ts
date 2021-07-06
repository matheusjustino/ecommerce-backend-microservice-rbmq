import { NestFactory } from '@nestjs/core';

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

	app.setGlobalPrefix('api/v1');

	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalInterceptors(
		new RateLimitInterceptor(),
		new TimeoutInterceptor(),
	);
	app.useGlobalPipes(new CustomValidationPipe());

	await app.listen(3000);
}
bootstrap();
