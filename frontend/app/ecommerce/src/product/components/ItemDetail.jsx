/* eslint-disable no-dupe-keys */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const ButtonCount = ({ onAdd, stock, initial = 1 }) => {
  const [count, setCount] = useState(initial);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const mostrarAlerta = () => {
    Toastify({
      text: 'Producto Agregado al Carrito',
      position: 'right',
      gravity: 'bottom',
      duration: 1500,
      style: {
        background: 'linear-gradient(to right, #00b09b, #96c93d)'
      }
    }).showToast();
  };

  const increment = () => {
    if (count < stock) {
      setCount(prevCount => prevCount + 1);
    }
  };

  const decrement = () => {
    if (count > 0) setCount(prevCount => prevCount - 1);
  };

  const handleAddToCart = () => {
    onAdd(count);
    mostrarAlerta();
  };

  return (
    <div className='flex justify-between'>
      <button
        className='border rounded-sm flex items-center justify-center'
        onClick={decrement}
      >
        -
      </button>
      <p className='text-[13px] border rounded-sm px-3 flex items-center'>
        {count}
      </p>
      <button
        className='border rounded-sm flex items-center justify-center'
        onClick={increment}
      >
        +
      </button>
      {user ? (
        <button
          className='bg-[#61005D] rounded text-center text-white py-1 px-2'
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      ) : (
        <button
          className='bg-[#61005D] rounded text-center text-white py-1 px-2'
          onClick={() => navigate('/login')}
        >
          Agregar al carrito
        </button>
      )}
    </div>
  );
};

export default function ItemDetail({ product }) {
  const {
    _id,
    title,
    category,
    thumbnails = [],
    price,
    stock,
    description,
    isAvailable,
    isPromoted
  } = product || {}; // Asegúrate de que `product` tenga el formato correcto

  const [currentImage, setCurrentImage] = useState(thumbnails[0]);
  const [zoomImageCoordinates, setZoomImageCoordinates] = useState({
    x: 0,
    y: 0,
    zoom: 1
  });
  const [showZoom, setShowZoom] = useState(false);

  const [hasStock, setHasStock] = useState(stock > 0);

  // Asegúrate de manejar la lógica de agregar al carrito
  const handleOnAdd = quantity => {
    const objProductToAdd = {
      _id,
      title,
      price,
      quantity,
      thumbnails,
      stock
    };
    // Aquí deberías implementar la función para agregar el producto al carrito
    // Por ejemplo: addItem(objProductToAdd);
  };

  // Maneja el cambio de imagen
  const handleThumbnailClick = image => {
    setCurrentImage(image);
  };

  const handleMouseMove = e => {
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
    <section className='flex-none md:flex gap-4 items-center'>
      <article>
        <header className='p-10 relative'>
          {currentImage ? (
            <div
              className='relative group'
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <img
                className='h-44 md:h-[400px] object-cover'
                src={currentImage} // Usa la imagen grande del estado
                alt={title}
              />
              {showZoom && (
                <div
                  className='absolute border border-black bg-white pointer-events-none w-[400px] h-[400px]'
                  style={{
                    top: `${zoomImageCoordinates.y}%`,
                    left: `${zoomImageCoordinates.x}%`,
                    transform: 'translate(-50%, -50%)',
                    backgroundImage: `url(${currentImage})`,
                    backgroundSize: '200%',
                    backgroundPosition: `${zoomImageCoordinates.x}% ${zoomImageCoordinates.y}%`,
                    zIndex: 10
                  }}
                />
              )}
            </div>
          ) : (
            <p>No image available</p>
          )}
        </header>
        <div className='flex overflow-x-auto gap-2 justify-center'>
          {thumbnails.map((thumbnail, index) => (
            <img
              key={index}
              className='h-20 w-20 object-cover cursor-pointer border rounded'
              src={thumbnail}
              alt={`Thumbnail ${index}`}
              onClick={() => handleThumbnailClick(thumbnail)}
            />
          ))}
        </div>
      </article>
      <aside className='md:border-l pl-8'>
        <article>
          <header className='mb-10'>
            <h3 className='font-semibold text-xl mb-2'>{title}</h3>
            <div className='flex font-semibold text-sm gap-2'>
              <p className='border-r border-black pr-3'>SKU</p>
              <p>{_id}</p>
            </div>
          </header>
          <p className='font-bold mb-5'>$ {price}</p>
          <h3 className='font-bold'>Categoría</h3>
          <p>{category?.name || 'No category available'}</p>
          <h3 className='font-bold'>Descripción</h3>
          <p className='text-[11px] md:text-sm w-1/3'>{description}</p>
        </article>
        <div className='w-60 mt-8'>
          {hasStock ? (
            <ButtonCount onAdd={handleOnAdd} stock={stock} />
          ) : (
            <div className='bg-red-500 text-white rounded px-2 py-1'>
              No hay stock de este producto
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}
