import { NavLink } from "react-router-dom";


const navItems = [
    { to: '/', label: 'Inicio' },  
    { to: 'shop',label: 'Productos' },
    { to: 'chat', label: 'Chat' },
  ];
export default function NavList() {

  const isHomePage = location.pathname === '/';
  const textColor = isHomePage ? 'text-white' : 'text-[#61005D]';
  return (
    <ul className="flex gap-6 font-semibold">
      {navItems.map((item, index) => (
        <li key={index}>
          <NavLink to={item.to} className={`hover:text-[#61005D] ${textColor}`} >{item.label}</NavLink>
        </li>
      ))}
    </ul>
  )
}
