import axios, { AxiosRequestConfig } from "axios";

export const API_URL = "https://dg-ecommerce-api.vercel.app"

export const createRequestOptions = (method: string, body?: any, params?: any): AxiosRequestConfig => {
    const options: AxiosRequestConfig = {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        params,
    };

    if (body) {
        options.data = body
    }

    return options;
}

export const handleRequest = async <T>(url: string, options: AxiosRequestConfig): Promise<T> => {
    try {
        const response = await axios(url, options);
        console.log("Axios Response:", response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error("Error details:", error.response?.data || error.message);
            throw new Error(`Error: ${error.response?.statusText || error.message}`);
        } else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occured");
        }
    }
};