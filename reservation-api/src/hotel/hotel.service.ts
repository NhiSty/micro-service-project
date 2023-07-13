import { Inject, Injectable } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { FindRequest, FindResponse, Hotel } from '../stubs/hotel/hotel';
import {
  HOTEL_CR_UD_SERVICE_NAME,
  HotelCRUDServiceClient,
} from '../stubs/hotel/hotel';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HotelService implements OnModuleInit {
  private hotelService: HotelCRUDServiceClient;
  constructor(@Inject(HOTEL_CR_UD_SERVICE_NAME) private client: ClientGrpc) {}
  onModuleInit() {
    this.hotelService = this.client.getService<HotelCRUDServiceClient>(
      HOTEL_CR_UD_SERVICE_NAME,
    );
  }
  async findHotel(req: FindRequest): Promise<Hotel> {
    const res: FindResponse = await firstValueFrom(
      this.hotelService.find(req) as any,
    );
    return res.hotels?.[0];
  }
}
