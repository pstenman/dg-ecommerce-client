import { ChangeEvent, FormEvent, useState } from "react";
import { ICreateCustomer } from "../../models/customer";
import { useCart } from "../../hooks/useCart";
import { findOrCreateCustomer } from "../../utilis/findOrCreateCustomer";
import { createOrderFromCartData } from "../../utilis/createOrderFromCartData";
import { prepareStripeData } from "../../utilis/prepareOrderForStripeData";
import { makeStripePayment } from "../../utilis/makeStripePayment";
import { updateOrder } from "../../services/ordersServices";
import { useCustomers } from "../../hooks/useCustomers";
import { validateForm } from "../../utilis/validation/validateForm";
import { customerValidation } from "../../utilis/validation/customerValidation";

export const CreateCheckout = () => {
  const { cart } = useCart();
  const { findCustomerByEmail, addCustomer } = useCustomers();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [newCustomer, setNewCustomer] = useState<ICreateCustomer>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    street_address: "",
    postal_code: "",
    city: "",
    country: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm(newCustomer, customerValidation);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      const customerToUse = await findOrCreateCustomer(
        newCustomer,
        findCustomerByEmail,
        addCustomer
      );
      if (!customerToUse) {
        throw new Error("Customer creation failed");
      }
      const orderResponse = await createOrderFromCartData(
        cart,
        String(customerToUse.id)
      );
      console.log("ordercreated", orderResponse);
      const orderId = orderResponse.id;
      const stripeOrder = prepareStripeData(String(orderId), cart);
      if (stripeOrder) {
        const session = await makeStripePayment(
          stripeOrder,
          String(orderId),
          updateOrder
        );

        console.log("session", session);
      }
      localStorage.setItem("customer", JSON.stringify(customerToUse));
    } catch (error) {
      console.error("Error during checkout:", error);
    }

    setNewCustomer({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phone: "",
      street_address: "",
      postal_code: "",
      city: "",
      country: "",
    });
    setErrors({});
  };

  return (
    <>
      <div className="customer-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Customer Information</h2>

          <div className="input-grid">
            <div className="input-group">
              <input
                type="text"
                name="firstname"
                value={newCustomer.firstname}
                onChange={handleChange}
                placeholder="First Name"
              />
              {errors.firstname && (
                <span className="error">{errors.firstname}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="lastname"
                value={newCustomer.lastname}
                onChange={handleChange}
                placeholder="Last Name"
              />
              {errors.lastname && (
                <span className="error">{errors.lastname}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                value={newCustomer.email}
                onChange={handleChange}
                placeholder="Email"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="phone"
                value={newCustomer.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="street_address"
                value={newCustomer.street_address}
                onChange={handleChange}
                placeholder="Street Address"
              />
              {errors.street_address && (
                <span className="error">{errors.street_address}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="postal_code"
                value={newCustomer.postal_code}
                onChange={handleChange}
                placeholder="Postal Code"
              />
              {errors.postal_code && (
                <span className="error">{errors.postal_code}</span>
              )}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="city"
                value={newCustomer.city}
                onChange={handleChange}
                placeholder="City"
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="country"
                value={newCustomer.country}
                onChange={handleChange}
                placeholder="Country"
              />
              {errors.country && (
                <span className="error">{errors.country}</span>
              )}
            </div>
          </div>

          <button type="submit" className="add-customer-btn">
            Pay Now
          </button>
        </form>
      </div>
    </>
  );
};
