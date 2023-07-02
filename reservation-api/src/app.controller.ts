import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ListReservationsRequest,
  ListReservationsResponse, Reservation,
  ReservationServiceControllerMethods
} from "./stubs/reservation/v1alpha/reservation";
import {Metadata} from "@grpc/grpc-js";

@Controller()
@ReservationServiceControllerMethods()
export class AppController {
  constructor(private readonly appService: AppService) {}

  async find(request: ListReservationsRequest, metadata?: Metadata): Promise<ListReservationsResponse> {
    let reservations: Reservation[] = [];
    let reservation: Reservation;

    if (request.hotelId) {
      reservations =  await this.appService.findByHotelId(request.hotelId);
      return { reservations: reservations };
    }

  }
}
