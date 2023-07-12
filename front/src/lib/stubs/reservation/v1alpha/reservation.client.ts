// @generated by protobuf-ts 2.9.0
// @generated from protobuf file "reservation/v1alpha/reservation.proto" (package "reservation", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { ReservationCRUDService } from "./reservation";
import type { DeleteReservationResponse } from "./reservation";
import type { DeleteReservationRequest } from "./reservation";
import type { UpdateReservationRequest } from "./reservation";
import type { CreateReservationRequest } from "./reservation";
import type { ListReservationsResponse } from "./reservation";
import type { ListReservationsRequest } from "./reservation";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { Reservation } from "./reservation";
import type { GetReservationRequest } from "./reservation";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service reservation.ReservationCRUDService
 */
export interface IReservationCRUDServiceClient {
    /**
     * @generated from protobuf rpc: GetReservation(reservation.GetReservationRequest) returns (reservation.Reservation);
     */
    getReservation(input: GetReservationRequest, options?: RpcOptions): UnaryCall<GetReservationRequest, Reservation>;
    /**
     * @generated from protobuf rpc: ListReservations(reservation.ListReservationsRequest) returns (reservation.ListReservationsResponse);
     */
    listReservations(input: ListReservationsRequest, options?: RpcOptions): UnaryCall<ListReservationsRequest, ListReservationsResponse>;
    /**
     * @generated from protobuf rpc: CreateReservation(reservation.CreateReservationRequest) returns (reservation.Reservation);
     */
    createReservation(input: CreateReservationRequest, options?: RpcOptions): UnaryCall<CreateReservationRequest, Reservation>;
    /**
     * @generated from protobuf rpc: UpdateReservation(reservation.UpdateReservationRequest) returns (reservation.Reservation);
     */
    updateReservation(input: UpdateReservationRequest, options?: RpcOptions): UnaryCall<UpdateReservationRequest, Reservation>;
    /**
     * @generated from protobuf rpc: DeleteReservation(reservation.DeleteReservationRequest) returns (reservation.DeleteReservationResponse);
     */
    deleteReservation(input: DeleteReservationRequest, options?: RpcOptions): UnaryCall<DeleteReservationRequest, DeleteReservationResponse>;
}
/**
 * @generated from protobuf service reservation.ReservationCRUDService
 */
export class ReservationCRUDServiceClient implements IReservationCRUDServiceClient, ServiceInfo {
    typeName = ReservationCRUDService.typeName;
    methods = ReservationCRUDService.methods;
    options = ReservationCRUDService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: GetReservation(reservation.GetReservationRequest) returns (reservation.Reservation);
     */
    getReservation(input: GetReservationRequest, options?: RpcOptions): UnaryCall<GetReservationRequest, Reservation> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetReservationRequest, Reservation>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: ListReservations(reservation.ListReservationsRequest) returns (reservation.ListReservationsResponse);
     */
    listReservations(input: ListReservationsRequest, options?: RpcOptions): UnaryCall<ListReservationsRequest, ListReservationsResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<ListReservationsRequest, ListReservationsResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CreateReservation(reservation.CreateReservationRequest) returns (reservation.Reservation);
     */
    createReservation(input: CreateReservationRequest, options?: RpcOptions): UnaryCall<CreateReservationRequest, Reservation> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateReservationRequest, Reservation>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateReservation(reservation.UpdateReservationRequest) returns (reservation.Reservation);
     */
    updateReservation(input: UpdateReservationRequest, options?: RpcOptions): UnaryCall<UpdateReservationRequest, Reservation> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateReservationRequest, Reservation>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DeleteReservation(reservation.DeleteReservationRequest) returns (reservation.DeleteReservationResponse);
     */
    deleteReservation(input: DeleteReservationRequest, options?: RpcOptions): UnaryCall<DeleteReservationRequest, DeleteReservationResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<DeleteReservationRequest, DeleteReservationResponse>("unary", this._transport, method, opt, input);
    }
}