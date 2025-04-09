import { useState, useEffect } from "react";
import { IOrderById, IUpdateOrder } from "../models/orders";
import { fetchOrderById, fetchOrderBySessionId, updateOrder, updateOrderItems } from "../services/ordersServices";

export const useOrder = (orderId: number | null, sessionId: string | null) => {
    const [order, setOrder] = useState<IOrderById | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchOrder = async () => {
        setLoading(true);
        setError(null);
    
        try {
            if (orderId !== null) {
                const orderData = await fetchOrderById(String(orderId));
                setOrder(orderData);
            } else if (sessionId) {
                const orderData = await fetchOrderBySessionId(sessionId);
                setOrder(orderData);
            } else {
                throw new Error("No valid orderId or sessionId provided.");
            }
        } catch (err: any) {
            setError(err.message || "Failed to fetch order details.");
        } finally {
            setLoading(false);
        }
    };
    
    if (orderId !== null || sessionId) {
        fetchOrder();
    }
    }, [orderId, sessionId]);
  
    const updatedOrder = async (id: string, payload: IUpdateOrder): Promise<void> => {
      setLoading(true);
      setError(null);
      
      try {
        if (payload.order_status) {
          await updateOrder(id, { order_status: payload.order_status });
        }

        if (payload.order_items) {
          const updateItemPromises = payload.order_items.map((item) =>
            updateOrderItems(Number(id), {
              id: item.id,
              quantity: item.quantity,
            })
          );
          await Promise.all(updateItemPromises);
        }
        const updatedOrderData = await fetchOrderById(id);
        setOrder(updatedOrderData);
    
      } catch (err) {
        setError("Failed to update order");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    return { order, loading, error, updatedOrder, setOrder };
  };
