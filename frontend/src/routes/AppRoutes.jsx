import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminApp from '../../app/admin/src/AdminApp';
import EcommerceApp from '../../app/ecommerce/src/EcommerceApp';
import ProtectedRoutes from './ProtectedRoutes';
import { useAuth } from '../../app/common/auth/hook/useAuth';
import { useState, useEffect } from 'react';

export default function AppRoutes() {
  const { decodedToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('guest');

  useEffect(() => {
    if (decodedToken) {
      setUserRole(decodedToken.user?.role || 'guest');
    } else {
      setUserRole('guest');
    }
    setIsLoading(false);
  }, [decodedToken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // No necesita redirigir a /admin si el rol es admin
  const renderAdminRoutes = userRole === 'admin';
  const renderEcommerceRoutes = userRole !== 'admin';

  return (
    <BrowserRouter>
      <Routes>
        {renderAdminRoutes && (
          <Route 
            path='/admin/*' 
            element={
              <ProtectedRoutes role={userRole} allowedRole="admin">
                <AdminApp />
              </ProtectedRoutes>
            } 
          />
        )}
        {renderEcommerceRoutes && (
          <Route 
            path='/*' 
            element={
              <ProtectedRoutes role={userRole} allowedRole={`${userRole}`}>
                <EcommerceApp />
              </ProtectedRoutes>
            } 
          />
        )}
      </Routes>
    </BrowserRouter>
  );
}
