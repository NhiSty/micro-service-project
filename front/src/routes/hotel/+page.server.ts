import {
	CreateHotelRequest,
	UpdateHotelRequest,
	DeleteHotelRequest,
	FieldType
} from '$lib/stubs/hotel/v1beta/hotel';
import { toPb } from '$lib/helper/hotelDto';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	newHotel: async ({ request, locals, cookies }) => {
		const data = await request.formData();
		const name = data.get('name') as string;
		const dueDate = data.get('dueDate') as string;

		try {
			const [time, date] = dueDate.split(' ', 2);
			const [hour, minute] = time.split(':', 2);
			const [year, month, day] = date.split('-', 3);
			const createHotelRequest = CreateHotelRequest.create({
				hotel: toPb({ fields: [], name, dueDate: new Date(+year, +month - 1, +day, +hour, +minute) })
			});
			await locals.hotelClients.crudClient.createHotel(createHotelRequest, {
				meta: {
					Authorization: `Bearer ${cookies.get('jwt')}`
				}
			});

			return { success: 200 };
		} catch (error: any) {
			console.error(error);
			return fail(400, { error: error?.message || 'something went wront' });
		}
	},

	addField: async ({ request, locals }) => {
		const data = await request.formData();
		const hotelName = data.get('hotelName') as string;
		const fieldName = data.get('fieldName') as string;
		const fieldValue = data.get('fieldValue') as string;

		try {
			await locals.hotelClients.fieldClient.addField({
				fieldName,
				fieldValue,
				fieldType: FieldType.STRING,
				hotelName
			});

			return { success: true };
		} catch (error: any) {
			console.error(error);
			return fail(400, { error: error?.message || 'something went wront' });
		}
	},
	removeHotel: async ({ request, locals }) => {
		const data = await request.formData();
		const hotelName = data.get('hotelName') as string;
		const fieldName = data.get('fieldName') as string;

		try {
			await locals.hotelClients.fieldClient.removeField({
				fieldName,
				hotelName
			});

			return { success: true };
		} catch (error: any) {
			console.error(error);
			return fail(400, { error: error?.message || 'something went wront' });
		}
	},

	updateHotel: async ({ request, locals }) => {
		const data = await request.formData();
		const stringHotel = data.get('hotel') as string;

		try {
			const updateHotelRequest = UpdateHotelRequest.create({
				hotel: toPb(JSON.parse(stringHotel))
			});
			await locals.hotelClients.crudClient.updateHotel(updateHotelRequest);

			return { success: true };
		} catch (error: any) {
			console.error(error);
			return fail(400, { error: error?.message || 'something went wront' });
		}
	},

	deleteHotel: async ({ request, locals }) => {
		const data = await request.formData();
		const name = data.get('name') as any;

		try {
			const deleteHotelRequest = DeleteHotelRequest.create({
				name
			});
			await locals.hotelClients.crudClient.deleteHotel(deleteHotelRequest);

			return { success: true };
		} catch (error: any) {
			console.error(error);
			return fail(400, { error: error?.message || 'something went wront' });
		}
	}
};
