// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { AuthServiceClient } from './lib/stubs/auth/v1alpha/service';
import type {
	FieldServiceClient,
	HotelServiceClient,
	UsageServiceClient
} from './lib/stubs/hotel/v1beta/hotel';
import type { UserServiceClient } from './lib/stubs/user/v1alpha/service';

// and what to do when importing types
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			hotelClients: {
				crudClient: HotelServiceClient;
				fieldClient: FieldServiceClient;
				usageClient: UsageServiceClient;
			};
			authClient: AuthServiceClient;
			userClient: UserServiceClient;
		}

		// interface PageData {}
		// interface Platform {}
	}
}

export {};
