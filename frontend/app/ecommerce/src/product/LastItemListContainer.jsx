/* eslint-disable react/prop-types */
import { getProducts } from "../../../services/products";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import { LastItemList } from "./components/LastItemList";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export default function LastItemListContainer() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await getProducts(1, 100); 
            if (response) {
                const today = new Date();
                const filteredProducts = response.products
                    .filter(product => {
                        const createdDate = new Date(product.created_at);
                        return createdDate <= today;
                    })
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) 
                    .slice(0, 5); 

                setProducts(filteredProducts);
            } else {
                console.error('No se recibieron datos válidos.');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <Slider {...settings}>
            {products.map(product => (
                <div key={product._id} className="px-3">
                    <LastItemList products={[product]} />
                </div>
            ))}
        </Slider>
    );
}

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <div
            className={`rounded-full h-8 w-8 cursor-pointer flex justify-center items-center bg-[#61005D] border right-3 hover:shadow-2xl hover:bg-[#61005ee2]  ${className}`}	
        
            onClick={onClick}
        >
          <IoIosArrowForward className="text-white h-5 w-5" />
        </div>
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <div
        className={`rounded-full h-8 w-8 cursor-pointer flex justify-center items-center bg-[#61005D] border left-3 z-10 hover:shadow-2xl hover:bg-[#61005ee2]  ${className}`}	
       
            onClick={onClick}
        >
            <IoIosArrowBack className="text-white h-5 w-5" />
        </div>
    );
}
