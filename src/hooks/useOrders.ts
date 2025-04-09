import { useState, useEffect } from "react";
import { ICreateOrder, IOrder, IOrderById } from "../models/orders";
import { createOrder, deleteOrder, fetchOrders } from "../services/ordersServices";

export const UseOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadOrders = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (orders.length === 0) {
        loadOrders();
      }

    }, [orders]);

    const addOrder = async (newOrder: ICreateOrder) => {
      try {
        const newOrderResponse = await createOrder(newOrder); 
        setOrders((prevOrders) => [...prevOrders, newOrderResponse]);
      } catch (err) {
        setError('Failed to create order');
      }
    };

    const updatedOrderList = (id: string, updatedOrder: IOrderById) => {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === Number(id) ? { ...updatedOrder, id: Number(updatedOrder.id) } : order
        )
      );
    };

        const deletedOrder = async (orderId: number) => {
            setLoading(true);
            setError(null);
            try {
                await deleteOrder(orderId);
                setOrders((prevOrders) =>
                    prevOrders.filter((order) => order.id !== orderId)
                );
            } catch (err) {
                setError("Failed to delete customer");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

      return { orders, loading, error, updatedOrderList, loadOrders, addOrder, deletedOrder }
};