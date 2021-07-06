import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
	public async transform(value: any, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}

		const object = plainToClass(metatype, value);
		const errors = await validate(object);
		if (errors.length > 0) {
			throw new BadRequestException(
				errors
					.map((err) => {
						if (err.children.length > 0) {
							return this.nestedValidate(err.children);
						} else {
							return err.constraints;
						}
					})
					.flat(),
			);
		}

		return value;
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object];
		return !types.includes(metatype);
	}

	private nestedValidate(oldChildren) {
		if (!Array.isArray(oldChildren)) {
			if (oldChildren.children.length === 0) {
				return oldChildren.constraints;
			} else {
				return this.nestedValidate(oldChildren.children);
			}
		}

		return oldChildren
			.map((ch) => {
				return this.nestedValidate(ch);
			})
			.reduce((prev, curr) => {
				return [...prev, curr];
			}, [])
			.flat();
	}
}
