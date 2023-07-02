import { Injectable } from '@nestjs/common';
import {PrismaService} from "./prisma.service";
import {Prisma} from "@prisma/client";
import {Reservation} from "./stubs/reservation/v1alpha/reservation";

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

    findByPeriods(start: Date, end: Date): Promise<Reservation[]> {
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

    findByHotelId(hotelId: string): Promise<Reservation[]> {
        return this.prisma.reservation.findMany({
            where: {
                hotelId: +hotelId,
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
