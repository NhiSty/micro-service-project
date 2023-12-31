import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Hotel,
  FindRequest,
  FindResponse,
  HotelCRUDServiceController,
  HotelCRUDServiceControllerMethods,
  CreateHotelRequest,
  CreateHotelResponse,
  UpdateHotelRequest,
  UpdateHotelResponse,
  DeleteHotelRequest,
  DeleteHotelResponse,
  CreateHotelRoomRequest,
  UpdateStatutOfRoomInHotelRequest,
  UpdateStatutOfRoomInHotelResponse,
} from './stubs/hotel/hotel';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@HotelCRUDServiceControllerMethods()
export class AppController implements HotelCRUDServiceController {
  constructor(private readonly appService: AppService) {}

  async find(request: FindRequest, metadata?: Metadata): Promise<FindResponse> {
    let hotel: Hotel;
    let hotels: Hotel[] = [];

    if (request.id) {
      hotel = await this.appService.findById(request.id);
      return { hotels: [hotel] };
    } else if (request.name) {
      hotel = await this.appService.findByName(request.name);
      return { hotels: [hotel] };
    } else {
      hotels = await this.appService.findAll();
      return { hotels };
    }
  }

  async create(request: CreateHotelRequest): Promise<CreateHotelResponse> {
    const hotel = await this.appService.create({
      name: request.name,
      address: request.address,
      city: request.city,
      country: request.country,
    });

    const hotelId = hotel.id;

    const createRoomRequests: CreateHotelRoomRequest[] = [];
    for (let i = 1; i <= 5; i++) {
      createRoomRequests.push({
        hotelId,
        roomNumber: i,
      });
    }

    for (const createRoomRequest of createRoomRequests) {
      await this.appService.createHotelRoom(createRoomRequest);
    }

    const updatedHotel = await this.appService.findById(hotelId);

    return { hotel: updatedHotel };
  }

  async update(request: UpdateHotelRequest): Promise<UpdateHotelResponse> {
    const { id, rooms, ...updateData } = request;

    const hotel = await this.appService.findById(id);

    if (!hotel) {
      throw new Error(`Hotel with ID ${id} not found.`);
    }

    const updatedHotel = await this.appService.update(id, updateData);

    return { hotel: updatedHotel };
  }

  async updateRoomInHotel(
    request: UpdateStatutOfRoomInHotelRequest,
  ): Promise<UpdateStatutOfRoomInHotelResponse> {
    const { hotelId, id } = request;

    const hotel = await this.appService.findById(hotelId);

    if (!hotel) {
      throw new Error(`Hotel with ID ${hotelId} not found.`);
    }

    const statusOfRoom = hotel.rooms.find((room) => room.id === id)?.available;

    const updatedHotel = await this.appService.updateRoom(hotelId, id, {
      available: !statusOfRoom,
    });

    return { hotel: updatedHotel };
  }

  async delete(request: DeleteHotelRequest): Promise<DeleteHotelResponse> {
    const deletedHotel = await this.appService.delete(request.id);
    return { hotel: deletedHotel };
  }
}
