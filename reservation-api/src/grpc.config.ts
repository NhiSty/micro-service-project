// Filename : grpc.config.ts
import {
  ClientProviderOptions,
  GrpcOptions,
  Transport,
} from '@nestjs/microservices';
import { RESERVATION_PACKAGE_NAME } from './stubs/reservation/v1alpha/reservation';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { HOTEL_PACKAGE_NAME } from './stubs/hotel/hotel';

export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:6003',
    package: RESERVATION_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/reservation/v1alpha/reservation.proto'),
  },
}) as GrpcOptions;

export const grpcConfigHotel: ClientProviderOptions = {
  name: HOTEL_PACKAGE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:6002',
    package: HOTEL_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, 'proto')],
    },
    protoPath: join(__dirname, 'proto/hotel/hotel.proto'),
  },
};
