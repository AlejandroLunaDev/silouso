import { ItemList } from "./ItemList";
import { getProducts } from "../../../../services/products";
import { useEffect, useState } from "react";

export default function ItemListContainer() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, []);
    const fetchProducts = async () => {
        try {
            const response = await getProducts(1, 12);
            if (response) {
                setProducts(response.products);
            } else {
                console.error("No se recibieron datos válidos.");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
  return (
    <div className="" >
        <div className="">
        <header className="">
            <h1 className="text-3xl font-bold text-[#61005D]">Nuestros productos</h1>
        </header>
        <ItemList products={products} className="" />
        </div>

    </div>
  )
}
