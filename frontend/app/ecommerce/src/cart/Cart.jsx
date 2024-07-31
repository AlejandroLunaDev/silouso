import PropTypes from 'prop-types';
import { useCart } from '../common/hook/useCart';
import { LiaTimesSolid } from 'react-icons/lia';
import QuantitySelector from '../common/components/QuantitySelector';
import { CiCircleRemove } from 'react-icons/ci';
import { formatNumber } from '../../../common/helper/formatNumeber';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete'; // Icono de tacho de basura
import { useNavigate } from 'react-router-dom';

export default function Cart({ cart, setOpen }) {
  const { deleteProduct, updateQuantityProduct, deleteAllProducts } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setOpen(false);
    navigate('/purchase');
  };

  const handleDelete = async productId => {
    await deleteProduct(productId);
  };

  const handleIncrease = async (productId, quantity) => {
    await updateQuantityProduct(productId, quantity + 1);
  };

  const handleDecrease = async (productId, quantity) => {
    if (quantity > 1) {
      await updateQuantityProduct(productId, quantity - 1);
    }
  };

  const handleClearCart = async () => {
    await deleteAllProducts(); // Llama a la función para vaciar el carrito
  };

  const descount = 0;
  const total =
    cart.payload?.products?.reduce(
      (sum, product) => sum + product.product.price * product.quantity,
      0
    ) || 0;
  const subtotal = total - descount;

  return (
    <section className='p-4 w-96'>
      <header className='flex justify-between items-center border-b border-b-[#61005D] mb-4'>
        <h2 className='text-xl font-bold'>Mi Carrito</h2>

        <button onClick={() => setOpen(false)} className='text-[#61005D]'>
          <LiaTimesSolid size={20} />
        </button>
      </header>
      {cart?.payload?.products?.length > 0 ? (
        <div className='flex flex-col'>
          <div className='max-h-[500px] overflow-y-auto'>
            {cart.payload.products.map((product, index) => (
              <div key={index} className='flex items-center gap-4 py-3'>
                <div className='relative flex'>
                  <CiCircleRemove
                    className='cursor-pointer'
                    size={25}
                    onClick={() => handleDelete(product.product._id)}
                  />
                  <img
                    src={product.product.thumbnails[0]}
                    alt={product.product.title}
                    className='w-28 h-28 object-cover'
                  />
                </div>
                <div className='ml-4 flex-1'>
                  <h3 className='text-sm font-medium'>
                    {product.product.title}
                  </h3>
                  <p className='text-md py-1 font-bold text-gray-600'>
                    ${formatNumber(product.product.price)}
                  </p>
                  <QuantitySelector
                    quantity={product.quantity}
                    onIncrease={() =>
                      handleIncrease(product.product._id, product.quantity)
                    }
                    onDecrease={() =>
                      handleDecrease(product.product._id, product.quantity)
                    }
                  />
                </div>
              </div>
            ))}
          </div>
          <article>
            <div className='mt-4 flex flex-col'>
              <div className='flex py-2 justify-between border-y'>
                <p>SubTotal:</p>
                <p>${formatNumber(subtotal)}</p>
              </div>
              <div className='flex py-2 font-bold text-gray-600 justify-between border-b'>
                <p>Total:</p>
                <p>${formatNumber(total)}</p>
              </div>
            </div>
            <div className='flex'>
              <button
                onClick={handleCheckout}
                className='w-full bg-[#61005D] text-white py-2 mt-4 rounded'
              >
                Comprar ahora
              </button>
              <div className='flex justify-end mt-4'>
                <Tooltip title='Vaciar carrito' arrow>
                  <IconButton color='error' onClick={handleClearCart}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </article>
        </div>
      ) : (
        <div className='flex items-center justify-center h-screen'>
          <p className='text-[#61005D] font-semibold'>Tu carrito está vacío.</p>
        </div>
      )}
    </section>
  );
}

Cart.propTypes = {
  cart: PropTypes.shape({
    payload: PropTypes.shape({
      products: PropTypes.arrayOf(
        PropTypes.shape({
          product: PropTypes.shape({
            thumbnails: PropTypes.arrayOf(PropTypes.string),
            title: PropTypes.string,
            price: PropTypes.number,
            _id: PropTypes.string
          }),
          quantity: PropTypes.number
        })
      )
    })
  }).isRequired,
  setOpen: PropTypes.func.isRequired
};
