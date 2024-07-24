import { GoHome } from 'react-icons/go';
import { AiOutlineProduct } from 'react-icons/ai';
import { BsBorderStyle } from 'react-icons/bs';
import { GrUserAdmin } from 'react-icons/gr';
import { HiOutlineUsers } from 'react-icons/hi2';
import { IoLogOutOutline } from 'react-icons/io5';
import { CiSettings } from "react-icons/ci";
import { IoListOutline } from "react-icons/io5";

import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../../../auth/hook/useAuth';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { to: 'dashboard', icon: <GoHome />, label: 'Panel' },
  { to: 'products', icon: <AiOutlineProduct />, label: 'Productos' },
  { to: 'categories', icon: <IoListOutline />, label: 'Categorias' },
  { to: 'orders', icon: <BsBorderStyle />, label: 'Pedidos' },
  { to: 'admins', icon: <GrUserAdmin />, label: 'Admins' },
  { to: 'users', icon: <HiOutlineUsers />, label: 'Usuarios' },
  { to: 'settings', icon: <CiSettings />, label: 'Configuraciones' },

];

export default function ListNav() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <ul className=' flex flex-col gap-3  text-[1.5rem] text-gray-600'>
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          className='flex items-center gap-2  hover:text-[#61005D] focus:text-[#61005D] focus:text-extrabold' 
        >
          {item.icon}
          {item.label}
        </NavLink>
      ))}
      <li onClick={handleLogout} className='hover:text-[#61005D] flex items-center gap-1 cursor-pointer'>
        <IoLogOutOutline /> Salir
      </li>
    </ul>
  );
}
