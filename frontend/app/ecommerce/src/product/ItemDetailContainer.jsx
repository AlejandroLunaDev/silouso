import { useParams } from 'react-router-dom';
import { getProductById } from '../../../common/services/products';
import { useEffect, useState } from 'react';
import ItemDetail from './components/ItemDetail';


export default function ItemDetailContainer() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId);
        if (response && response.payload) {
          setProduct(response.payload); 
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="w-full h-dvh   ">

      <ItemDetail product={product} />
    </div>
  );
}
