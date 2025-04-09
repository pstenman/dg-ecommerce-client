import { useEffect, useState } from "react";
import { ICreateProduct, IProduct } from "../models/products";
import { createProduct, deleteProduct, fetchProducts } from "../services/productsServices";

export const useProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getProducts = async () => {
        setLoading(true);
        try {
            const data = await fetchProducts();
            setProducts(data);
        } catch (error) {
            setError("Failed to fetch products");
            console.error(error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        if (products.length === 0) {
            getProducts();
        }
        console.log("products", products)
    }, [products]);

    const addProduct = async (newProduct: ICreateProduct) => {
        setLoading(true);
        setError(null);
        try {
            const createdProduct = await createProduct(newProduct);
            setProducts((prevProducts) => [...prevProducts, createdProduct]);
        } catch (error) {
            setError("Failed to create product");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deletedProduct = async (productId: number) => {
        setLoading(true);
        setError(null);
        try {
            await deleteProduct(productId);
            setProducts((prevProducts) =>
                prevProducts.filter((product) => product.id !== productId)
            );
        } catch (err) {
            setError("Failed to delete customer");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { products, loading, error, addProduct, deletedProduct, getProducts }
}