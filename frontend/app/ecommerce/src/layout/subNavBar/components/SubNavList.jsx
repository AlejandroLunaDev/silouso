import { NavLink } from "react-router-dom";


const navItems = [
    { to: '/', label: 'Inicio' },  
    { to: 'shop',label: 'Productos' },
    { to: 'chat', label: 'Chat' },
  ];
export default function SubNavList() {


  return (
    <ul className="flex gap-10 px-5 font-semibold">
      {navItems.map((item, index) => (
        <li key={index}>
          <NavLink to={item.to} className='text-white hover:text-[#772074] uppercase' >{item.label}</NavLink>
        </li>
      ))}
    </ul>
  )
}
