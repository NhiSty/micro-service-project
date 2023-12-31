// @generated by protobuf-ts 2.9.0
// @generated from protobuf file "hotel/v1alpha/hotel.proto" (package "hotel.v1alpha", syntax proto3)
// tslint:disable
import { UsageService } from "./hotel";
import type { UsageResponse } from "./hotel";
import type { UsageRequest } from "./hotel";
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { HotelService } from "./hotel";
import type { StreamHotelsResponse } from "./hotel";
import type { StreamHotelsRequest } from "./hotel";
import type { ServerStreamingCall } from "@protobuf-ts/runtime-rpc";
import type { DeleteHotelRequest } from "./hotel";
import type { UpdateHotelRequest } from "./hotel";
import type { CreateHotelRequest } from "./hotel";
import type { Hotel } from "./hotel";
import type { GetHotelRequest } from "./hotel";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { ListHotelsResponse } from "./hotel";
import type { ListHotelsRequest } from "./hotel";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service hotel.v1alpha.HotelService
 */
export interface IHotelServiceClient {
    /**
     * @generated from protobuf rpc: ListHotels(hotel.v1alpha.ListHotelsRequest) returns (hotel.v1alpha.ListHotelsResponse);
     */
    listHotels(input: ListHotelsRequest, options?: RpcOptions): UnaryCall<ListHotelsRequest, ListHotelsResponse>;
    /**
     * @generated from protobuf rpc: GetHotel(hotel.v1alpha.GetHotelRequest) returns (hotel.v1alpha.Hotel);
     */
    getHotel(input: GetHotelRequest, options?: RpcOptions): UnaryCall<GetHotelRequest, Hotel>;
    /**
     * @generated from protobuf rpc: CreateHotel(hotel.v1alpha.CreateHotelRequest) returns (hotel.v1alpha.Hotel);
     */
    createHotel(input: CreateHotelRequest, options?: RpcOptions): UnaryCall<CreateHotelRequest, Hotel>;
    /**
     * @generated from protobuf rpc: UpdateHotel(hotel.v1alpha.UpdateHotelRequest) returns (hotel.v1alpha.Hotel);
     */
    updateHotel(input: UpdateHotelRequest, options?: RpcOptions): UnaryCall<UpdateHotelRequest, Hotel>;
    /**
     * @generated from protobuf rpc: DeleteHotel(hotel.v1alpha.DeleteHotelRequest) returns (hotel.v1alpha.Hotel);
     */
    deleteHotel(input: DeleteHotelRequest, options?: RpcOptions): UnaryCall<DeleteHotelRequest, Hotel>;
    /**
     * @generated from protobuf rpc: StreamHotels(hotel.v1alpha.StreamHotelsRequest) returns (stream hotel.v1alpha.StreamHotelsResponse);
     */
    streamHotels(input: StreamHotelsRequest, options?: RpcOptions): ServerStreamingCall<StreamHotelsRequest, StreamHotelsResponse>;
}
/**
 * @generated from protobuf service hotel.v1alpha.HotelService
 */
export class HotelServiceClient implements IHotelServiceClient, ServiceInfo {
    typeName = HotelService.typeName;
    methods = HotelService.methods;
    options = HotelService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: ListHotels(hotel.v1alpha.ListHotelsRequest) returns (hotel.v1alpha.ListHotelsResponse);
     */
    listHotels(input: ListHotelsRequest, options?: RpcOptions): UnaryCall<ListHotelsRequest, ListHotelsResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<ListHotelsRequest, ListHotelsResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetHotel(hotel.v1alpha.GetHotelRequest) returns (hotel.v1alpha.Hotel);
     */
    getHotel(input: GetHotelRequest, options?: RpcOptions): UnaryCall<GetHotelRequest, Hotel> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetHotelRequest, Hotel>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CreateHotel(hotel.v1alpha.CreateHotelRequest) returns (hotel.v1alpha.Hotel);
     */
    createHotel(input: CreateHotelRequest, options?: RpcOptions): UnaryCall<CreateHotelRequest, Hotel> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateHotelRequest, Hotel>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateHotel(hotel.v1alpha.UpdateHotelRequest) returns (hotel.v1alpha.Hotel);
     */
    updateHotel(input: UpdateHotelRequest, options?: RpcOptions): UnaryCall<UpdateHotelRequest, Hotel> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateHotelRequest, Hotel>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DeleteHotel(hotel.v1alpha.DeleteHotelRequest) returns (hotel.v1alpha.Hotel);
     */
    deleteHotel(input: DeleteHotelRequest, options?: RpcOptions): UnaryCall<DeleteHotelRequest, Hotel> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<DeleteHotelRequest, Hotel>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: StreamHotels(hotel.v1alpha.StreamHotelsRequest) returns (stream hotel.v1alpha.StreamHotelsResponse);
     */
    streamHotels(input: StreamHotelsRequest, options?: RpcOptions): ServerStreamingCall<StreamHotelsRequest, StreamHotelsResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<StreamHotelsRequest, StreamHotelsResponse>("serverStreaming", this._transport, method, opt, input);
    }
}
/**
 * @generated from protobuf service hotel.v1alpha.UsageService
 */
export interface IUsageServiceClient {
    /**
     * @generated from protobuf rpc: Using(hotel.v1alpha.UsageRequest) returns (hotel.v1alpha.UsageResponse);
     */
    using(input: UsageRequest, options?: RpcOptions): UnaryCall<UsageRequest, UsageResponse>;
    /**
     * @generated from protobuf rpc: UsingStream(hotel.v1alpha.UsageRequest) returns (stream hotel.v1alpha.UsageResponse);
     */
    usingStream(input: UsageRequest, options?: RpcOptions): ServerStreamingCall<UsageRequest, UsageResponse>;
}
/**
 * @generated from protobuf service hotel.v1alpha.UsageService
 */
export class UsageServiceClient implements IUsageServiceClient, ServiceInfo {
    typeName = UsageService.typeName;
    methods = UsageService.methods;
    options = UsageService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: Using(hotel.v1alpha.UsageRequest) returns (hotel.v1alpha.UsageResponse);
     */
    using(input: UsageRequest, options?: RpcOptions): UnaryCall<UsageRequest, UsageResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<UsageRequest, UsageResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UsingStream(hotel.v1alpha.UsageRequest) returns (stream hotel.v1alpha.UsageResponse);
     */
    usingStream(input: UsageRequest, options?: RpcOptions): ServerStreamingCall<UsageRequest, UsageResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<UsageRequest, UsageResponse>("serverStreaming", this._transport, method, opt, input);
    }
}
