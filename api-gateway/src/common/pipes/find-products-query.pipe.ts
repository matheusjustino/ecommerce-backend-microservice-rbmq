import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class FindProductsQueryPipe implements PipeTransform {
	private readonly sortValues = ['lowest', 'biggest', 'new', 'az', 'za'];

	public transform(value: any) {
		if (value.sort) {
			if (!this.sortValues.includes(value.sort)) {
				throw new BadRequestException('Sort value not allowed');
			}
		}

		if (value.page) {
			value.page = Number(value.page);
		}

		if (value.perPage) {
			value.perPage = Number(value.perPage);
		}

		return value;
	}
}
