import CartWidget from "../../common/components/CartWidget";
import User from "../../common/components/User";
import { NavLink } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'; // Importa el ícono de lupa

export default function NavBar() {
  return (
    <nav className='border-[#61005D] border-b-[1px] w-full flex justify-between items-center px-6 shadow-lg z-10 h-24 fixed top-0 bg-white'>
      <NavLink to="/">
        <figure>
          <img src="/brand.svg" alt="silouso-brand" className="h-20" />
        </figure>
      </NavLink>
      <div className="flex items-center relative
      ">
        <input 
          type="text" 
          placeholder="Buscar..." 
          className="border border-gray-300 rounded-md py-2 px-4 w-[600px] focus:outline-none focus:ring-2 focus:ring-[#61005D] focus:border-transparent "
        />
        <button className="bg-[#61005D] text-white rounded-r-md py-3 absolute right-0 px-4 flex items-center">
          <FaSearch />
        </button>
      </div>
      <div className="">
        <CartWidget />
      </div>
      <User />
    </nav>
  );
}