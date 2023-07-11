/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "reservation";

export interface Reservation {
  id?: number;
  name?: string;
  hotelId?: number;
  roomId?: number;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface GetReservationRequest {
  id?: number;
}

export interface ListReservationsRequest {
  hotelId?: number;
  roomId?: number;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface ListReservationsResponse {
  reservations?: Reservation[];
}

export interface CreateReservationRequest {
  name?: string;
  hotelId?: number;
  roomId?: number;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface UpdateReservationRequest {
  id?: number;
  name?: string;
  hotelId?: number;
  roomId?: number;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface DeleteReservationRequest {
  id?: number;
}

export interface DeleteReservationResponse {
  reservation?: Reservation;
}

export const RESERVATION_PACKAGE_NAME = "reservation";

export interface ReservationCRUDServiceClient {
  getReservation(request: GetReservationRequest, metadata?: Metadata): Observable<Reservation>;

  listReservations(request: ListReservationsRequest, metadata?: Metadata): Observable<ListReservationsResponse>;

  createReservation(request: CreateReservationRequest, metadata?: Metadata): Observable<Reservation>;

  updateReservation(request: UpdateReservationRequest, metadata?: Metadata): Observable<Reservation>;

  deleteReservation(request: DeleteReservationRequest, metadata?: Metadata): Observable<DeleteReservationResponse>;
}

export interface ReservationCRUDServiceController {
  getReservation(
    request: GetReservationRequest,
    metadata?: Metadata,
  ): Promise<Reservation> | Observable<Reservation> | Reservation;

  listReservations(
    request: ListReservationsRequest,
    metadata?: Metadata,
  ): Promise<ListReservationsResponse> | Observable<ListReservationsResponse> | ListReservationsResponse;

  createReservation(
    request: CreateReservationRequest,
    metadata?: Metadata,
  ): Promise<Reservation> | Observable<Reservation> | Reservation;

  updateReservation(
    request: UpdateReservationRequest,
    metadata?: Metadata,
  ): Promise<Reservation> | Observable<Reservation> | Reservation;

  deleteReservation(
    request: DeleteReservationRequest,
    metadata?: Metadata,
  ): Promise<DeleteReservationResponse> | Observable<DeleteReservationResponse> | DeleteReservationResponse;
}

export function ReservationCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getReservation",
      "listReservations",
      "createReservation",
      "updateReservation",
      "deleteReservation",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ReservationCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ReservationCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const RESERVATION_CR_UD_SERVICE_NAME = "ReservationCRUDService";
