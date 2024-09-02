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
import Chat from './chat/Chat';
import Upgrade from './users/Upgrade';
import { useAuth } from '../../common/auth/hook/useAuth';
import RegisterUserUpgrate from './users/RegisterUserUpgrate';

export default function EcommerceApp() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';
  const { decodedToken } = useAuth();
  

  return (
    <div>
      <Routes>
        <Route path='/home' element={<Navigate to='/' />} />
        <Route path='/' element={<Home />} />
      </Routes>
      {!isHomeRoute && <NavBar />}
      {!isHomeRoute && (
        <header className="w-full flex tracking-wide mt-28">
          <div className="w-2/6"></div>
          <SubNavBar />
        </header>
      )}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path='/passwordRecovery' element={<PasswordRecovery />} />
        <Route path='/resetpassword' element={<UpdatePassword />} />
        <Route path='/product/:productId' element={<ItemDetailContainer />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/purchase' element={<Purchase />} />
        <Route path='/chat' element={decodedToken ? <Chat /> : <Navigate to='/login' />}/>
        <Route path= '/upgrade' element={<Upgrade />} />
        <Route path = '/upgrade/register' element={<RegisterUserUpgrate />} />
      </Routes>
    </div>
  );
}
