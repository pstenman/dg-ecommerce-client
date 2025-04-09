export const productValidation = {
    name: { required: true },
    description: { required: true },
    price: { required: true, number: true, positiveNumber: true },
    stock: { required: true, number: true, positiveNumber: true },
    category: { required: true },
    image: { required: true },
  };