import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  FindRequest,
  FindResponse,
  Hotel,
  HOTEL_CR_UD_SERVICE_NAME,
  HotelCRUDServiceClient,
  UpdateStatutOfRoomInHotelRequest,
  UpdateStatutOfRoomInHotelResponse,
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

  async changeStatutOfChamber(
    req: UpdateStatutOfRoomInHotelRequest,
  ): Promise<Hotel> {
    const res: FindResponse = await firstValueFrom(
      this.hotelService.find({ id: req.hotelId }) as any,
    );

    const hotel = res.hotels?.[0];

    const updatedHotel: UpdateStatutOfRoomInHotelResponse =
      await firstValueFrom(
        this.hotelService.updateRoomInHotel({
          hotelId: hotel?.id,
          id: req.id,
        }),
      );

    return updatedHotel.hotel;
  }
}
