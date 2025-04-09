import { CartDisplay } from "../components/cart/CartDisplay"
import "../styles/layout/checkoutLayoutStyle.css"
import { CreateCheckout } from "../components/checkout/CreateCheckout";

export const Checkout = () => {
    return <>


        <h2>Checkout</h2>
        <div className="checkout-container">
            <CartDisplay isCheckout={true} />
            <CreateCheckout />
        </div>

    </>
}
