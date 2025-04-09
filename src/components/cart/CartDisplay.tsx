import { useNavigate } from "react-router";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../models/cartItem";
import { IProduct } from "../../models/products";
import { CartActionType } from "../../reducers/CartReducer";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";

interface ICartDisplayProps {
  isCheckout: boolean;
}

export const CartDisplay = (props: ICartDisplayProps) => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const totalCartPrice = cart.reduce(
    (total, item: CartItem) => total + item.quantity * item.product.price,
    0
  );

  const handleChangeQuantity = (product: IProduct, quantity: number) => {
    dispatch({
      type: CartActionType.CHANGE_QUANTITY,
      payload: new CartItem(product, quantity),
    });
  };

  const handleRemoveFromCart = (cartItem: CartItem) => {
    dispatch({
      type: CartActionType.REMOVE_ITEM,
      payload: cartItem,
    });
  };

  const handleResetCart = () => {
    dispatch({
      type: CartActionType.RESET_CART,
      payload: null,
    });
  };

  const handleNavigate = (e: React.MouseEvent) => {
    if (cart.length === 0) {
      e.preventDefault(); 
      setErrorMessage("No items in cart. Put something in cart to proceed to checkout.");
    } else {
      setErrorMessage("");
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`cart-item-container ${
        props.isCheckout ? "checkout" : "cart"
      }`}
    >
      {props.isCheckout ? (
        <>
          <h3>Cart items</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.product.id}>
                <h5>{item.product.name}</h5>
                <div className="cart-image-item-container">
                  <img src={item.product.image} alt="disc" />
                  <p>{item.product.price}$</p>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => handleChangeQuantity(item.product, -1)}
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() => handleChangeQuantity(item.product, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h6>Total: {totalCartPrice}$</h6>
        </>
      ) : (
        <>
          <h3>Your Cart</h3>
          <ul>
            {cart.map((item) => (
              <li key={item.product.id}>
                <h5>{item.product.name}</h5>
                <div>
                  <img src={item.product.image} alt="disc" />
                  <p>{item.product.price}$</p>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() => handleChangeQuantity(item.product, -1)}
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() => handleChangeQuantity(item.product, 1)}
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item)}>
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h6>Total: {totalCartPrice}$</h6>
          <button onClick={handleResetCart}>Reset cart</button>
          <button onClick={handleNavigate}>Checkout</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </>
      )}
    </div>
  );
};
