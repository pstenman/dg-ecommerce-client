import { useNavigate } from "react-router";
import { useProducts } from "../../hooks/useProducts";
import { IProduct } from "../../models/products";
import { MdDelete, MdEdit } from "react-icons/md";
import { useCart } from "../../hooks/useCart";
import { CartItem } from "../../models/cartItem";
import { CartActionType } from "../../reducers/CartReducer";
import { GrCart } from "react-icons/gr";

interface IProductsListProps {
  isAdmin: boolean;
}

export const ProductsList = (props: IProductsListProps) => {
  const { products, loading, error, deletedProduct } = useProducts();
  const { dispatch } = useCart();
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const handleEdit = (_product: IProduct) => {
    return;
  };

  const handleDelete = (id: number) => {
    deletedProduct(id);
  };

  const handleClick = (id: number) => {
    navigate(`/products/${id}`);
  };

    const handleAddToCart = (product: IProduct, quantity: number) => {
      dispatch({
        type: CartActionType.ADD_ITEM,
        payload: new CartItem(product, quantity)
      })
    }

  return (
<div
  className={`product-list-container ${
    props.isAdmin ? "admin" : "customer"
  }`}
>
  <h2>Products</h2>
  {products.length > 0 ? (
    <div className="product-list">
      {props.isAdmin && (
        <div className="product-header">
          <p>ID</p>
          <p>Name</p>
          <p>Category</p>
          <p>Stock</p>
          <p>Price</p>
          <p>Edit</p>
          <p>Delete</p>
        </div>
      )}

      <ul>
        {products.map((product: IProduct) => (
          <li key={product.id}>
            {props.isAdmin ? (
              <>
                <p>{product.id}</p>
                <p>{product.name}</p>
                <p>{product.category}</p>
                <p>{product.stock}</p>
                <p>{product.price}</p>
                <button
                  className="edit-product-btn"
                  onClick={() => handleEdit(product)}
                >
                  <MdEdit />
                </button>
                <button
                  className="delete-product-btn"
                  onClick={() => handleDelete(product.id)}
                >
                  <MdDelete />
                </button>
              </>
            ) : (
              <>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product, 1)}><GrCart /></button>
                <img src={product.image} alt="img" />
                <p>{product.name}</p>
                <p>{product.price}</p>
                <button onClick={() => handleClick(product.id)}>
                  Go to Product
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <p>No products available</p>
  )}
</div>
  );
};
