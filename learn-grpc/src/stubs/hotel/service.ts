/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { FindRequest, FindResponse } from "./hotel";

export const protobufPackage = "hotel";

export const HOTEL_PACKAGE_NAME = "hotel";

export interface HotelCRUDServiceClient {
  find(request: FindRequest, metadata?: Metadata): Observable<FindResponse>;
}

export interface HotelCRUDServiceController {
  find(request: FindRequest, metadata?: Metadata): Promise<FindResponse> | Observable<FindResponse> | FindResponse;
}

export function HotelCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["find"];
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
