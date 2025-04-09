import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { Product } from "./pages/Product";
import { Products } from "./pages/Products";
import { Admin } from "./pages/Admin";
import { AdminProducts } from "./pages/AdminProducts";
import { AdminCustomers } from "./pages/AdminCustomers";
import { AdminOrders } from "./pages/AdminOrders";
import { Checkout } from "./pages/Checkout";
import { OrderConfirmation } from "./pages/OrderConfirmation";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/products",
                element: <Products />,
            },
            {
                path: "/products/:id",
                element: <Product />,
            },
            {
                path: "/checkout",
                element: <Checkout />,
            },
            {
                path: "/order-confirmation",
                element: <OrderConfirmation />,
            },
            {
                path: "/admin",
                element: <Admin />,
                children: [
                    {
                        path: "/admin/products",
                        element: <AdminProducts />,
                    },
                    {
                        path: "/admin/customers",
                        element: <AdminCustomers />,
                    },
                    {
                        path: "/admin/orders",
                        element: <AdminOrders />,
                    },
                ]
            },
        ]
    }
]);