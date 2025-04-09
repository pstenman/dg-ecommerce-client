export const customerValidation = {
    firstname: { required: true },
    lastname: { required: true },
    email: { required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, },
    phone: { required: true },
    street_address: { required: true },
    postal_code: { required: true },
    city: { required: true },
    country: { required: true },
  };