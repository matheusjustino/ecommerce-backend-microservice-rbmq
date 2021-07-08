import { Observable } from 'rxjs';

export const HASH_SERVICE = 'HASH_SERVICE';

export interface IHashService {
	generateHash(payload: string): Observable<string>;
	compareHash(payload: string, hashed: string): Observable<boolean>;
}
