import { useLocation } from "react-router";
import { useOrder } from "../hooks/useOrder";
import { fetchOrderById, updateOrder } from "../services/ordersServices";
import { useCart } from "../hooks/useCart";
import { CartActionType } from "../reducers/CartReducer";
import "../styles/orders/orderConfirmStyles.css"

export const OrderConfirmation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const session_id = queryParams.get("session_id");
  const _id = null;

  console.log("🛬 Redirected to Order Confirmation with session_id:", session_id);

  const { order, setOrder, loading, error } = useOrder(_id, session_id);
  const { dispatch } = useCart();

  const updatePaymentStatus = async (order: any) => {
    if (order && order.payment_status !== "paid" && order.id) {
      try {
        const response = await updateOrder(order.id, {
          payment_id: session_id,
          payment_status: "paid",
          order_status: "Recieved",
        });

        const updatedOrderId = response.orderId;

        if (updatedOrderId) {
          const updatedOrder = await fetchOrderById(updatedOrderId);
          setOrder(updatedOrder);
          handleResetCart();
          clearLocalStorage();

        }
      } catch (err) {
        console.error("Error updating payment status:", err);
      }
    }
  };

  const handleOrderUpdate = () => {
    if (order && !loading && !error) {
      updatePaymentStatus(order);
    }
  };

  if (!loading && !error && order) {
    handleOrderUpdate();
  }

  const handleResetCart = () => {
    dispatch({
      type: CartActionType.RESET_CART,
      payload: null,
    });
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("customer");
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!order) {
    return <div>No order data available.</div>;
  }

  return (
    <div className="order-confirmation-container">
      <h1>Order Confirmation</h1>
      <div className="order-summary">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Customer Name:</strong> {order.customer_firstname} {order.customer_lastname}</p>
        <p><strong>Total:</strong> ${order.total_price}</p>
        <p><strong>Payment Status:</strong> {order.payment_status}</p>
        <p><strong>Order Status:</strong> {order.order_status}</p>
      </div>
  
      <h2>Order Items</h2>
      <ul className="order-items">
        {order.order_items.length > 0 ? (
          order.order_items.map((item) => (
            <li key={item.product_id} className="order-item">
              <p><strong>Product:</strong> {item.product_name}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
              <p><strong>Price:</strong> ${item.unit_price}</p>
              <p><strong>Total:</strong> ${item.quantity * item.unit_price}</p>
            </li>
          ))
        ) : (
          <p>No items in the order</p>
        )}
      </ul>
    </div>
  );
};
