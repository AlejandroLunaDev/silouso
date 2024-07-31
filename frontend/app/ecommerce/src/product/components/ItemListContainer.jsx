import { ItemList } from "./ItemList";
import { getProducts } from "../../../../common/services/products";
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
    <div className="mt-5 " >
        <div className="">
        <header className="px-2">
            <h1 className="text-3xl text-end font-bold text-[#61005D]">Tienda</h1>
        </header>
        <ItemList products={products} className="" />
        </div>

    </div>
  )
}
