/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ role, allowedRole, children }) => {
  if (role === 'guest' && allowedRole === 'admin') {
    // Redirigir a la página de inicio si el usuario es un invitado y está intentando acceder a la ruta admin
    return <Navigate to="/" replace />;
  }

  if (role !== allowedRole) {
    // Redirigir a la página de admin si el rol requerido es admin y el usuario no tiene el rol adecuado
    if (allowedRole === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoutes;
