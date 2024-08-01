import AuthProvider from '../app/common/auth/context/AuthProvider';
import CartProvider from '../app/ecommerce/src/common/context/CartProvider';
import { FilterProvider } from '../app/ecommerce/src/common/context/FilterProvider';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <AuthProvider>
      <FilterProvider>
        <CartProvider>
          <AppRoutes />
        </CartProvider>
      </FilterProvider>
    </AuthProvider>
  );
}
