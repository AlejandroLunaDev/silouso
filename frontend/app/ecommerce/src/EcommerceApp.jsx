import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

import Home from './home/Home';
import Login from '../../common/auth/Login';
import UpdatePassword from '../../common/auth/components/UpdatePassword';
import PasswordRecovery from '../../common/auth/components/PaswwordRecovery';
import RegisterForm from '../../common/auth/components/RegisterForm';
import NavBar from './layout/navBar/NavBar';
import ItemDetailContainer from './product/ItemDetailContainer';
import Shop from './shop/Shop';
import Purchase from './purchase/Purchase';
import SubNavBar from './layout/subNavBar/SubNavBar';

export default function EcommerceApp() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  return (
    <div className=''>
      <Routes>
        <Route path='/home' element={<Navigate to='/' />} />
        <Route path='/' element={<Home />} />
      </Routes>
        {!isHomeRoute && <NavBar />}
        <header className="w-full flex tracking-wide mt-28   ">
        <div className="w-1/6">
        </div>
        <SubNavBar/>
        </header>
        <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/passwordRecovery' element={<PasswordRecovery />} />
        <Route path='/resetpassword' element={<UpdatePassword />} />
        <Route path='/product/:productId' element={<ItemDetailContainer />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/purchase' element={<Purchase />} />

        </Routes>
    </div>

  )
}
