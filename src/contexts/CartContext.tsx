import { createContext, Dispatch, PropsWithChildren, useEffect, useReducer } from "react";
import { CartItem } from "../models/cartItem";
import { ICartAction, CartReducer } from "../reducers/CartReducer";

export interface ICartContext {
    cart: CartItem[],
    dispatch: Dispatch<ICartAction>
}

export const CartContext = createContext<ICartContext>({ cart: [], dispatch: () => null });

export const CartProvider = ({children}: PropsWithChildren) => {
    const [cart, dispatch] = useReducer(CartReducer, [], () => {
        const cachedCart = localStorage.getItem("cart")
        return cachedCart ? JSON.parse(cachedCart) : []
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart))
    }, [cart])

    return (
        <CartContext.Provider value={{cart, dispatch}}>
            {children}
        </CartContext.Provider>
    )
}