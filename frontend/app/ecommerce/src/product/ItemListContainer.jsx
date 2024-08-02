/* eslint-disable react-hooks/exhaustive-deps */
import { ItemList } from "./components/ItemList";
import { getProducts } from "../../../common/services/products";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function ItemListContainer() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const location = useLocation();

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProductsByCategory();
    }, [products, location.search]);

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

    const filterProductsByCategory = () => {
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get("category");

        if (category) {
            const filtered = products.filter(product => product.category.name.toLowerCase() === category.toLowerCase());
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    };

    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 3;
        const startPage = Math.max(
            1,
            currentPage - Math.floor(maxVisiblePages / 2)
        );
        const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md ${currentPage === i ? 'bg-[#61005D] text-white' : 'bg-white text-black'}`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

    return (
        <div className="mt-5">
            <div>
                <div>
                    <ItemList products={filteredProducts} className="" />
                </div>
                <div className='flex justify-center my-5'>
                    <button
                        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                        className='mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md bg-white text-black'
                    >
                        &laquo;
                    </button>
                    {renderPageNumbers()}
                    <button
                        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                        className='mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md bg-white text-black'
                    >
                        &raquo;
                    </button>
                </div>
            </div>
        </div>
    );
}
