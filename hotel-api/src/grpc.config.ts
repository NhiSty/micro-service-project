// Filename : grpc.config.ts
import {ClientProviderOptions, GrpcOptions, Transport} from '@nestjs/microservices';
import {HOTEL_CR_UD_SERVICE_NAME, HOTEL_PACKAGE_NAME} from './stubs/hotel/hotel';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig: ClientProviderOptions = {
  name: HOTEL_CR_UD_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:4003',
    package: HOTEL_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/hotel/hotel.proto'),
  },
}
