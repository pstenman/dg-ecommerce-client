import { ProductsList } from "../components/products/ProductsList"
import "../styles/products/productsStyles.css"

export const Products = () => {

    return <>
        <ProductsList 
            isAdmin={false}
        />
    </>
}