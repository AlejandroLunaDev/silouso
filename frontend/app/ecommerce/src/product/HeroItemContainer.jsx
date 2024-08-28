import { useEffect, useState,navigate } from 'react';
import { Link } from 'react-router-dom';
import { TiShoppingCart } from 'react-icons/ti';
import { getProducts } from '../../../common/services/products'; 
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { useCart } from '../common/hook/useCart';
import { useAuth } from '../../../common/auth/hook/useAuth';



export default function HeroItemContainer() {
  const [product, setProduct] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");
  const { addProductToCart } = useCart();
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchPromotedProduct = async () => {
      try {
        const response = await getProducts();
        if (response && response.products) {
          const promotedProduct = response.products.find(p => p.isPromoted);
          setProduct(promotedProduct || null);
        } else {
          console.error('No se recibieron datos válidos.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchPromotedProduct();
  }, []);

  useEffect(() => {
    const videoUrl = "https://silouso-tec.s3.us-east-2.amazonaws.com/herovideoL.mp4";
    setVideoSrc(videoUrl);
  }, []);

  if (!product) {
    return (
      <section className='bg-black h-screen flex items-center justify-center'>
        <p className="text-white">No hay producto promocional disponible.</p>
      </section>
    );
  }


  const handleOnAdd = () => {
    if (!user) {

      navigate('/login');
    } else {
    // If user is authenticated, add the product to the cart
      addProductToCart(product._id);
      Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#61005D",
      }).showToast();
    }
  };
  return (
    <section className='bg-black h-screen flex items-center relative'>
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover opacity-25"
      />
      <div className="relative flex items-center justify-center w-full h-full p-4 text-white">
        <div className="flex items-center justify-center overflow-hidden">
          <div className="p-4 w-2/3">
            <h1 className="text-6xl font-bold mb-2">{product.title}</h1>
            <p className="mb-4">{product.description}</p>
            <div className="flex gap-4 items-center">
              <Link to={`/product/${product._id}`} rel='preconnect' className="border p-3 rounded hover:bg-[#61005D] hover:border-none">
                Ver más
              </Link>
              <button 
              onClick={handleOnAdd}
              className="flex items-center gap-2 border p-3 rounded hover:bg-[#61005D] hover:border-none">
                <TiShoppingCart className="text-xl" />
                Comprar
              </button>
            </div>
          </div>
          <img
            src={product.thumbnails[0]}
            alt={product.title}
            className="w-1/3 h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
