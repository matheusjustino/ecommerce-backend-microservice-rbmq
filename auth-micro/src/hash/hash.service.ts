import { Inject, Injectable } from '@nestjs/common';

import {
	HASH_PROVIDER,
	IHashProvider,
} from '@src/shared/hash/interfaces/hash-provider.interface';
import { IHashService } from '@src/shared/hash/interfaces/hash.service';

@Injectable()
export class HashService implements IHashService {
	constructor(
		@Inject(HASH_PROVIDER)
		private readonly hashProvider: IHashProvider,
	) {}

	public generateHash(payload: string) {
		return this.hashProvider.generateHash(payload);
	}

	public compareHash(payload: string, hashed: string) {
		return this.hashProvider.compareHash(payload, hashed);
	}
}
