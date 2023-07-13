import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcConfig } from './grpc.config';
import { PrismaService } from './prisma.service';
import { HotelModule } from './hotel/hotel.module';

@Module({
  imports: [GrpcReflectionModule.register(grpcConfig), HotelModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
