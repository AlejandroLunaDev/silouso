/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

//ICONS
import { MdModeEditOutline } from 'react-icons/md';
import { PiTrashLight } from 'react-icons/pi';
import { IoAdd } from 'react-icons/io5';

import { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../../../common/services/products';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [sortBy, setSortBy] = useState('createdAt');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editingProductId, setEditingProductId] = useState(null);
  const [addingProduct, setAddingProduct] = useState(false); // Estado para controlar la adición de producto

  useEffect(() => {
    fetchProducts();
  }, [sortOrder, sortBy, currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts(currentPage, 10, sortOrder, sortBy);
      if (response) {
        setProducts(response.products);
        setTotalPages(response.totalPages);
      } else {
        console.error('No se recibieron datos válidos.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const mostrarAlerta = (message, color) => {
    Toastify({
      text: message,
      gravity: 'bottom',
      duration: 2000,
      style: {
        background: color
      }
    }).showToast();
  };

  const handleDeleteProduct = async productId => {
    try {
      await deleteProduct(productId);
      setProducts(products.filter(product => product._id !== productId));
      mostrarAlerta('Producto Eliminado', 'red');
    } catch (error) {
      console.error('Error deleting product:', error);
      mostrarAlerta('Error al eliminar el producto', 'red');
    }
  };

  const handleEditProduct = productId => {
    setEditingProductId(productId);
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
  };

  const handleSaveEdit = () => {
    setEditingProductId(null);
    fetchProducts();
  };

  const handleChangeSortOrder = e => {
    const newSortOrder = e.target.value;
    setSortOrder(newSortOrder);
  };

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
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
          className={`mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md ${
            currentPage === i
              ? 'bg-[#61005D] text-white'
              : 'bg-white text-black'
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className='container mx-auto mt-8 px-4 py-4'>
      {addingProduct ? (
        <AddProduct
          onAdd={() => setAddingProduct(false)}
          onCancel={() => setAddingProduct(false)}
        />
      ) : editingProductId ? (
        <EditProduct
          productId={editingProductId}
          onCancel={handleCancelEdit}
          onSave={handleSaveEdit}
        />
      ) : (
        <>
          <header>
            <h1 className='text-3xl font-extrabold text-gray-800 mb-6'>
              Lista de Productos
            </h1>
          </header>
          <div className='px-4 flex  items-center justify-between '>
            <div className='flex justify-end mb-4'>
              <button
                onClick={() => setAddingProduct(true)} // Botón para añadir producto
                className='bg-[#61005D] text-white py-2 px-4 rounded-md flex items-center gap-2'
              >
                <IoAdd size={20} />
                Agregar Producto
              </button>
            </div>
            <div className='flex justify-center my-5'>
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                className='mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md bg-white text-black'
              >
                &laquo;
              </button>
              {renderPageNumbers()}
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                className='mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md bg-white text-black'
              >
                &raquo;
              </button>
            </div>
            <div className='flex items-center gap-3'>
              <label htmlFor='sortSelect'>Ordenado por:</label>
              <select
                id='sortSelect'
                value={sortOrder}
                onChange={handleChangeSortOrder}
                className=' border p-1 rounded-xl'
              >
                <option value='desc'>Más caro</option>
                <option value='asc'>Más barato </option>
                <option value='created_at'>Fecha más antigua</option>
                <option value='updated_at'>Fecha más reciente</option>
              </select>
            </div>
          </div>

          <table className='min-w-full bg-white shadow-md rounded-lg border border-gray-200'>
            <thead>
              <tr>
                <th className='border border-gray-300 px-4 py-2'>ID</th>
                <th className='border border-gray-300 px-4 py-2'>Imagen</th>
                <th className='border border-gray-300 px-4 py-2'>Título</th>
                <th className='border border-gray-300 px-4 py-2'>Precio</th>
                <th className='border border-gray-300 px-4 py-2'>Stock</th>
                <th className='border border-gray-300 px-4 py-2'>Categoría</th>
                <th className='border border-gray-300 px-4 py-2'>Fecha</th>
                <th className='border border-gray-300 px-4 py-2'>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td className='border border-gray-300 px-4 py-2'>
                    {product._id}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    <img
                      src={product.thumbnails[0]}
                      alt={product.title}
                      className='w-16 h-16'
                    />
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {product.title}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    ${product.price}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {product.stock}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {product.category.name}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    {new Date(product.created_at).toLocaleDateString()}
                  </td>
                  <td className='border border-gray-300 px-4 py-2'>
                    <div className='flex justify-center items-center gap-4'>
                      <button
                        onClick={() => handleEditProduct(product._id)}
                        className='hover:bg-gray-200 border-blue-500 px-4 py-2 border flex flex-col justify-center items-center text-blue-500 rounded'
                      >
                        <MdModeEditOutline />
                      </button>
                      <button
                        className='hover:scale-110 border-red-600 px-4 py-2 border flex flex-col justify-center items-center text-red-600 rounded'
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <PiTrashLight />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='flex justify-center my-5'>
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              className='mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md bg-white text-black'
            >
              &laquo;
            </button>
            {renderPageNumbers()}
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              className='mx-1 w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md bg-white text-black'
            >
              &raquo;
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Products;
