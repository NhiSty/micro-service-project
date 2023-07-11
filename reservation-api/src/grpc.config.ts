// Filename : grpc.config.ts
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { RESERVATION_PACKAGE_NAME } from './stubs/reservation/v1alpha/reservation';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
    transport: Transport.GRPC,
    options: {
        url: '0.0.0.0:6003',
        package: RESERVATION_PACKAGE_NAME,
        protoPath: join(__dirname, 'proto/reservation/v1alpha/reservation.proto'),
    },
}) as GrpcOptions;