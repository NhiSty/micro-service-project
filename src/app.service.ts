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
