/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "hero";

export interface Hero {
  id?: number | undefined;
  name?: string | undefined;
  power?: number | undefined;
  hp?: number | undefined;
}

export interface GetRequest {
  id?: string | undefined;
}

export interface GetResponse {
  heroes?: Hero[] | undefined;
}

export interface CreateRequest {
  power?: number | undefined;
  name?: string | undefined;
}

export interface CreateResponse {
  hero?: Hero | undefined;
}

export interface UpdateRequest {
  id?: string | undefined;
  power?: number | undefined;
  name?: string | undefined;
}

export interface UpdateResponse {
  hero?: Hero | undefined;
}

export interface DeleteRequest {
  id?: string | undefined;
}

export interface DeleteResponse {
  hero?: Hero | undefined;
}

export const HERO_PACKAGE_NAME = "hero";

export interface HeroCRUDServiceClient {
  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  create(request: CreateRequest, metadata?: Metadata): Observable<CreateResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;
}

export interface HeroCRUDServiceController {
  get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> | Observable<GetResponse> | GetResponse;

  create(
    request: CreateRequest,
    metadata?: Metadata,
  ): Promise<CreateResponse> | Observable<CreateResponse> | CreateResponse;

  update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function HeroCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "create", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("HeroCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("HeroCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const HERO_CR_UD_SERVICE_NAME = "HeroCRUDService";
