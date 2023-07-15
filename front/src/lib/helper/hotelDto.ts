import { FieldType, Hotel } from '$lib/stubs/hotel/v1beta/hotel';

export interface IHotel {
	name: string;
	fields: IField[];
	dueDate: Date;
}

export interface IField {
	name: string;
	value: string;
	type: FieldType;
}

export const toJson = (hotel: Hotel): IHotel => {
	return {
		name: hotel.name,
		fields: hotel.fields.map(({ name, value, type }) => ({ name, value, type })),
		dueDate: new Date(hotel.dueDate)
	};
};

export const toPb = (hotel: IHotel) =>
	Hotel.create({
		...hotel,
		dueDate: typeof hotel.dueDate === 'string' ? hotel.dueDate : hotel.dueDate?.toISOString()
	});
