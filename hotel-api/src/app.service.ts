import { Injectable } from '@nestjs/common';
import {
  CreateHotelRoomRequest,
  CreateHotelRoomResponse,
  Hotel,
} from './stubs/hotel/hotel';
import { PrismaService } from './prisma.service';
import { HotelRoom, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.HotelCreateInput): Promise<Hotel> {
    return this.prisma.hotel.create({ data });
  }

  findAll(): Promise<Hotel[]> {
    return this.prisma.hotel.findMany({
      include: { rooms: true },
    });
  }

  findById(id: number): Promise<Hotel> {
    return this.prisma.hotel.findUnique({
      where: { id },
      include: { rooms: true },
    });
  }

  findByName(name: string): Promise<Hotel> {
    return this.prisma.hotel.findFirst({
      where: { name: name },
      include: { rooms: true },
    });
  }

  async update(id: number, data: Prisma.HotelUpdateInput): Promise<Hotel> {
    return this.prisma.hotel.update({
      where: { id },
      data,
    });
  }

  async updateRoom(hotelId: number, roomId: number, data): Promise<HotelRoom> {
    console.log('dans updateRoom');
    console.log(data);

    console.log('hotelId');
    console.log(hotelId);

    console.log('roomId');
    console.log(roomId);

    const toto = await this.prisma.hotelRoom.update({
      where: { id: roomId },
      data: { available: false },
    });

    console.log('prisma');
    console.log(toto);

    return toto;
  }

  delete(id: number): Promise<Hotel> {
    return this.prisma.hotel.delete({
      where: { id },
    });
  }

  async createHotelRoom(
    request: CreateHotelRoomRequest,
  ): Promise<CreateHotelRoomResponse> {
    const { hotelId, roomNumber } = request;

    const createdRoom = await this.prisma.hotelRoom.create({
      data: {
        roomNumber,
        available: true,
        hotel: { connect: { id: hotelId } },
      },
    });

    return { hotelRoom: createdRoom };
  }
}
