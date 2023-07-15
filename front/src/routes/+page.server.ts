import type { PageServerLoad } from './$types';
import { ListHotelsRequest } from '$lib/stubs/hotel/v1beta/hotel';
import { toJson } from '$src/lib/helper/hotelDto';

export const load: PageServerLoad = async ({ locals }) => {
	const listHotelRequest = ListHotelsRequest.create();
	const request = await locals.hotelClients.crudClient.listHotels(listHotelRequest);
	const listHotelsResponse = request.response;

	const hotels = listHotelsResponse.hotels.map(toJson);

	return {
		hotels
	};
};
