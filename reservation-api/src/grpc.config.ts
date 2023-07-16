// Filename : grpc.config.ts
import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import {
  RESERVATION_CR_UD_SERVICE_NAME,
  RESERVATION_PACKAGE_NAME,
} from './stubs/reservation/v1alpha/reservation';
import { join } from 'path';
import {
  HOTEL_CR_UD_SERVICE_NAME,
  HOTEL_PACKAGE_NAME,
} from './stubs/hotel/hotel';

export const grpcConfig: ClientProviderOptions = {
  name: RESERVATION_CR_UD_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:4004',
    package: RESERVATION_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/reservation/v1alpha/reservation.proto'),
  },
};

export const grpcConfigHotel: ClientProviderOptions = {
  name: HOTEL_CR_UD_SERVICE_NAME,
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:4003',
    package: HOTEL_PACKAGE_NAME,
    loader: {
      includeDirs: [join(__dirname, 'proto')],
    },
    protoPath: join(__dirname, 'proto/hotel/hotel.proto'),
  },
};
