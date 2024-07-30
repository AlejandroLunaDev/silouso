import AuthProvider from '../app/common/auth/context/AuthProvider';
import CartProvider from '../app/ecommerce/src/common/context/CartProvider';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </AuthProvider>
  );
}
