import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AdminApp from '../../app/admin/src/AdminApp';
import ShopApp from '../../app/shop/src/ShopApp';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/admin/*' element={<AdminApp />} />
        <Route path='/*' element={<ShopApp />} />
        {/* Otras rutas principales aquí */}
      </Routes>
    </BrowserRouter>
  );
}
