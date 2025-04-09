import { ICreateProduct, IProduct, IUpdateProduct } from "../models/products";
import { API_URL, createRequestOptions, handleRequest } from "./basicServices";

const PRODUCTS_ENDPOINT = "/products";

export const fetchProducts = async (): Promise<IProduct[]> => {
    const url = `${API_URL}${PRODUCTS_ENDPOINT}`;
    const options = createRequestOptions("GET");
    console.log("Requesting Products from:", url);
    return handleRequest<IProduct[]>(url, options);
};

export const fetchProductById = async (id: string): Promise<IProduct> => {
    const url = `${API_URL}${PRODUCTS_ENDPOINT}/${id}`;
    const options = createRequestOptions("GET");
    return handleRequest<IProduct>(url, options);
};

export const createProduct = async (payload: ICreateProduct): Promise<IProduct> => {
    const url = `${API_URL}${PRODUCTS_ENDPOINT}`;
    const options = createRequestOptions("POST", payload);
    const response = handleRequest<IProduct>(url,options);
    return response;
}

export const updateProduct = async (id: number, payload: IUpdateProduct): Promise<IProduct> => {
    const url = `${API_URL}${PRODUCTS_ENDPOINT}/${id}`;
    const options = createRequestOptions("PATCH", payload);
    return handleRequest<IProduct>(url, options);
};

export const deleteProduct = async (id: number): Promise<void> => {
    const url = `${API_URL}${PRODUCTS_ENDPOINT}/${id}`;
    const options = createRequestOptions("DELETE");
    return handleRequest<void>(url, options)
}