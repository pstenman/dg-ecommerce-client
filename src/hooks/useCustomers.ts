import { useState, useEffect } from "react";
import { ICreateCustomer, ICustomer } from "../models/customer";
import { createCustomer, deleteCustomer, fetchCustomers } from "../services/customerServices";

export const useCustomers = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const getCustomers = async () => {
        setLoading(true);
        try {
            const data = await fetchCustomers();
            setCustomers(data);
        } catch (error) {
            setError("Failed to fetch products");
            console.error(error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
            getCustomers();
        
        console.log("products", customers)
    }, []);

    const addCustomer = async (newProduct: ICreateCustomer) => {
        setLoading(true);
        setError(null);
        try {
            const createdCustomer = await createCustomer(newProduct);
            setCustomers((prevCustomer) => [...prevCustomer, createdCustomer]);
            return createdCustomer;
        } catch (error) {
            setError("Failed to create product");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deletedCustomer = async (productId: number) => {
        setLoading(true);
        setError(null);
        try {
            await deleteCustomer(productId);
            setCustomers((prevCustomers) =>
                prevCustomers.filter((customer) => customer.id !== productId)
            );
        } catch (err) {
            setError("Failed to delete customer");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const findCustomerByEmail = (email: string)  => {
        return customers.find(customer => customer.email === email);
    }

    return { customers, loading, error, addCustomer, deletedCustomer, findCustomerByEmail }
}