import { useNavigate, useParams } from "react-router";
import { useProduct } from "../../hooks/useProduct";
import { IProduct } from "../../models/products";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../models/cartItem";
import { CartActionType } from "../../reducers/CartReducer";
import "../../styles/products/productDisplay.css"
import { FaChevronLeft } from "react-icons/fa";

export const ProductDisplay = () => {
  const { id } = useParams();
  const { product, error, loading } = useProduct(Number(id));
  const { dispatch } = useCart();
  const navigate = useNavigate()

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleClick = () => {
    navigate("/products");
  }

  const handleAddToCart = (product: IProduct, quantity: number) => {
    dispatch({
      type: CartActionType.ADD_ITEM,
      payload: new CartItem(product, quantity)
    })
  }

  return (
    <>
      <div className="back-btn-container">
        <button onClick={handleClick} className="back-btn">
          <FaChevronLeft /> Products
        </button>
      </div>

      {product && (
        <div className="product-display-container">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-details">
            <p className="product-name">{product.name}</p>
            <p className="product-description">{product.description}</p>
            <p className="product-category">Category: {product.category}</p>
            <p className="product-price">${product.price}</p>
            <button onClick={() => handleAddToCart(product, 1)} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};
