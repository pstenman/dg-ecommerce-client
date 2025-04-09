export interface ICustomer {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phone: string,
    street_address: string,
    postal_code: string,
    city: string,
    country: string,
}

export interface ICreateCustomer {
    firstname: string,
    lastname: string,
    email: string,
    phone: string,
    street_address: string,
    postal_code: string,
    city: string,
    country: string,
    [key: string]: string, 
}

export interface IUpdateCustomer {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    street_address?: string;
    postal_code?: string;
    city?: string;
    country?: string;
}