import { sse } from '$src/lib/helper/sse';
import { UsageRequest } from '$src/lib/stubs/hotel/v1beta/hotel';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = ({ locals }) => {
	try {
		const stream = locals.hotelClients.usageClient.usingStream(UsageRequest.create());

		return sse<any>(async ({ write }) => {
			for await (const msg of stream.responses) {
				if (msg.username) write({ data: msg });
			}
		});
	} catch (error) {
		console.error(error);
	}

	return new Response();
};

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		const data = await request.json();
		const usageRequest = UsageRequest.create({
			username: data.username,
			hotelName: data.hotelName,
			eventType: data.eventType
		});

		await locals.hotelClients.usageClient.using(usageRequest);

		return new Response();
	} catch (error: any) {
		console.error(error);
		return new Response(null, {
			status: 400
		});
	}
};
