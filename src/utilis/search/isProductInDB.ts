import { linkProductAndDBProduct } from "./linkProductAndDBProduct"

export const isProductInDB = (externalLink: string): boolean => {
    return linkProductAndDBProduct.some((item) => item.externalLink === externalLink);
}