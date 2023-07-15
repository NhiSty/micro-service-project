import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  CreateReservationRequest,
  DeleteReservationRequest,
  DeleteReservationResponse,
  GetReservationRequest,
  ListReservationsRequest,
  ListReservationsResponse,
  Reservation,
  ReservationCRUDServiceControllerMethods,
  UpdateReservationRequest,
} from './stubs/reservation/v1alpha/reservation';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@ReservationCRUDServiceControllerMethods()
export class AppController {
  constructor(private readonly appService: AppService) {}

  async getReservation(
    request: GetReservationRequest,
    metadata?: Metadata,
  ): Promise<Reservation> {
    return this.appService.findById(request.id);
  }

  async listReservations(
    request: ListReservationsRequest,
    metadata?: Metadata,
  ): Promise<ListReservationsResponse> {
    let reservations: Reservation[] = [];

    if (request.hotelId) {
      // reservations = await this.appService.findHotelById(request.hotelId);
      // return { reservations: reservations };
    } else if (request.roomId) {
      reservations = await this.appService.findByRoomId(request.roomId);
      return { reservations: reservations };
    } else if (request.checkInDate && request.checkOutDate) {
      reservations = await this.appService.findByPeriods(
        request.checkInDate,
        request.checkOutDate,
      );
      return { reservations: reservations };
    }

    reservations = await this.appService.findAll();
    return { reservations: reservations };
  }

  async createReservation(
    request: CreateReservationRequest,
    metadata?: Metadata,
  ): Promise<Reservation> {
    const hotel = this.appService.findHotelById(request.hotelId);

    console.log('------------------');
    console.log(hotel);

    return this.appService.create({
      name: request.name,
      hotelId: request.hotelId,
      roomId: request.roomId,
      checkInDate: request.checkInDate,
      checkOutDate: request.checkOutDate,
    });
  }

  async updateReservation(
    request: UpdateReservationRequest,
    metadata?: Metadata,
  ): Promise<Reservation> {
    return this.appService.update(request.id, {
      name: request.name,
      hotelId: request.hotelId,
      roomId: request.roomId,
      checkInDate: request.checkInDate,
      checkOutDate: request.checkOutDate,
    });
  }

  async deleteReservation(
    request: DeleteReservationRequest,
    metadata?: Metadata,
  ): Promise<DeleteReservationResponse> {
    const reservation = await this.appService.findById(request.id);
    await this.appService.delete(request.id);
    return { reservation: reservation };
  }
}
