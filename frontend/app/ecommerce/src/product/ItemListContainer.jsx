/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IoFilter, IoClose, IoArrowForward } from "react-icons/io5"; // Importar el ícono de flecha derecha
import { FormControl, FormControlLabel, Checkbox, styled } from '@mui/material'; // Importa el componente styled
import { ItemList } from "./components/ItemList";
import { getProducts } from "../../../common/services/products";

// Personaliza el Checkbox para que sea cuadrado y sin color de fondo
const SquareCheckbox = styled(Checkbox)(({ theme }) => ({
    '& .MuiSvgIcon-root': {
        borderRadius: '2px', 
 
        color: 'black', 
        backgroundColor: 'transparent', // Sin color de fondo
    },
    '&.Mui-checked .MuiSvgIcon-root': {
        color: 'black', // Color del check negro
        backgroundColor: 'transparent', // Sin color de fondo
     // Color del borde negro
    },
}));

export default function ItemListContainer() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filterOpen, setFilterOpen] = useState(false);
    const [sortOrder, setSortOrder] = useState([]);
    const [priceRange, setPriceRange] = useState(null); // Null means no filter
    const [minPrice, setMinPrice] = useState(""); // For custom min price input
    const [maxPrice, setMaxPrice] = useState(""); // For custom max price input

    const location = useLocation();

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    useEffect(() => {
        applyFilters();
    }, [products, sortOrder, priceRange, location.search]);

    const fetchProducts = async () => {
        try {
            const response = await getProducts(currentPage, 12);
            if (response) {
                setProducts(response.products);
                setTotalPages(response.totalPages); // Assuming you get totalPages from the response
            } else {
                console.error("No se recibieron datos válidos.");
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const applyFilters = () => {
        let filtered = [...products];
        
        // Filter by category
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get("category");
        if (category) {
            filtered = filtered.filter(product => product.category.name.toLowerCase() === category.toLowerCase());
        }

        // Apply price range filter
        if (priceRange) {
            filtered = filtered.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);
        }

        // Apply sorting
        if (sortOrder.includes("asc")) {
            filtered.sort((a, b) => a.price - b.price);
        } else if (sortOrder.includes("desc")) {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(filtered);
    };

    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    };

    const handleSortOrderChange = (event) => {
        const value = event.target.value;
        setSortOrder(prevState =>
            prevState.includes(value) ? prevState.filter(order => order !== value) : [...prevState, value]
        );
    };

    const handlePriceRangeClick = (range) => {
        // Toggle filter
        if (priceRange && priceRange[0] === range[0] && priceRange[1] === range[1]) {
            setPriceRange(null); // Clear filter if clicking the same button
        } else {
            setPriceRange(range); // Set new filter
        }
    };

    const handleCustomPriceFilter = () => {
        const min = parseFloat(minPrice);
        const max = parseFloat(maxPrice);
        
        if (!isNaN(min) && !isNaN(max) && min <= max) {
            setPriceRange([min, max]);
        } else if (min && !max) {
            setPriceRange([min, Infinity]);
        } else if (!min && max) {
            setPriceRange([0, max]);
        } else {
            setPriceRange(null); // Clear filter if inputs are invalid
        }
    };

    const toggleFilterMenu = () => {
        setFilterOpen(!filterOpen);
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
        <div className="flex ">
            <div className={`fixed top-20 left-0 h-full bg-white p-4 max-w-[300px] shadow-xl transition-transform transform ${filterOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-end items-center my-4">
                    <button 
                        onClick={toggleFilterMenu} 
                        className="text-gray-500 flex items-center hover:text-gray-700"
                    >
                        <small className="ml-1">Cerrar filtros</small>
                        <IoClose size={24} />
                    </button>
                </div>
                <FormControl component="fieldset">
                    <h3 className="text-xl font-semibold mt-4">Ordenar por:</h3>
                    <div className="flex flex-col gap-2 mt-2">
                        <FormControlLabel
                            control={<SquareCheckbox checked={sortOrder.includes("asc")} onChange={handleSortOrderChange} value="asc" />}
                            label="Más barato a más caro"
                        />
                        <FormControlLabel
                            control={<SquareCheckbox checked={sortOrder.includes("desc")} onChange={handleSortOrderChange} value="desc" />}
                            label="Más caro a más barato"
                        />
                    </div>
                    <h3 className="text-xl font-semibold mt-4">Precios</h3>
                    <div className="flex flex-col gap-2 mt-2">
                        <p
                            onClick={() => handlePriceRangeClick([0, 750000])}
                            className={`cursor-pointer ${priceRange && priceRange[0] === 0 && priceRange[1] === 750000 ? ' text-[#61005D]' : ' text-black'}`}
                        >
                            Hasta $750,000
                        </p>
                        <p
                            onClick={() => handlePriceRangeClick([750000, 1500000])}
                            className={`cursor-pointer ${priceRange && priceRange[0] === 750000 && priceRange[1] === 1500000 ? ' text-[#61005D]' : ' text-black'}`}
                        >
                            $750,000 - $1,500,000
                        </p>
                        <p
                            onClick={() => handlePriceRangeClick([1500000, Infinity])}
                            className={`cursor-pointer ${priceRange && priceRange[0] === 1500000 ? ' text-[#61005D]' : ' text-black'}`}
                        >
                            Más de $1,500,000
                        </p>
                    </div>
                    <div className="mt-4">
                        <div className="flex gap-2 mt-2">
                            <input
                                type="number"
                                placeholder="Mínimo"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                className="border p-2 rounded-md w-1/2"
                            />
                            <input
                                type="number"
                                placeholder="Máximo"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="border p-2 rounded-md w-1/2"
                            />
                            <button
                                onClick={handleCustomPriceFilter}
                                className="bg-[#61005D] text-white py-2 px-4 rounded-md flex items-center justify-center"
                            >
                                <IoArrowForward size={20} />
                            </button>
                        </div>
                    </div>
                </FormControl>
            </div>
            <div className={`flex-grow transition-all duration-300 ${filterOpen ? 'ml-72' : 'ml-0'}`}>
                <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={toggleFilterMenu} className="border border-[#61005D] text-[#61005D] py-2 px-4 rounded-md flex items-center">
                            <IoFilter size={20} />
                            <span className="ml-2">Filtrar</span>
                        </button>
                    </div>
                    <ItemList products={filteredProducts} />
                    <div className="flex justify-center my-4">
                        {renderPageNumbers()}
                    </div>
                </div>
            </div>
        </div>
    );
}
