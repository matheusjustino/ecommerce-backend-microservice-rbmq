import { Observable } from 'rxjs';

export const HASH_PROVIDER = 'HASH_PROVIDER';

export interface IHashProvider {
	generateHash(payload: string): Observable<string>;
	compareHash(payload: string, hashed: string): Observable<boolean>;
}
