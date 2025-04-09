import { MdDelete, MdEdit } from "react-icons/md";
import { UseOrders } from "../../hooks/useOrders";
import { IOrder } from "../../models/orders";
import "../../styles/orders/orderListStyles.css";

export const OrderList = () => {
  const { orders, loading, error, deletedOrder } = UseOrders();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleEdit = (id: number) => {
    return;
  };

  const handleDelete = (id: number) => {
    deletedOrder(id);
  };

  return (
    <>
      <h2>Orders</h2>
      {orders.length > 0 && (
        <div className="order-list-container">
          <div className="order-header">
            <p>ID</p>
            <p>Customer Name</p>
            <p>Payment ID</p>
            <p>Payment Status</p>
            <p>Status</p>
            <p>Edit</p>
            <p>Delete</p>
          </div>

          <ul>
            {orders.map((order: IOrder) => (
              <li key={order.id}>
                <p>{order.id}</p>
                <p>{order.customer_firstname}</p>
                <p>{order.payment_id}</p>
                <p>{order.order_status}</p>
                <p>{order.payment_status}</p>

                <button
                  className="edit-order-btn"
                  onClick={() => handleEdit(order.id)}
                >
                  <MdEdit />
                </button>
                <button
                  className="delete-order-btn"
                  onClick={() => handleDelete(order.id)}
                >
                  <MdDelete />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
