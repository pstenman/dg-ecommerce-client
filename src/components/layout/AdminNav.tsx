
import { Link } from "react-router";

export const AdminNav = () => {

  return (
    <>
      <div className="admin-dropdown">  
            <nav>
                <ul>
                    <li><Link to="/admin/products">Products</Link></li>
                    <li><Link to="/admin/customers">Customer</Link></li>
                    <li><Link to="/admin/orders">Orders</Link></li>
                </ul>
            </nav>
      </div>
    </>
  );
};
