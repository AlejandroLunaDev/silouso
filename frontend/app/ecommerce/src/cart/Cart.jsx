import PropTypes from 'prop-types';
import { useCart } from '../common/hook/useCart';
import { FaTrash } from 'react-icons/fa';
import { LiaTimesSolid } from 'react-icons/lia'; // Importa el icono de cierre
import QuantitySelector from './components/QuantitySelector'; // Asegúrate de importar el nuevo componente

export default function Cart({ cart, setOpen }) {
    const { deleteProduct, updateQuantityProduct } = useCart();

    const handleCheckout = () => {
        setOpen(false);
    };

    const handleDelete = async (productId) => {
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

    const total = cart.payload?.products?.reduce((sum, product) => sum + (product.product.price * product.quantity), 0) || 0;
    const subtotal = total;

    return (
        <section className="p-4 w-96">
            <header className='flex justify-between items-center border-b border-b-[#61005D] mb-4'>
                <h2 className="text-xl font-bold">Mi Carrito</h2>
                <button onClick={() => setOpen(false)} className="text-[#61005D]">
                    <LiaTimesSolid size={20} />
                </button>
            </header>
            {cart?.payload?.products?.length > 0 ? (
                <div className="">
                    <div className='max-h-[300px] overflow-y-auto'>
                        {cart.payload.products.map((product, index) => (
                            <div key={index} className="flex items-center gap-4 py-3">
                                <div className='relative'>
                                    <img src={product.product.thumbnails[0]} alt={product.product.title} className="w-28 h-28 object-cover" />
                                    <FaTrash
                                        className='text-red-600 cursor-pointer absolute top-0 left-0 m-2'
                                        size={20}
                                        onClick={() => handleDelete(product.product._id)}
                                    />
                                </div>
                                <div className="ml-4 flex-1">
                                    <h3 className="text-sm font-medium">{product.product.title}</h3>
                                    <p className="text-md font-bold text-gray-600">${product.product.price}</p>
                   
                                    <QuantitySelector
                                        quantity={product.quantity}
                                        onIncrease={() => handleIncrease(product.product._id, product.quantity)}
                                        onDecrease={() => handleDecrease(product.product._id, product.quantity)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <p>SubTotal: ${subtotal}</p>
                        <p>Total: ${total}</p>
                    </div>
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-[#61005D] text-white py-2 mt-4 rounded"
                    >
                        Proceder al Checkout
                    </button>
                </div>
            ) : (
                <p>Tu carrito está vacío.</p>
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
                        _id: PropTypes.string,
                    }),
                    quantity: PropTypes.number,
                })
            ),
        }),
    }).isRequired,
    setOpen: PropTypes.func.isRequired,
};
