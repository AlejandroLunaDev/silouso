/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { useAuth } from '../../../../common/auth/hook/useAuth'; // Ajusta la ruta según tu estructura
import { getCartById,addToCart,deleteProductCart,updateQuantity } from '../../services/cart';

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const { decodedToken } = useAuth(); 
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        if (decodedToken && decodedToken.user && decodedToken.user.cartId) {
            getCart(decodedToken.user.cartId);
        }
    }, [decodedToken]);

    const getCart = async (cartId) => {
        try {
            const cartData = await getCartById(cartId);
            setCart(cartData);
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
        } finally {
            setLoading(false); // Cambia el estado de carga
        }
    };

    const addProductToCart = async (productId) => {
        try {
            await addToCart(decodedToken.user.cartId, productId);
       
            await getCart(decodedToken.user.cartId);
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await deleteProductCart(decodedToken.user.cartId, productId);

            await getCart(decodedToken.user.cartId);
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    const updateQuantityProduct = async (productId, quantity) => {
        try {
            await updateQuantity(decodedToken.user.cartId, productId, quantity);
            await getCart(decodedToken.user.cartId);
        } catch (error) {
            console.error('Error al actualizar la cantidad del producto:', error);
        }
    };
    

    return (
        <CartContext.Provider value={{ cart, getCart, loading, addProductToCart,deleteProduct,updateQuantityProduct }}>
            {children}
        </CartContext.Provider>
    );
}
