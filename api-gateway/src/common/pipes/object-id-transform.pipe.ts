import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdTransformPipe implements PipeTransform {
	public transform(
		value: string,
		_metadata: ArgumentMetadata,
	): Types.ObjectId {
		try {
			const _id = Types.ObjectId(value);
			return _id;
		} catch {
			throw new BadRequestException('Invalid Id parameter!');
		}
	}
}
