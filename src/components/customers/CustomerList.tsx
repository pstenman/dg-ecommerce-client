import { MdDelete, MdEdit } from "react-icons/md";
import { useCustomers } from "../../hooks/useCustomers";
import { ICustomer } from "../../models/customer";

export const CustomerList = () => {
    const { customers, loading, error, deletedCustomer } = useCustomers();
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
  
    const handleEdit = (id: number) => {
      return;
    };
  
    const handleDelete = (id: number) => {
      deletedCustomer(id);
    };
  
  
    return (
<div className="customer-list-container">
  <h2>Customers</h2>
  {customers.length > 0 ? (
    <div className="customer-list">
      <div className="customer-header">
        <p>ID</p>
        <p>Name</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Address</p>
        <p>Edit</p>
        <p>Delete</p>
      </div>

      <ul>
        {customers.map((customer: ICustomer) => (
          <li key={customer.id}>
            <p>{customer.id}</p>
            <p>{customer.firstname} {customer.lastname}</p>
            <p>{customer.email}</p>
            <p>{customer.phone}</p>
            <p>{customer.street_address}</p>

              <>
                <button
                  className="edit-customer-btn"
                  onClick={() => handleEdit(customer.id)}
                >
                  <MdEdit />
                </button>
                <button
                  className="delete-customer-btn"
                  onClick={() => handleDelete(customer.id)}
                >
                  <MdDelete />
                </button>
              </>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>No customers available</p>
  )}
</div>
    );
}