import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { Observable } from 'rxjs';
import { from } from 'rxjs';

import { IHashProvider } from '@src/shared/hash/interfaces/hash-provider.interface';

@Injectable()
export class BcryptHashProvider implements IHashProvider {
	public generateHash(payload: string): Observable<string> {
		return from(hash(payload, 10));
	}

	public compareHash(payload: string, hashed: string): Observable<boolean> {
		return from(compare(payload, hashed));
	}
}
