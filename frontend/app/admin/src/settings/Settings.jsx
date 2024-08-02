import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getProducts, updateProduct } from '../../../common/services/products';

export default function Settings() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      if (response) {
        const allProducts = response.products;
        setProducts(allProducts);

        const promotedProduct = allProducts.find(p => p.isPromoted);
        setSelectedProduct(promotedProduct || null);
      } else {
        console.error('No se recibieron datos válidos.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSelectProduct = async (selectedOption) => {
    const product = products.find(p => p._id === selectedOption.value);
  
    try {
      // Si hay un producto seleccionado actualmente, revertir su estado de promoción
      if (selectedProduct) {
        const formData = new FormData();
        formData.append('title', selectedProduct.title);
        formData.append('description', selectedProduct.description);
        formData.append('price', selectedProduct.price);
        formData.append('stock', selectedProduct.stock);
        formData.append('category', selectedProduct.category._id); // Asegurarse de que category sea una cadena
        formData.append('isPromoted', JSON.stringify(false));
        
        // Agregar thumbnails
        selectedProduct.thumbnails.forEach((thumbnail, index) => {
          formData.append(`thumbnails[${index}]`, thumbnail);
        });
  
        await updateProduct(selectedProduct._id, formData);
      }
  
      // Actualizar el nuevo producto seleccionado para poner isPromoted en true
      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('stock', product.stock);
      formData.append('category', product.category._id); // Asegurarse de que category sea una cadena
      formData.append('isPromoted', JSON.stringify(true));
      
      // Agregar thumbnails
      product.thumbnails.forEach((thumbnail, index) => {
        formData.append(`thumbnails[${index}]`, thumbnail);
      });
  
      await updateProduct(product._id, formData);
  
      // Actualizar el estado con el nuevo producto promocionado
      setSelectedProduct(product);
      fetchProducts(); // Refrescar la lista de productos
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleRemoveProduct = async () => {
    if (selectedProduct) {
      try {
        const formData = new FormData();
        formData.append('title', selectedProduct.title);
        formData.append('description', selectedProduct.description);
        formData.append('price', selectedProduct.price);
        formData.append('stock', selectedProduct.stock);
        formData.append('category', selectedProduct.category._id); // Asegurarse de que category sea una cadena
        formData.append('isPromoted', JSON.stringify(false));

        // Agregar thumbnails
        selectedProduct.thumbnails.forEach((thumbnail, index) => {
          formData.append(`thumbnails[${index}]`, thumbnail);
        });

        await updateProduct(selectedProduct._id, formData);

        setSelectedProduct(null);
        fetchProducts();
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
  };

  const options = products.map(product => ({
    value: product._id,
    label: (
      <div className="flex items-center">
        <img src={product.thumbnails[0]} alt={product.title} className="w-8 h-8 object-cover inline-block mr-2" />
        {product.title}
      </div>
    )
  }));

  return (
    <div className="h-dvh p-4">
      <header className='mb-4'>
        <h1 className="text-2xl font-semibold">Configuración de producto Promocional</h1>
        <p className="text-gray-700 italic py-4 ">Selecciona un producto para promocionar en el destaque de la primera página.</p>
      </header>
      <div className="relative mb-4">
        <Select
          options={options}
          onChange={handleSelectProduct}
          placeholder="Selecciona un producto"
          formatOptionLabel={({ label }) => label}
          className="w-full"
        />
      </div>

      {selectedProduct && (
        <div className="flex items-center p-4 border border-gray-300 rounded-lg">
          <img src={selectedProduct.thumbnails[0]} alt={selectedProduct.title} className="w-32 h-32 object-cover mr-4" />
          <div>
            <h3 className="text-xl font-semibold">{selectedProduct.title}</h3>
            <p className="text-gray-700">Precio: ${selectedProduct.price}</p>
            <p className="text-gray-700">Descripción: {selectedProduct.description}</p>
            <p className="text-gray-700">Stock: {selectedProduct.stock}</p>
            <button
              onClick={handleRemoveProduct}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg"
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
