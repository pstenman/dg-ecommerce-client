export interface IProduct {
    id: number,
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    image: string,
    created_at: string,
}

export interface ICreateProduct {
    name: string,
    description: string,
    price: number,
    stock: number,
    category: string,
    image: string,
    [key: string]: string | number,
}

export interface IUpdateProduct {
    name?: string,
    description?: string,
    price?: number,
    stock?: number,
    category?: string,
    image?: string,
}