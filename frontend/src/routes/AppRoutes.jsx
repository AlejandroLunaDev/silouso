import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminApp from '../../app/admin/src/AdminApp';
import EcommerceApp from '../../app/ecommerce/src/EcommerceApp';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/*' element={<AdminApp />} />
        <Route path='/*' element={<EcommerceApp />} />
        {/* Otras rutas principales aquí */}
      </Routes>
    </BrowserRouter>
  );
}
