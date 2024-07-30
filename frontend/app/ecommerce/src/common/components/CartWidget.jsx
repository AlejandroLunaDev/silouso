import { TiShoppingCart } from 'react-icons/ti';
import { useCart } from '../hook/useCart';
import { Drawer } from '@mui/material';
import { useState } from 'react';
import Cart from '../../cart/Cart';

export default function CartWidget() {
    const { cart, loading } = useCart();
    const [open, setOpen] = useState(false);
    const isHomePage = location.pathname === '/';
    const textColor = isHomePage ? 'text-white' : 'text-[#61005D]';

    if (loading) return <p>Loading...</p>;

    const productsCount = cart?.payload?.products?.length || 0;

    return (
        <div className='flex gap-1'>
            <button onClick={() => setOpen(true)}>
                <TiShoppingCart className={`	text-3xl cursor-pointer ${textColor}`} />
            </button>
            {productsCount > 0 && (
                <div className='bg-[#61005D] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs'>
                    {productsCount}
                </div>
            )}
            <Drawer
                style={{ zIndex: 999 }}
                open={open}
                anchor="right"
                onClose={() => setOpen(false)}
            >
                <Cart cart={cart} setOpen={setOpen} />
            </Drawer>
        </div>
    );
}
