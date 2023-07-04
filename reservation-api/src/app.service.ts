import { Injectable } from '@nestjs/common';
import {PrismaService} from "./prisma.service";
import {Reservation} from "./stubs/reservation/v1alpha/reservation";
import {Prisma} from "@prisma/client";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  create(data: Prisma.ReservationCreateInput): Promise<Reservation> {
    return this.prisma.reservation.create({ data });
  }

  findAll(): Promise<Reservation[]> {
    return this.prisma.reservation.findMany();
  }

    findById(id: number): Promise<Reservation> {
        return this.prisma.reservation.findUnique({
            where: {
                id: id,
            },
        });
    }

    findByName(name: string): Promise<Reservation> {
        return this.prisma.reservation.findFirst({
            where: {
                name: name,
            },
        });
    }

    findByPeriods(start: string, end: string): Promise<Reservation[]> {
        return this.prisma.reservation.findMany({
            where: {
                AND: [
                    {
                        checkInDate: {
                            gte: start,
                        },
                    },
                    {
                        checkOutDate: {
                            lte: end,
                        },
                    },
                ],
            },
        });
    }

    findByRoomId(roomId: number): Promise<Reservation[]> {
        return this.prisma.reservation.findMany({
            where: {
                roomId: roomId,
            },
        });
    }

    findByHotelId(hotelId: number): Promise<Reservation[]> {
        return this.prisma.reservation.findMany({
            where: {
                hotelId,
            },
        });
    }

    async update(id: number, data: Prisma.ReservationUpdateInput): Promise<Reservation> {
        return this.prisma.reservation.update({
            where: {
                id: id,
            },
            data,
        });
    }

    delete(id: number): Promise<Reservation> {
        return this.prisma.reservation.delete({
            where: {
                id: id,
            },
        });
    }
}
