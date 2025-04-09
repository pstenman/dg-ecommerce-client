export interface IOrderItem {
    id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
  }

  export interface ICreateOrderItem {
    product_id: number;
    product_name: string;
    quantity: number;
    unit_price: number;
  }
  
  export interface IOrder {
    id: number;
    customer_id: number;
    total_price: number;
    payment_status: string;
    payment_id: string | null;
    order_status: string;
    created_at: string;
    customer_firstname: string;
    customer_lastname: string;
    customer_email: string;
    customer_phone: string;
    customer_street_address: string;
    customer_postal_code: string;
    customer_city: string;
    customer_country: string;
    customers_created_at: string;
  }
  
  export interface IOrderById extends Omit<IOrder, "id"> {
    id: string,
    order_items: IOrderItem[];
    password: string,
    orderId?: string
  }
  
  export interface IUpdateOrderItem {
    id: number,
    quantity?: number,
  }
  
  export interface IUpdateOrder {
    order_status?: string,
    order_items?: IUpdateOrderItem[];
    payment_status?: string,
    payment_id?: string | null;
  }

  export interface ICreateOrder {
  customer_id: number,
	payment_status: string,
	payment_id: null,
	order_status: string,
	order_items: ICreateOrderItem[]
  }