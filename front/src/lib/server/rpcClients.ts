import { GrpcTransport } from '@protobuf-ts/grpc-transport';
import { ChannelCredentials } from '@grpc/grpc-js';
import {
	FieldServiceClient,
	HotelServiceClient,
	UsageServiceClient
} from '$lib/stubs/hotel/v1beta/hotel.client';
import fs from 'fs';
import { UserServiceClient } from '$src/lib/stubs/user/v1alpha/service.client';
import { AuthServiceClient } from '$src/lib/stubs/auth/v1alpha/service.client';
import { env } from '$env/dynamic/private';
import { errorLoggerInterceptor, otelInterceptor } from './interceptor';
import type { ServerStreamingCall, UnaryCall } from '@protobuf-ts/runtime-rpc';

export const credentials =
	env.secure === 'true'
		? ChannelCredentials.createSsl(
				fs.readFileSync(env.ROOT_CA as string),
				fs.readFileSync(env.FRONT_KEY as string),
				fs.readFileSync(env.FRONT_CERT as string)
		  )
		: ChannelCredentials.createInsecure();

const interceptors = [];

const userTransport = new GrpcTransport({
	host: env.USER_API_URL as string,
	channelCredentials: credentials,
	interceptors: [
		{
			interceptUnary: otelInterceptor<UnaryCall>(env.USER_API_URL)
		},
		{
			interceptUnary: errorLoggerInterceptor
		}
	]
});
const authTransport = new GrpcTransport({
	host: env.AUTH_API_URL as string,
	channelCredentials: credentials,
	interceptors: [
		{
			interceptUnary: otelInterceptor<UnaryCall>(env.AUTH_API_URL)
		},
		{
			interceptUnary: errorLoggerInterceptor
		}
	]
});

const hotelTransport = new GrpcTransport({
	host: env.HOTEL_API_URL as string,
	channelCredentials: credentials,
	interceptors: [
		{
			interceptUnary: otelInterceptor<UnaryCall>(env.HOTEL_API_URL),
			interceptServerStreaming: otelInterceptor<ServerStreamingCall>(env.HOTEL_API_URL)
		},
		{
			interceptUnary: errorLoggerInterceptor
		}
	]
});

export const hotelClients = {
	crudClient: new HotelServiceClient(hotelTransport),
	fieldClient: new FieldServiceClient(hotelTransport),
	usageClient: new UsageServiceClient(hotelTransport)
};

export const userClient = new UserServiceClient(userTransport);
export const authClient = new AuthServiceClient(authTransport);
