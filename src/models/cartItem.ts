import { IProduct } from "./products";

export class CartItem {
    constructor(
        public product: IProduct,
        public quantity: number,
    ) {}
}