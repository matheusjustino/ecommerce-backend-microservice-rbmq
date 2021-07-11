import { Module } from '@nestjs/common';

// PROVIDERS
import { HashProviders } from './hash-providers';

@Module({
	providers: [...HashProviders],
	exports: [...HashProviders],
})
export class HashModule {}
