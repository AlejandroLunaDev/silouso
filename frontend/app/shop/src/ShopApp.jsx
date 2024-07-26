import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './home/Home';
import Login from '../../auth/Login';
import UpdatePassword from '../../auth/components/UpdatePassword';
import PasswordRecovery from '../../auth/components/PaswwordRecovery';
import RegisterForm from '../../auth/components/RegisterForm';
import NavBar from './layout/navBar/NavBar';
import ItemDetailContainer from './product/ItemDetailContainer';

export default function ShopApp() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  return (
    <div className=''>
      <Routes>
        <Route path='/home' element={<Navigate to='/' />} />
        <Route path='/' element={<Home />} />
      </Routes>
        {!isHomeRoute && <NavBar />}
        
        <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/passwordRecovery' element={<PasswordRecovery />} />
        <Route path='/resetpassword' element={<UpdatePassword />} />
        <Route path='/product/:productId' element={<ItemDetailContainer />} />

        </Routes>
    </div>

  )
}
