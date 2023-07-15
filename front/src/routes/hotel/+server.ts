import { sse } from '$src/lib/helper/sse';
import { toPb } from '$src/lib/helper/hotelDto';
import { UpdateHotelRequest } from '$lib/stubs/hotel/v1beta/hotel';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ locals }) => {
	try {
		const stream = locals.hotelClients.crudClient.streamHotels({});

		return sse<any>(async ({ write }) => {
			for await (const msg of stream.responses) {
				if (msg.hotel) write({ data: msg });
			}
		});
	} catch (error) {
		console.error(error);
	}

	return new Response();
};

export const POST: RequestHandler = async ({ locals, request }) => {
	const data = await request.json();

	try {
		const updateHotelRequest = UpdateHotelRequest.create({
			hotel: toPb(data)
		});
		await locals.hotelClients.crudClient.updateHotel(updateHotelRequest);

		return new Response();
	} catch (error: any) {
		console.error(error);
		return new Response(null, {
			status: 400
		});
	}
};

