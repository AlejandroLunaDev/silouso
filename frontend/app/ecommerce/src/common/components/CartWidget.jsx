import { TiShoppingCart } from 'react-icons/ti';
import { useCart } from '../hook/useCart';
import { Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import Cart from '../../cart/Cart';
import { ThreeDots } from 'react-loader-spinner'; // Importa el spinner que prefieras

export default function CartWidget() {
    const { cart, loading } = useCart();
    const [open, setOpen] = useState(false);
    const [isCartUpdated, setIsCartUpdated] = useState(false); 
    const isHomePage = location.pathname === '/';
    const textColor = isHomePage ? 'text-white' : 'text-[#61005D]';
 
    useEffect(() => {
        if (isCartUpdated) {
            setOpen(true);
            setIsCartUpdated(false); // Resetear el estado después de actualizar
        }
    }, [cart, isCartUpdated]);
    
    if (cart === null) {
        return null;
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <ThreeDots 
                    height="50" 
                    width="50" 
                    radius="9"
                    color="#61005D" 
                    ariaLabel="three-dots-loading"
                    visible={true}
                />
            </div>
        );
    }

    const productsCount = cart?.payload?.products?.length || 0;

    return (
        <div className='flex gap-1'>
            <button onClick={() => setOpen(true)}>
                <TiShoppingCart className={`text-3xl cursor-pointer ${textColor}`} />
            </button>
            <div className='bg-[#61005D] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs'>
                {productsCount}
            </div>
            <Drawer
                style={{ zIndex: 999 }}
                open={open}
                anchor="right"
                onClose={() => setOpen(false)}
            >
                <Cart cart={cart} setOpen={setOpen} setIsCartUpdated={setIsCartUpdated} />
            </Drawer>
        </div>
    );
}
