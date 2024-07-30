/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import {useCart} from '../../common/hook/useCart';


export default function ItemDetail({ product }) {
  const {
    _id,
    title,
    category,
    thumbnails = [],
    price,
    stock,
    description,
  } = product || {};
  const {productId} = useParams();
  const [currentImage, setCurrentImage] = useState(thumbnails[0]);
  const [zoomImageCoordinates, setZoomImageCoordinates] = useState({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [showZoom, setShowZoom] = useState(false);
  const [hasStock, setHasStock] = useState(stock > 0);
  const { addProductToCart } = useCart();

  const handleOnAdd = () => {
    addProductToCart(productId); // Solo pasar el ID del producto
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        backgroundColor: "#61005D",
    }).showToast();
};


  const handleThumbnailClick = (image) => {
    setCurrentImage(image);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomImageCoordinates({ x, y, zoom: 2 });
  };

  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  return (
    <section className="w-full h-full flex justify-center items-center px-10">
      <section className="flex-none md:flex gap-2 items-center rounded-3xl shadow-xl border p-5 w-full">
        <article className="flex gap-4 w-1/2">
          <div className="flex-col items-center gap-4 flex">
            {thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                className="h-16 w-16 object-cover cursor-pointer border border-[#61005D] rounded"
                src={thumbnail}
                alt={`Thumbnail ${index}`}
                onClick={() => handleThumbnailClick(thumbnail)}
                onMouseEnter={() => setCurrentImage(thumbnail)}
                onMouseLeave={() => setCurrentImage(thumbnails[0])}
              />
            ))}
          </div>
          <div className="p-5 relative">
            {currentImage ? (
              <div
                className="relative group flex items-center justify-center"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  className="h-44 md:h-[400px] object-cover"
                  src={currentImage}
                  alt={title}
                />
                {showZoom && (
                  <div
                    className="absolute border border-black bg-white pointer-events-none w-[400px] h-[400px]"
                    style={{
                      top: `${zoomImageCoordinates.y}%`,
                      left: `${zoomImageCoordinates.x}%`,
                      transform: 'translate(-50%, -50%)',
                      backgroundImage: `url(${currentImage})`,
                      backgroundSize: '200%',
                      backgroundPosition: `${zoomImageCoordinates.x}% ${zoomImageCoordinates.y}%`,
                      zIndex: 10,
                    }}
                  />
                )}
              </div>
            ) : (
              <p>No image available</p>
            )}
          </div>
        </article>
        <aside className="w-1/2">
          <article>
            <header className="mb-10">
              <h3 className="font-semibold text-xl mb-2">{title}</h3>
              <div className="flex font-semibold text-sm gap-2">
                <p className="border-r border-black pr-3">SKU</p>
                <p>{_id}</p>
              </div>
            </header>
            <p className="font-bold text-3xl text-[#61005D] mb-4">$ {price}</p>
            <h3 className="font-bold">Categorías</h3>
            <p className="capitalize">
              {category?.parentCategory?.name
                ? `${category.parentCategory.name} > ${category.name}`
                : category?.name || 'No category available'}
            </p>
            <h3 className="font-bold">Descripción</h3>
            <p className="text-[11px] md:text-sm">{description}</p>
          </article>
          <div className="w-60 mt-8">
            {hasStock ? (
              <button onClick={handleOnAdd} className='bg-[#61005D] text-white rounded px-2 py-1'>
                Agregar
              </button>
            ) : (
              <div className="bg-red-500 text-white rounded px-2 py-1">
                No hay stock de este producto
              </div>
            )}
          </div>
        </aside>
      </section>
    </section>
  );
}
