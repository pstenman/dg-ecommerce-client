import { ISearchResponse } from "../models/search";
import { API_URL, createRequestOptions, handleRequest } from "./basicServices";

const SEARCH_ENDPOINT = "/api/search";

export const getSearchRequest = async (searchText: string): Promise<ISearchResponse> => {
    const url = `${API_URL}${SEARCH_ENDPOINT}`;
    const options = createRequestOptions("GET");
    options.params = { q: searchText }
    console.log("Requesting search for:", searchText);
    return handleRequest<ISearchResponse>(url, options)
}

//return Array.isArray(result) ? result : [result];

/* export const getSearchRequest = async (searchText: string): Promise<ISearchItem> => {
    const url = `${API_URL}${SEARCH_RNDPOINT}`;
    const options = createRequestOptions("GET", undefined, { q: searchText });
    console.log("Requesting search for:", searchText);
    return handleRequest<ISearchItem>(url, options) */