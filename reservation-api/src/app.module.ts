import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcConfig, grpcConfigHotel } from './grpc.config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    GrpcReflectionModule.register(grpcConfig),
    GrpcReflectionModule.register(grpcConfigHotel),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
