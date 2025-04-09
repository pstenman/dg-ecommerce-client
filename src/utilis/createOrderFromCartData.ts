import { CartItem } from "../models/cartItem";
import { createOrder } from "../services/ordersServices";
import { createOrderFromCart } from "./createOrderFromCart";

  export const createOrderFromCartData = async (cart: CartItem[], customrId:  string) => {
    
    const newOrder = createOrderFromCart(cart, Number(customrId));
    const orderResponse = await createOrder(newOrder);
    return orderResponse;
  };