import { CreateProductForm } from "../components/products/CreateProductForm";
import { ProductsList } from "../components/products/ProductsList";

export const AdminProducts = () => {

    return<>
        <CreateProductForm />
        <ProductsList 
            isAdmin={true}
        />    
    </>
};