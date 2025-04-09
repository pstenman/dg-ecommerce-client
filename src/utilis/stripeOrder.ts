import { CartItem } from "../models/cartItem";

export const prepareOrderForStripe = (orderId: string, cart: CartItem[]) => {
    return {
        orderId,
        lineItems: cart.map(item => ({
            product_name: item.product.name,
            unit_price: item.product.price,
            quantity: item.quantity,
            product_image_url: item.product.image, 
        }))
    }
}