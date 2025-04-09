import { useEffect, useState } from "react";
import { IProduct } from "../models/products";
import { fetchProductById, updateProduct } from "../services/productsServices";

export const useProduct = (id: number) => {
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getProduct = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchProductById(String(id))
            setProduct(data);
        } catch (error) {
            setError("Failed to fetch product");
            console.error("Error fetching product:", error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            getProduct();
        }
    }, [id])

        const updateProductDetails = async (updatedProduct: IProduct) => {
            setLoading(true);
            setError(null);
            try {
                const updatedData = await updateProduct(updatedProduct.id, updatedProduct);
                setProduct(updatedData);
            } catch (error) {
                setError("Failed to update product");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

    return { product, loading, error, updateProductDetails }
}