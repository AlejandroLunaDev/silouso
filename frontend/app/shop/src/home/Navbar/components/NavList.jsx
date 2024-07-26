import { NavLink } from "react-router-dom";


const navItems = [
    { to: '/', label: 'Inicio' },  
    { to: 'tienda',label: 'Productos' },
    { to: 'chat', label: 'Chat' },
  ];
export default function NavList() {
  return (
    <ul className="flex gap-6 font-semibold">
      {navItems.map((item, index) => (
        <li key={index}>
          <NavLink to={item.to} className="text-white uppercase hover:text-[#df53da]" >{item.label}</NavLink>
        </li>
      ))}
    </ul>
  )
}
