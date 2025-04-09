import { ChangeEvent, FormEvent, useState } from "react"
import { ISearchItem } from "../models/search";
import { getSearchRequest } from "../services/searchService";

export const useSearch = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [items, setItems] = useState<ISearchItem[] | null>(null);
    const [error, setError] = useState<string>("");

    const handleSearch = async (e: FormEvent) => {
        e.preventDefault();

        if (!searchText) {
            setError("Must type something")
            return;
        }

        try {
            console.log("searchtText", searchText)
            const searchResult = await getSearchRequest(searchText);
            console.log("searchResult", searchResult)

            if (Array.isArray(searchResult.items)) {
                setItems(searchResult.items)
            } /* else {
                setItems([])
            } */
            setError("");
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An unexpected error occured")
            }
        }
    };

    const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);

        if (value.trim() === "") {
            setItems(null);
            return;
        }

        handleSearch(e);
    }

    console.log("items", items)

    return { searchText, setSearchText, items, error, handleSearch, handleInputChange }
}