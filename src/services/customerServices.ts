import { ICreateCustomer, ICustomer, IUpdateCustomer } from "../models/customer";
import { API_URL, createRequestOptions, handleRequest } from "./basicServices";

const CUSTOMER_ENDPOINT = "/customers";
const EMAIL_ENDPOINT = "/email/"

export const fetchCustomers = async (): Promise<ICustomer[]> => {
    const url = `${API_URL}${CUSTOMER_ENDPOINT}`;
    const options = createRequestOptions("GET");
    console.log("Requesting customer from:", url);
    return handleRequest<ICustomer[]>(url, options);
};

export const fetchCustomerById = async (id: string): Promise<ICustomer> => {
    const url = `${API_URL}${CUSTOMER_ENDPOINT}/${id}`;
    const options = createRequestOptions("GET");
    return handleRequest<ICustomer>(url, options);
};

export const createCustomer = async (payload: ICreateCustomer): Promise<ICustomer> => {
    const url = `${API_URL}${CUSTOMER_ENDPOINT}`;
    const options = createRequestOptions("POST", payload);
    const response = handleRequest<ICustomer>(url,options);
    return response;
}

export const updateCustomer = async (id: number, payload: IUpdateCustomer): Promise<ICustomer> => {
    const url = `${API_URL}${CUSTOMER_ENDPOINT}/${id}`;
    const options = createRequestOptions("PATCH", payload);
    return handleRequest<ICustomer>(url, options);
};

export const deleteCustomer = async (id: number): Promise<void> => {
    const url = `${API_URL}${CUSTOMER_ENDPOINT}/${id}`;
    const options = createRequestOptions("DELETE");
    return handleRequest<void>(url, options)
}

export const fetchCustomerByEmail = async (email: string): Promise<ICustomer> => {
    const url = `${API_URL}${CUSTOMER_ENDPOINT}${EMAIL_ENDPOINT}${email}`;
    const options = createRequestOptions("GET");
    return handleRequest<ICustomer>(url, options);
  };