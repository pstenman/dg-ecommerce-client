import { CartItem } from "../models/cartItem";
import { prepareOrderForStripe } from "./stripeOrder";

export const prepareStripeData = (orderId: string, cart: CartItem[]) => {
    return prepareOrderForStripe(orderId, cart);
  };