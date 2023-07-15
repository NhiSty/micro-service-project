import '$lib/server/tracing';
import type { Handle } from '@sveltejs/kit';
import { authClient, hotelClients, userClient } from '$lib/server/rpcClients';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.hotelClients = hotelClients;
	event.locals.userClient = userClient;
	event.locals.authClient = authClient;

	const response = await resolve(event);

	return response;
};
