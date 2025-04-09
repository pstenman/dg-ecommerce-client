import { ICreateOrder, IOrder, IOrderById, IUpdateOrder, IUpdateOrderItem } from "../models/orders";
import { API_URL, createRequestOptions, handleRequest } from "./basicServices";

const ORDERS_ENDPOINT = "/orders";
const ORDER_ITEMS_ENDPOINT = "/order-items"
const  PAYMENT_ENDPOINT = "/payment/"

export const fetchOrders = async (): Promise<IOrder[]> => {
    const url = `${API_URL}${ORDERS_ENDPOINT}`;
    const options = createRequestOptions("GET");
    console.log("Requesting Products from:", url);
    return handleRequest<IOrder[]>(url, options);
};

export const fetchOrderById = async (id: string): Promise<IOrderById> => {
    const url = `${API_URL}${ORDERS_ENDPOINT}/${id}`;
    const options = createRequestOptions("GET");
    return handleRequest<IOrderById>(url, options);
};

export const fetchOrderBySessionId = async (id: string): Promise<IOrderById> => {
    const url = `${API_URL}${ORDERS_ENDPOINT}${PAYMENT_ENDPOINT}${id}`;
    const options = createRequestOptions("GET");
    return handleRequest<IOrderById>(url, options);
};

export const createOrder = async (payload: ICreateOrder): Promise<IOrder> => {
    const url = `${API_URL}${ORDERS_ENDPOINT}`;
    const options = createRequestOptions("POST", payload);
    const response = handleRequest<IOrder>(url,options);
    return response;
}

export const updateOrder = async (id: string, payload: IUpdateOrder): Promise<IOrderById> => {
    const url = `${API_URL}${ORDERS_ENDPOINT}/${id}`;
    const options = createRequestOptions("PATCH", payload);
    const response= handleRequest<IOrderById>(url, options);
    return response;
};

export const updateOrderItems = async (id: number, payload: IUpdateOrderItem): Promise<IOrderById> => {
    const url = `${API_URL}${ORDER_ITEMS_ENDPOINT}/${id}`;
    const options = createRequestOptions("PATCH", payload);
    return handleRequest<IOrderById>(url, options);
};

export const deleteOrder = async (id: number): Promise<void> => {
    const url = `${API_URL}${ORDERS_ENDPOINT}/${id}`;
    const options = createRequestOptions("DELETE");
    return handleRequest<void>(url, options)
}