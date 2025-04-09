import { CartItem } from "../models/cartItem";
import { ICreateOrder } from "../models/orders";

export const createOrderFromCart = (cart: CartItem[], id: number) => {
    const orderItems = cart.map(item => ({
        product_id: item.product.id,
        product_name: item.product.name,
        unit_price: item.product.price,
        quantity: item.quantity,
    }));

    const newOrder: ICreateOrder = {
        customer_id: id,
        payment_status: "unpaid",
        payment_id: null,
        order_status: "pending",
        order_items: orderItems,
    }

    return newOrder;
};