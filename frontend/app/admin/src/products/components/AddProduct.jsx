import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createProduct } from '../../../../common/services/products';
import {
  FaDesktop,
  FaMouse,
  FaHeadphones,
  FaLaptop,
  FaWifi,
  FaHdd,
  FaPrint,
  FaArrowLeft,
  FaArrowRight,
  FaMicrochip
} from 'react-icons/fa';
import { LiaTvSolid } from 'react-icons/lia';
import { PiMemoryThin } from 'react-icons/pi';

import { AiOutlineUpload } from 'react-icons/ai';
import { getCategories } from '../../../../common/services/categories';

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
  const [step, setStep] = useState(1);
  const [availableCategories, setAvailableCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await getCategories();
        const allCategories = result.payload;
        const availCategories = allCategories.filter(
          cat => cat.isAvailable === true
        );
        setAvailableCategories(availCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

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

  const handleCategorySelect = category => {
    setProductData(prevData => ({
      ...prevData,
      category
    }));
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
      formData.append('category', productData.category); // Asegúrate de incluir la categoría
      formData.append('description', productData.description);
      formData.append('code', productData.code);
      files.forEach(file => formData.append('identification', file));

      // Llama a createProduct con el FormData
      const response = await createProduct(formData);

      // Manejar la respuesta del servidor...
      console.log('Producto creado exitosamente:', response);
      onAdd();
    } catch (error) {
      console.error('Error al crear el producto:', error.message);
      setError('Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  // Mapeo de categorías con íconos
  const iconMap = {
    laptops: <FaLaptop />,
    perifericos: <FaMouse />,
    monitores: <LiaTvSolid />,
    accesorios: <FaHeadphones />,
    redes: <FaWifi />,
    reouter: <FaWifi />,
    almacenamiento: <FaHdd />,
    impresoras: <FaPrint />,
    auriculares: <FaHeadphones />,
    componentes: <FaMicrochip />,
    procesadores: <FaMicrochip />,
    memorias: <PiMemoryThin />,
    PCs: <FaDesktop />
  };

  const totalSteps = 5;

  // Funciones de validación por paso
  const validateStep = () => {
    switch (step) {
      case 1:
        return productData.title.trim() !== '';
      case 2:
        return productData.price > 0 && productData.stock > 0;
      case 3:
        return productData.category !== '';
      case 4:
        return productData.description.trim() !== '';
      case 5:
        return productData.code.trim() !== '' && files.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className='h-dvh container mx-auto mt-8 px-4 py-4'>
      <header>
        <h1 className='text-2xl font-bold mb-4'>Agregar Nuevo Producto</h1>
      </header>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <form onSubmit={handleSubmit}>
        {/* Barra de avance continua */}
        <div className='relative mb-4'>
          <div className='h-4 bg-gray-300 rounded-full'>
            <div
              className='h-full bg-[#61005D] rounded-full flex items-center justify-center'
              style={{ width: `${(step / totalSteps) * 100}%` }}
            >
              <span className='text-white text-xs font-medium'>{`${Math.round(
                (step / totalSteps) * 100
              )}%`}</span>
            </div>
          </div>
          <div className='text-sm text-gray-600 text-center mt-1'>{`Paso ${step} de ${totalSteps}`}</div>
        </div>

        {/* Contenido por pasos */}
        {step === 1 && (
          <div className='mb-4'>
            <label
              htmlFor='title'
              className='block text-md font-bold text-gray-700'
            >
              Título
            </label>
            <input
              type='text'
              id='title'
              name='title'
              value={productData.title}
              onChange={handleChange}
              required
              className='mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-[#61005D] focus:ring focus:ring-indigo-200 focus:ring-opacity-5 focus:outline-none py-1'
            />
          </div>
        )}
        {step === 2 && (
          <>
            <div className='mb-4'>
              <label
                htmlFor='price'
                className='block text-md font-bold text-gray-700'
              >
                Precio
              </label>
              <input
                type='number'
                id='price'
                name='price'
                value={productData.price}
                onChange={handleChange}
                required
                className='mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-[#61005D] focus:ring focus:ring-indigo-200 focus:ring-opacity-5 focus:outline-none py-1'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='stock'
                className='block text-md font-bold text-gray-700'
              >
                Stock
              </label>
              <input
                type='number'
                id='stock'
                name='stock'
                value={productData.stock}
                onChange={handleChange}
                required
                className='mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-[#61005D] focus:ring focus:ring-indigo-200 focus:ring-opacity-5 focus:outline-none py-1'
              />
            </div>
          </>
        )}
        {step === 3 && (
          <div className='mb-4'>
            <label className='block text-md font-bold text-gray-700 text-center mb-3'>
              Categoría
            </label>
            <div className='flex flex-wrap gap-2 justify-center'>
              {availableCategories.map((cat, index) => (
                <button
                  key={index}
                  type='button'
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`flex flex-col items-center justify-center w-24 h-24 border-2 rounded-md border-[#61005D] ${
                    productData.category === cat.name
                      ? 'bg-[#61005D] text-white'
                      : 'bg-transparent text-[#61005D]'
                  } focus:outline-none`}
                >
                  {iconMap[cat.name] || <span>{cat.name[0]}</span>}
                  <span className='mt-2 text-center text-sm'>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div className='mb-4'>
            <label
              htmlFor='description'
              className='block text-sm text-md font-bold text-gray-700'
            >
              Descripción
            </label>
            <textarea
              id='description'
              name='description'
              value={productData.description}
              onChange={handleChange}
              required
              rows='3'
              className='mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-[#61005D] focus:ring focus:ring-indigo-200 focus:ring-opacity-5 focus:outline-none '
            />
          </div>
        )}
        {step === 5 && (
          <>
            <article className='flex items-center gap-5'>
              <div className='mb-4'>
                <label
                  htmlFor='identification'
                  className='block text-md font-bold text-gray-700'
                >
                  Imágenes
                </label>
                <div className='mt-4 block  border rounded border-[#61005D] shadow-sm focus:border-[#61005D]  w-40 h-32 '>
                  <div className='absolute w-40 h-32 flex flex-col gap-3 justify-center items-center '>
                    <AiOutlineUpload className='w-7 h-7' />
                    <p className=' text-[#61005D] font-bold'>Subir imagen</p>
                  </div>
                  <input
                    type='file'
                    id='identification'
                    name='identification'
                    multiple
                    onChange={handleFileChange}
                    className='w-64 h-32 opacity-0 cursor-pointer '
                  />
                </div>
              </div>
              <div>
                {imagePreviews.length > 0 && (
                  <div className='flex gap-2'>
                    {imagePreviews.map((preview, index) => (
                      <img
                        key={index}
                        src={preview}
                        alt='Preview'
                        className='w-24 h-24 object-cover '
                      />
                    ))}
                  </div>
                )}
              </div>
            </article>
            <div className='mb-4'>
              <label
                htmlFor='code'
                className='block text-md font-bold text-gray-700'
              >
                Código
              </label>
              <input
                type='text'
                id='code'
                name='code'
                value={productData.code}
                onChange={handleChange}
                className='mt-1 block w-full border rounded border-gray-300 shadow-sm focus:border-[#61005D] focus:ring focus:ring-indigo-200 focus:ring-opacity-5 focus:outline- py-1'
              />
            </div>
          </>
        )}

        {/* Botones de navegación */}
        <div className='flex justify-between items-center mt-6'>
          {step > 1 && (
            <button
              type='button'
              onClick={() => setStep(step - 1)}
              className='flex items-center py-4 px-6 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-[#61005D] bg-white hover:bg-gray-50 focus:outline-none'
            >
              <FaArrowLeft className='mr-2' /> Anterior
            </button>
          )}
          <div>
            {step < totalSteps ? (
              <button
                type='button'
                onClick={() => setStep(step + 1)}
                disabled={!validateStep()}
                className={`p-4 flex items-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  validateStep()
                    ? 'bg-[#61005D] hover:bg-[#4A004F]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Siguiente <FaArrowRight className='ml-2' />
              </button>
            ) : (
              <button
                type='submit'
                disabled={loading || !validateStep()}
                className={`p-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading || !validateStep()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#61005D] hover:bg-[#4A004F]'
                }`}
              >
                {loading ? 'Cargando...' : 'Agregar Producto'}
              </button>
            )}
          </div>
        </div>
        {step <= totalSteps && (
          <button
            type='button'
            onClick={onCancel}
            className='p-4 border absolute bottom-10 right-10 border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none'
          >
            Cancelar
          </button>
        )}
        <div></div>
      </form>
    </div>
  );
};

AddProduct.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default AddProduct;
