import { NavLink } from 'react-router-dom';
import CategoryNav from './CategoryNav';
import { useState } from 'react';

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: 'shop', label: 'Productos' },
  { to: 'chat', label: 'Chat' }
];

export default function SubNavList() {
  const [showCategoryNav, setShowCategoryNav] = useState(false);

  return (
    <div className='relative'>
      <ul className='flex gap-10 px-5 font-semibold'>
        {navItems.map((item, index) => (
          <li
            key={index}
            onMouseEnter={() =>
              item.label === 'Productos' && setShowCategoryNav(true)
            }
            onClick={() => setShowCategoryNav(false)}
          >
            <NavLink
              to={item.to}
              className='text-white hover:text-[#772074] uppercase'
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      {showCategoryNav && (
        <div onMouseLeave={() => setShowCategoryNav(false)}>
          <CategoryNav />
        </div>
      )}
    </div>
  );
}
