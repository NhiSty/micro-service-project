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
import { HotelService } from './hotel/hotel.service';

@Controller()
@ReservationCRUDServiceControllerMethods()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly hotelService: HotelService,
  ) {}

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

    if (request.roomId) {
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
    const hotel = await this.hotelService.findHotel({
      id: request.hotelId,
    });

    if (!hotel) {
      throw new Error('Hotel not found');
    }

    const roomId = request.roomId;

    const roomToUpdate = hotel?.rooms.find((room) => room.id === roomId);

    if (roomToUpdate) {
      try {
        await this.hotelService.changeStatutOfChamber({
          hotelId: hotel.id,
          id: roomId,
        });
      } catch (error) {
        console.log(error);
      }
    }

    return this.appService.create({
      name: request.name,
      hotelId: hotel.id,
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

    if (!reservation) {
      throw new Error('reservation not found');
    }

    const roomId = reservation.roomId;
    const hotelId = reservation.hotelId;

    const hotel = await this.hotelService.findHotel({
      id: hotelId,
    });

    const roomToUpdate = hotel?.rooms.find((room) => room.id === roomId);

    if (roomToUpdate) {
      try {
        await this.hotelService.changeStatutOfChamber({
          hotelId: hotel.id,
          id: roomId,
        });
      } catch (error) {
        console.log(error);
      }
    }

    await this.appService.delete(request.id);
    return { reservation: reservation };
  }
}
