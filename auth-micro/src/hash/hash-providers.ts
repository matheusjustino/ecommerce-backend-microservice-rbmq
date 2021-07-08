// INTERFACES
import { HASH_PROVIDER } from '@src/shared/hash/interfaces/hash-provider.interface';
import { HASH_SERVICE } from '@src/shared/hash/interfaces/hash.service';

// SERVICES
import { HashService } from './hash.service';
import { BcryptHashProvider } from './providers/bcrypt-hash.provider';

export const HashProviders = [
	{
		useClass: HashService,
		provide: HASH_SERVICE,
	},
	{
		useClass: BcryptHashProvider,
		provide: HASH_PROVIDER,
	},
];
