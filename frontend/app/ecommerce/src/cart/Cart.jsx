import PropTypes from 'prop-types';

export default function Cart({ cart, setOpen }) {
    console.log(cart);
    const handleCheckout = () => {
        setOpen(false);
    };

    

    return (
        <section className="p-4 w-96">
            <header className='border-b border-b-[#61005D]'>
            <h2 className="text-xl font-bold mb-4">Mi Carrito</h2>


            </header>
            {cart?.payload?.products?.length > 0 ? (
                <div className="space-y-4">
                    <div>
                    {cart.payload.products.map((product, index) => (
                        <div key={index} className="flex items-center gap-4  py-4">
                            <img src={product.product.thumbnails[0]} alt={product.title} className="w-20 h-20 object-cover" />
                            <div>
                                <h3 className="text-sm font-semibold">{product.product.title}</h3>
                                <p className="text-md font-bold text-gray-600">${product.product.price}</p>
                            </div>
                        </div>
                    ))}
                    </div>
                    <div>
                        <p>SubTotal: ${cart.payload.subtotal}</p>
                        <p>Total: ${cart.payload.total}</p>
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
                    image: PropTypes.string,
                    title: PropTypes.string,
                    price: PropTypes.number,
                })
            ),
        }),
    }).isRequired,
    setOpen: PropTypes.func.isRequired,
};
