
import { ICreateCustomer } from "../models/customer";

  export const findOrCreateCustomer = async (newCustomer: ICreateCustomer, findCustomerByEmail: Function, addCustomer: Function) => {
    
    const existingCustomer = await findCustomerByEmail(newCustomer.email);
    if (existingCustomer) {
      return existingCustomer;
    }

    const createdCustomer = await addCustomer(newCustomer);
    return createdCustomer;
  }