/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { updateProduct, getProductById } from '../../../../services/products';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { AiOutlineUpload } from 'react-icons/ai';

const EditProduct = ({ productId, onCancel, onSave }) => {
  const [product, setProduct] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [imageToReplace, setImageToReplace] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        if (response.status === 'success') {
          setProduct(response.payload);
        } else {
          console.error('Error fetching product data:', response);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleImageUpload = e => {
    const files = Array.from(e.target.files);
  
    if (imageToReplace !== null) {
      // Reemplazar imagen existente
      const updatedThumbnails = product.thumbnails.map((img, index) =>
        index === imageToReplace ? URL.createObjectURL(files[0]) : img
      );
      setProduct({ ...product, thumbnails: updatedThumbnails });
      setImageToReplace(null);
    } else {
      // Añadir nuevas imágenes
      setNewImages([...newImages, ...files]);
    }
  };
  

  const handleSave = async () => {
    if (!product) {
      console.error('Product is not defined');
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('stock', product.stock);
      formData.append('category', product.category);
  
      // Agregar archivos al FormData
      newImages.forEach((file, index) => {
        formData.append('images', file, `image${index}.jpg`);
      });
  
      await updateProduct(product._id, formData);
  
      Toastify({
        text: 'Producto Actualizado',
        gravity: 'bottom',
        duration: 2000,
        style: {
          background: '#61005D'
        }
      }).showToast();
      onSave();
    } catch (error) {
      console.error('Error updating product:', error);
      Toastify({
        text: 'Error al actualizar el producto',
        gravity: 'bottom',
        duration: 2000,
        style: {
          background: 'red'
        }
      }).showToast();
    }
  };
  
  
  
  

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className='flex flex-col w-full px-4 mt-4'>
      <h2 className='text-2xl font-bold mb-4'>Editar Producto</h2>
      <div className='w-full'>
        {/* Campos de formulario para título, precio, stock, etc. */}
        <div className='mb-4'>
          <label className='block text-lg font-medium'>Título</label>
          <input
            type='text'
            value={product.title}
            onChange={e => setProduct({ ...product, title: e.target.value })}
            className='w-full border rounded px-2 py-1'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-lg font-medium'>Descripción</label>
          <textarea
            value={product.description}
            onChange={e => setProduct({ ...product, description: e.target.value })}
            className='w-full border rounded px-2 py-1'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-lg font-medium'>Precio</label>
          <input
            type='number'
            value={product.price}
            onChange={e => setProduct({ ...product, price: e.target.value })}
            className='w-full border rounded px-2 py-1'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-lg font-medium'>Stock</label>
          <input
            type='number'
            value={product.stock}
            onChange={e => setProduct({ ...product, stock: e.target.value })}
            className='w-full border rounded px-2 py-1'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-lg font-medium'>Categoría</label>
          <input
            type='text'
            value={product.category}
            onChange={e => setProduct({ ...product, category: e.target.value })}
            className='w-full border rounded px-2 py-1'
          />
        </div>
        
        <div className='mt-4'>
          <label className='block text-lg font-medium'>Imágenes del producto</label>
          <div className='flex gap-3'>
            {product.thumbnails && product.thumbnails.length > 0 && (
              <div className='flex gap-2 flex-wrap'>
                {product.thumbnails.map((thumbnail, index) => (
                  <div key={index} className='relative w-32 h-32 border border-gray-300 rounded overflow-hidden'>
                    <img
                      src={thumbnail}
                      alt={`Thumbnail ${index}`}
                      className='object-contain w-full h-full'
                    />
                    <button
                      className='absolute top-0 right-0 bg-[#61005D] text-white p-1 rounded'
                      onClick={() => {
                        setImageToReplace(index);
                        document.querySelector('input[type="file"]').click();
                      }}
                    >
                      <AiOutlineUpload className='w-4 h-4' />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {newImages.length > 0 && (
              <div className='flex gap-2 flex-wrap'>
                {newImages.map((image, index) => (
                  <div key={index} className='relative w-32 h-32 border border-gray-300 rounded overflow-hidden'>
                    <img
                      src={image}
                      alt={`New Image ${index}`}
                      className='object-contain w-full h-full'
                    />
                  </div>
                ))}
              </div>
            )}
            <button
              className='hover:bg-gray-200 px-4 py-2 border flex flex-col justify-center items-center text-[#61005D] rounded'
              onClick={() => document.querySelector('input[type="file"]').click()}
            >
              <AiOutlineUpload className='w-7 h-7' />
              Subir imagen
              <input type='file' hidden multiple onChange={handleImageUpload} />
            </button>
          </div>
        </div>

        <div className='flex justify-center items-end mt-4 gap-4'>
          <button
            className='px-4 py-2 h-10 bg-[#61005D] text-white rounded'
            onClick={handleSave}
          >
            Guardar Cambios
          </button>
          <button
            className='px-4 py-2 h-10 bg-red-500 text-white rounded'
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
