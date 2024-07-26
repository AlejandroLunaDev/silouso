import User from "./components/User";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className='border-[#61005D] border-b-[1px] w-full flex justify-between items-center px-6 shadow-lg z-10  h-24 fixed top-0 bg-white'>
      <NavLink to="/" >
        <figure>
          <img src="/brand.svg" alt="silouso-brand" className="h-20" />
        </figure>
      </NavLink>
      <NavLink to="/login">
        <User />
      </NavLink>
    </nav>
  );
}
