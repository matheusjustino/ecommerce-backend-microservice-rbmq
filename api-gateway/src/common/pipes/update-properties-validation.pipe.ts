import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';

@Injectable()
export class UpdatePropertiesValidationPipe implements PipeTransform {
	public transform(value: any, metadata: ArgumentMetadata) {
		const { metatype } = metadata;
		const classModel = new metatype();

		const classModelKeys = Object.keys(classModel);
		const valueKeys = Object.keys(value);

		const invalidProperties = [];
		const validProperties = valueKeys.reduce((prev, curr) => {
			const hasProperty = classModelKeys.includes(curr);
			if (!hasProperty) {
				invalidProperties.push(curr);
			}
			return prev && hasProperty;
		}, true);

		if (!validProperties) {
			const message =
				invalidProperties.length > 1
					? `The properties${invalidProperties.map(
							(p) => ` ${p}`,
					  )} are invalid`
					: `The property${invalidProperties.map(
							(p) => ` ${p}`,
					  )} is invalid`;

			throw new BadRequestException(message);
		}

		return value;
	}
}
