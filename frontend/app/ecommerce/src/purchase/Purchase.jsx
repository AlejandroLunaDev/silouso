/* eslint-disable no-unused-vars */
import { useCart } from '../common/hook/useCart';
import { AiOutlineClose } from 'react-icons/ai';
import QuantitySelector from '../common/components/QuantitySelector'; // Asegúrate de que la ruta sea correcta
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { formatNumber } from '../../../common/helper/formatNumeber';
import { useEffect, useState } from 'react';

export default function Purchase() {
  const { cart, deleteProduct, purchaseCart, updateQuantityProduct } =
    useCart();
  const [subtotal, setSubtotal] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      cart &&
      cart.payload &&
      cart.payload.products &&
      cart.payload.products.length > 0
    ) {
      const calculatedSubtotal = cart.payload.products.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
      setSubtotal(calculatedSubtotal);
      const calculatedTotal = calculatedSubtotal - descuento;
      setTotal(calculatedTotal);
    }
  }, [cart, descuento]);

  const handleRemoveItem = id => {
    deleteProduct(id);
  };

  const handleIncrease = async (productId, quantity) => {
    await updateQuantityProduct(productId, quantity + 1);
  };

  const handleDecrease = async (productId, quantity) => {
    if (quantity > 1) {
      await updateQuantityProduct(productId, quantity - 1);
    }
  };

  const handlePurchase = async () => {
    try {
      await purchaseCart();

      Swal.fire({
        title: 'Compra finalizada',
        text: '¡Gracias por su compra!',
        icon: 'success',
        imageUrl: '/brand.svg',
        imageWidth: 200,
        imageHeight: 200,
        imageAlt: 'Logo'
      }).then(() => {
        navigate('/shop');
      });
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al procesar su compra. Por favor, intente nuevamente.',
        icon: 'error'
      });
    }
  };

  if (!cart || !cart.payload) {
    return <div>Loading...</div>;
  }

  return (
    <section className='p-4 w-full max-w-[1200px] mx-auto mt-[100px]'>
      <header className='flex justify-between items-center border-b border-[#61005D] pb-4 mb-6'>
        <h3 className='text-2xl font-bold'>Mi Carrito</h3>
      </header>
      {cart.payload.products.length > 0 ? (
        <div className='flex flex-col md:flex-row gap-8'>
          <div className='flex-1'>
            <table className='w-full border border-[#61005D] rounded-lg overflow-hidden'>
              <thead className='bg-[#61005D] text-white'>
                <tr>
                  <th className='py-3 px-4'>Imagen</th>
                  <th className='py-3 px-4'>Producto</th>
                  <th className='py-3 px-4'>Precio</th>
                  <th className='py-3 px-4'>Cantidad</th>
                  <th className='py-3 px-4'>Total</th>
                  <th className='py-3 px-4'>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {cart.payload.products.map(item => (
                  <tr
                    key={item.product._id}
                    className='border-b hover:bg-gray-100'
                  >
                    <td className='py-2 px-4'>
                      <img
                        className='w-24 h-24 object-cover rounded'
                        src={item.product.thumbnails[0]}
                        alt={item.product.title}
                      />
                    </td>
                    <td className='py-2 px-4 text-center'>
                      {item.product.title}
                    </td>
                    <td className='py-2 px-4 text-center'>
                      ${formatNumber(item.product.price)}
                    </td>
                    <td className='py-2 px-4 text-center'>
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() =>
                          handleIncrease(item.product._id, item.quantity)
                        }
                        onDecrease={() =>
                          handleDecrease(item.product._id, item.quantity)
                        }
                      />
                    </td>
                    <td className='py-2 px-4 text-center'>
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                    <td className='py-2 px-4 text-center'>
                      <button
                        className='text-red-500 hover:text-red-700'
                        onClick={() => handleRemoveItem(item.product._id)}
                      >
                        <AiOutlineClose size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <aside className='md:w-1/3 bg-gray-50 p-4 rounded-lg shadow-lg'>
            <h1 className='text-xl font-semibold mb-4'>Resumen de compra</h1>
            <div className='flex justify-between mb-2'>
              <p>Subtotal</p>
              <span>${formatNumber(subtotal)}</span>
            </div>
            <div className='flex justify-between mb-2'>
              <p>Descuentos</p>
              <span>-${formatNumber(descuento)}</span>
            </div>
            <div className='flex justify-between font-bold mb-4'>
              <p>Total</p>
              <span>${formatNumber(total)}</span>
            </div>
            <button
              onClick={handlePurchase}
              className='w-full bg-[#61005D] text-white py-2 rounded-lg'
            >
              Comprar ahora
            </button>
          </aside>
        </div>
      ) : (
        <section className='flex justify-center items-center flex-col h-full'>
          <p className='text-center my-4 text-lg font-semibold'>
            Tu carrito se encuentra vacío.
          </p>
        </section>
      )}
    </section>
  );
}
