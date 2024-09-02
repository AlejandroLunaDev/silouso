
import User from "../../common/components/User";
import { NavLink } from "react-router-dom";

import NavList from "../../common/components/NavList";
import CartWidget from "../../common/components/CartWidget";

export default function NavBarHome() {
  return (
    <nav className='border-[#61005D] border-b-[1px] w-full flex justify-between items-center px-6 shadow-lg z-10 bg-[#000000a4] h-24   fixed top-0'>
      <NavLink to="/" >
        <figure>
          <img src="/silouso.svg" alt="silouso-brand" className="h-20" />
        </figure>
      </NavLink>
      <div className="uppercase">
        <NavList />
      </div>
      <div>
        <CartWidget />
      </div>
        <User />
    </nav>
  );
}
