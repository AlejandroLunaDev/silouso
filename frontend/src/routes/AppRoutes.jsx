import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminApp from '../../app/admin/src/AdminApp';
import EcommerceApp from '../../app/ecommerce/src/EcommerceApp';
import ProtectedRoutes from './ProtectedRoutes';
import { useAuth } from '../../app/common/auth/hook/useAuth';
import { useState, useEffect } from 'react';

export default function AppRoutes() {
  const { decodedToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('guest'); // Estado para el rol del usuario

  useEffect(() => {
    // Simular la carga del token
    if (decodedToken) {
      setUserRole(decodedToken.user?.role || 'guest');
    } else {
      setUserRole('guest');
    }
    setIsLoading(false);
  }, [decodedToken]);

  if (isLoading) {
    // Puedes mostrar un spinner o un componente de carga aquí si lo deseas
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta protegida para Admin */}
        <Route 
          path='/admin/*' 
          element={
            <ProtectedRoutes role={userRole} allowedRole="admin">
              <AdminApp />
            </ProtectedRoutes>
          } 
        />
        {/* Ruta accesible para usuarios y visitantes */}
        <Route 
          path='/*' 
          element={
            <ProtectedRoutes role={userRole} allowedRole={`${userRole}`}>
              <EcommerceApp />
            </ProtectedRoutes>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
