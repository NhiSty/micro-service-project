import { FieldType, Hotel } from '$lib/stubs/hotel/v1beta/hotel';

export interface IHotel {
	name: string;
	fields: IField[];
	address: string;
	city: string;
	country: string;
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
		address: hotel.address,
		city: hotel.city,
		country: hotel.country
	};
};

export const toPb = (hotel: IHotel) =>
	Hotel.create({
		...hotel,
		fields: hotel.fields.map(({ name, value, type }) => ({ name, value, type }))
	});
