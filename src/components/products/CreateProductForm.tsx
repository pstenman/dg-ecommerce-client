import { ChangeEvent, FormEvent, useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { ICreateProduct } from "../../models/products";
import { validateForm } from "../../utilis/validation/validateForm";
import { productValidation } from "../../utilis/validation/productValidation";
import "../../styles/products/productFormStyles.css"

export const CreateProductForm = () => {
  const { addProduct, getProducts } = useProducts();
  const [isAddingProduct, setIsAddingProduct] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key:string]: string }>({})
  const [newProduct, setNewProduct] = useState<ICreateProduct>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
  });

  const handleToggle = () => setIsAddingProduct((prev) => !prev);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({})
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

        const formErrors = validateForm(newProduct, productValidation)
        if (Object.keys(formErrors).length > 0) {
          setErrors(formErrors)
          return;
        }

    await addProduct(newProduct);
    await getProducts();
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: "",
      image: "",
    });
    setErrors({});
  };

  return (
    <>
      <button className="add-product-btn" onClick={handleToggle}>Add Product</button>
      {isAddingProduct && (
        <div className="product-form-container">
        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              type="text"
              id="name"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              placeholder="Product Name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="input-group">
            <input
              type="text"
              id="description"
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              placeholder="Description"
            />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>

          <div className="input-group">
            <input
              type="number"
              id="price"
              name="price"
              value={newProduct.price || ""}
              onChange={handleChange}
              placeholder="Price"
            />
            {errors.price && <span className="error">{errors.price}</span>}
          </div>

          <div className="input-group">
            <input
              type="number"
              id="stock"
              name="stock"
              value={newProduct.stock || ""}
              onChange={handleChange}
              placeholder="Stock"
            />
            {errors.stock && <span className="error">{errors.stock}</span>}
          </div>

          <div className="input-group">
            <input
              type="text"
              id="category"
              name="category"
              value={newProduct.category}
              onChange={handleChange}
              placeholder="Category"
            />
            {errors.category && <span className="error">{errors.category}</span>}
          </div>

          <div className="input-group">
            <input
              type="text"
              id="image"
              name="image"
              value={newProduct.image}
              onChange={handleChange}
              placeholder="Image URL"
            />
            {errors.image && <span className="error">{errors.image}</span>}
          </div>

          <button type="submit">
            Create Product
          </button>
        </form>
      </div>
      )}
    </>
  );
};
