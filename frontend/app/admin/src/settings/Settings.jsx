import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getProducts } from '../../../services/products';

export default function Settings() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    const savedProduct = JSON.parse(localStorage.getItem('selectedProduct'));
    if (savedProduct) {
      setSelectedProduct(savedProduct);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      if (response) {
        setProducts(response.products);
      } else {
        console.error('No se recibieron datos válidos.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSelectProduct = (selectedOption) => {
    const product = products.find(p => p._id === selectedOption.value);
    setSelectedProduct(product);
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  };

  const handleRemoveProduct = () => {
    setSelectedProduct(null);
    localStorage.removeItem('selectedProduct');
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
