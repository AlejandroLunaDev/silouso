import ListNav from "./components/ListNav";
import { Outlet } from "react-router-dom";


export default function Navbar() {
  return (
    <>
    
    <nav className=" h-dvh w-80 border border-[#61005D] p-4">
        <header>
          <figure className="flex items-center justify-center">

            <img src="/brand.svg" alt="silouso-brand" />
          </figure>
            <h1 className="text-xl font-semibold text-gray-800">Bienvenido Admin!</h1>
        </header>
        <div className="mt-8">
            <ListNav />
        </div>
    </nav>
    <Outlet />
    </>
  )
}
