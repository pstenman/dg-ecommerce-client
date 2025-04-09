import { API_URL, createRequestOptions, handleRequest } from "./basicServices"

const STRIPE_ENDPOINT = "/stripe/create-checkout-session-embedded";

export const createCheckoutSession = async (order: any): Promise<{sessionId: string}> => {
    const url = `${API_URL}${STRIPE_ENDPOINT}`;
    const options = createRequestOptions("POST", order);
    const response = await handleRequest<{sessionId: string}>(url, options);
    return response;
}