import { useState } from 'react';
import PropTypes from 'prop-types';
import { createProduct } from '../../../../services/products';

const AddProduct = ({ onCancel, onAdd }) => {
  const [productData, setProductData] = useState({
    title: '',
    price: 0,
    stock: 0,
    category: '',
    description: '',
    code: ''
  });
  const [files, setFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleFileChange = e => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    // Crear una vista previa de las imágenes
    const previews = selectedFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Crear un objeto FormData para enviar el formulario y las imágenes
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('price', productData.price);
      formData.append('stock', productData.stock);
      formData.append('category', productData.category);
      formData.append('description', productData.description);
      formData.append('code', productData.code);
      files.forEach(file => formData.append('identification', file));
  
      // Enviar el formulario con las imágenes al servidor
      await createProduct(formData);
  
      onAdd();
      onCancel();
    } catch (error) {
      // Manejar el error de manera más robusta
      console.error('Error creating product:', error.message);
      setError(error.message || 'Error creating product. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='h-dvh container mx-auto mt-8 px-4 py-4'>
      <header>
        <h1 className='text-2xl font-bold mb-4'>Agregar Nuevo Producto</h1>
      </header>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Campos de texto */}
        <div className='mb-4'>
          <label htmlFor='title' className='block text-sm font-medium text-gray-700'>
            Título
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={productData.title}
            onChange={handleChange}
            required
            className='mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-[#61005D] focus:ring focus:ring-indigo-200 focus:ring-opacity-5 focus:outline-none'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='price' className='block text-sm font-medium text-gray-700'>
            Precio
          </label>
          <input
            type='number'
            id='price'
            name='price'
            value={productData.price}
            onChange={handleChange}
            required
            className='mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-[#61005D] focus:ring focus:ring-indigo-200 focus:ring-opacity-5 focus:outline-none'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='stock' className='block text-sm font-medium text-gray-700'>
            Stock
          </label>
          <input
            type='number'
            id='stock'
            name='stock'
            value={productData.stock}
            onChange={handleChange}
            required
            className='mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-[#61005D] focus:ring focus:ring-indigo-200 focus:ring-opacity-5 focus:outline-none'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='category' className='block text-sm font-medium text-gray-700'>
            Categoría
          </label>
          <input
            type='text'
            id='category'
            name='category'
            value={productData.category}
            onChange={handleChange}
            required
            className='mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-[#61005D] focus:ring focus:ring-indigo-200 focus:ring-opacity-5 focus:outline-none'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='description' className='block text-sm font-medium text-gray-700'>
            Descripción
          </label>
          <textarea
            id='description'
            name='description'
            value={productData.description}
            onChange={handleChange}
            required
            rows='3'
            className='mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-[#61005D] focus:ring focus:ring-indigo-200 focus:ring-opacity-5 focus:outline-none'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='identification' className='block text-sm font-medium text-gray-700'>
            Imágenes
          </label>
          <input
            type='file'
            id='identification'
            name='identification'
            multiple
            onChange={handleFileChange}
            className='mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-[#61005D] focus:ring focus:ring-indigo-200 focus:ring-opacity-5 focus:outline-none'
          />
          <div className='mt-4 flex flex-wrap gap-2'>
            {imagePreviews.map((preview, index) => (
              <img
                key={index}
                src={preview}
                alt={`Preview ${index}`}
                className='w-32 h-32 object-cover rounded border border-gray-300'
              />
            ))}
          </div>
        </div>
        <div className='mb-4'>
          <label htmlFor='code' className='block text-sm font-medium text-gray-700'>
            Código
          </label>
          <input
            type='text'
            id='code'
            name='code'
            value={productData.code}
            onChange={handleChange}
            required
            className='mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-[#61005D] focus:ring focus:ring-indigo-200 focus:ring-opacity-5 focus:outline-none'
          />
        </div>
        <div className='flex justify-between'>
          <button
            type='button'
            onClick={onCancel}
            className='py-2 px-4 border border-gray-300 rounded-md bg-red-600 text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-indigo-500'
          >
            Cancelar
          </button>
          <button
            type='submit'
            disabled={loading}
            className='py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#61005D] hover:bg-[#61005D]/90 focus:outline-none focus:ring-2'
          >
            {loading ? 'Agregando...' : 'Agregar Producto'}
          </button>
        </div>
      </form>
    </div>
  );
};

AddProduct.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default AddProduct;
