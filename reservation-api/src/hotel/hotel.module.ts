import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { ClientsModule } from '@nestjs/microservices';
import { grpcConfigHotel } from 'src/grpc.config';

@Module({
  imports: [ClientsModule.register([grpcConfigHotel])],
  providers: [HotelService],
  exports: [HotelService],
})
export class HotelModule {}
