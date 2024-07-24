/* eslint-disable react/prop-types */
// EditProduct.jsx
import { useState, useEffect } from 'react';
import { updateProduct, getProductById } from '../../../../services/products';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { AiOutlineUpload } from 'react-icons/ai';

const EditProduct = ({ productId, onCancel, onSave }) => {
  const [product, setProduct] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        if (response.status === 'success') {
          setProduct(response.payload);
          console.log(response.payload);
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
    setNewImage(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const updatedProduct = { ...product };
      if (newImage) {
        // Simulación de la lógica de subida de imagen
        updatedProduct.thumbnail = URL.createObjectURL(newImage);
      }
      await updateProduct(product._id, updatedProduct);
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
      <div className='w-full '>
        <label className='block text-lg font-medium'>Título</label>
        <input
          type='text'
          className='w-full p-2 border border-gray-300 rounded my-2'
          value={product.title}
          onChange={e => setProduct({ ...product, title: e.target.value })}
        />

        <label className='block text-lg font-medium'>Precio</label>
        <input
          type='text'
          className='w-full p-2 border border-gray-300 rounded my-2'
          value={product.price}
          onChange={e => setProduct({ ...product, price: e.target.value })}
        />

        <label className='block text-lg font-medium'>Stock</label>
        <input
          type='text'
          className='w-full p-2 border border-gray-300 rounded my-2'
          value={product.stock}
          onChange={e => setProduct({ ...product, stock: e.target.value })}
        />

        <label className='block text-lg font-medium'>Categoría</label>
        <input
          type='text'
          className='w-full p-2 border border-gray-300 rounded my-2'
          value={product.category}
          onChange={e => setProduct({ ...product, category: e.target.value })}
        />

        <label className='block text-lg font-medium'>Descripción</label>
        <textarea
          className='w-full p-2 border border-gray-300 rounded my-2'
          value={product.description}
          onChange={e =>
            setProduct({ ...product, description: e.target.value })
          }
        />

        <div className='mt-4 flex justify-between '>
          <div>
            <label className='block text-lg font-medium'>
              Imagen del producto
            </label>
            <div className='flex gap-3'>
              {product.thumbnails && (
                <div className='w-32 h-32 border border-gray-300 rounded  overflow-hidden'>
                  <img
                    src={product.thumbnails}
                    alt={product.title}
                    className='object-contain w-full h-full'
                  />
                </div>
              )}
              <button
                className='hover:bg-gray-200 px-4 py-2 border flex flex-col justify-center items-center text-[#61005D] rounded'
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
              >
                <AiOutlineUpload className='w-7 h-7' />
                Subir imagen
                <input type='file' hidden onChange={handleImageUpload} />
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
    </div>
  );
};

export default EditProduct;
