import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroItemContainer() {
  const [product, setProduct] = useState(null);
  const [videoSrc, setVideoSrc] = useState("");

  useEffect(() => {
    const storedProduct = localStorage.getItem('selectedProduct');
    if (storedProduct) {
      setProduct(JSON.parse(storedProduct));
    }
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
            <h1 className="text-7xl font-bold mb-2">{product.title}</h1>
            <p className="mb-4">{product.description}</p>
            <Link to={`/product/${product._id}`} className="underline">
              Ver más
            </Link>
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
