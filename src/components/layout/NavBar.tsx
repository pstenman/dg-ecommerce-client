import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useCart } from "../../hooks/useCart";
import { CartDisplay } from "../cart/CartDisplay";
import "../../styles/cart/cartStyles.css";
import { GrCart } from "react-icons/gr";

export const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const cartDropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => setIsCartOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cartButtonRef.current &&
        !cartButtonRef.current.contains(event.target as Node) &&
        cartDropdownRef.current &&
        !cartDropdownRef.current.contains(event.target as Node)
      ) {
        setIsCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <div className="cart-dropdown" ref={cartDropdownRef}>
              <button onClick={handleToggle} ref={cartButtonRef}>
                <GrCart /> ({cart.length})
              </button>

              {isCartOpen && <CartDisplay isCheckout={false} />}
            </div>
          </li>
        </ul>
      </nav>
    </>
  );
};
