/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "hotel";

export interface Hotel {
  id?: number | undefined;
  name?: string | undefined;
  address?: string | undefined;
  city?: string | undefined;
  country?: string | undefined;
  rooms?: HotelRoom[] | undefined;
}

export interface HotelRoom {
  id?: number | undefined;
  roomNumber?: number | undefined;
  available?: boolean | undefined;
  hotelId?: number | undefined;
}

export interface FindRequest {
  id?: number | undefined;
  name?: string | undefined;
}

export interface FindResponse {
  hotels?: Hotel[] | undefined;
}

export interface CreateHotelRequest {
  name?: string | undefined;
  address?: string | undefined;
  city?: string | undefined;
  country?: string | undefined;
  rooms?: HotelRoom[] | undefined;
}

export interface CreateHotelResponse {
  hotel?: Hotel | undefined;
}

export interface UpdateHotelRequest {
  id?: number | undefined;
  name?: string | undefined;
  address?: string | undefined;
  city?: string | undefined;
  country?: string | undefined;
}

export interface UpdateHotelResponse {
  hotel?: Hotel | undefined;
}

export interface DeleteHotelRequest {
  id?: number | undefined;
}

export interface DeleteHotelResponse {
  hotel?: Hotel | undefined;
}

export interface CreateHotelRoomRequest {
  hotelId?: number | undefined;
  roomNumber?: number | undefined;
}

export interface CreateHotelRoomResponse {
  hotelRoom?: HotelRoom | undefined;
}

export const HOTEL_PACKAGE_NAME = "hotel";

export interface HotelCRUDServiceClient {
  find(request: FindRequest, metadata?: Metadata): Observable<FindResponse>;

  create(request: CreateHotelRequest, metadata?: Metadata): Observable<CreateHotelResponse>;

  update(request: UpdateHotelRequest, metadata?: Metadata): Observable<UpdateHotelResponse>;

  delete(request: DeleteHotelRequest, metadata?: Metadata): Observable<DeleteHotelResponse>;
}

export interface HotelCRUDServiceController {
  find(request: FindRequest, metadata?: Metadata): Promise<FindResponse> | Observable<FindResponse> | FindResponse;

  create(
    request: CreateHotelRequest,
    metadata?: Metadata,
  ): Promise<CreateHotelResponse> | Observable<CreateHotelResponse> | CreateHotelResponse;

  update(
    request: UpdateHotelRequest,
    metadata?: Metadata,
  ): Promise<UpdateHotelResponse> | Observable<UpdateHotelResponse> | UpdateHotelResponse;

  delete(
    request: DeleteHotelRequest,
    metadata?: Metadata,
  ): Promise<DeleteHotelResponse> | Observable<DeleteHotelResponse> | DeleteHotelResponse;
}

export function HotelCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["find", "create", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HotelCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HotelCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HOTEL_CR_UD_SERVICE_NAME = "HotelCRUDService";
