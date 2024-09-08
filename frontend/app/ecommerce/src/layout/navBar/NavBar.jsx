import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartWidget from '../../common/components/CartWidget';
import User from '../../common/components/User';
import { FaSearch } from 'react-icons/fa';
import { getProducts } from '../../../../common/services/products';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../../../common/auth/hook/useAuth';

export default function NavBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { decodedToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        if (response && response.products) {
          setProducts(response.products);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products
        .filter(product =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5); // Limitar a 5 productos
      setFilteredProducts(filtered);
      setShowDropdown(true);
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
  }, [searchTerm, products]);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const handleProductClick = productId => {
    navigate(`/product/${productId}`);
    setSearchTerm('');
    setShowDropdown(false);
  };

  const handleSellerClick = () => {
    
    if (!decodedToken) {
      navigate('/login');
    } else if (decodedToken.user.role !== 'premium') {
      navigate('/upgrade');
    } else {
      navigate('/addProduct');
    }
  };

  return (
    <nav className='border-[#61005D] border-b-[1px] w-full flex justify-between items-center px-6 shadow-lg z-10 h-24 fixed top-0 bg-white'>
      <NavLink to='/'>
        <figure>
          <img src='/brand.svg' alt='silouso-brand' className='h-20' />
        </figure>
      </NavLink>
      <div className='relative flex items-center w-full max-w-[600px]'>
        <input
          type='text'
          placeholder='Buscar...'
          value={searchTerm}
          onChange={handleSearchChange}
          className='border border-gray-300 rounded-md py-2 px-4 flex-1 focus:outline-none focus:ring-1 focus:ring-[#61005D] focus:border-transparent '
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 100)} // Retardo para el clic en el dropdown
        />
        <div className=' text-[#61005D] absolute right-0 pr-2  flex items-center'>
          <FaSearch />
        </div>
        {showDropdown && filteredProducts.length > 0 && (
          <div className='absolute top-full left-0  w-full bg-white  rounded-md shadow-lg z-20'>
            <ul className='max-h-60 overflow-y-auto no-scrollbar'>
              {filteredProducts.map(product => (
                <li
                  key={product._id}
                  onClick={() => handleProductClick(product._id)}
                  className='flex items-center p-2 cursor-pointer hover:bg-gray-100'
                >
                  <img
                    src={product.thumbnails[0]}
                    alt={product.title}
                    className='w-8 h-8 object-cover mr-2'
                  />
                  <span>{product.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className=''>
        <CartWidget />
      </div>
      <div className='flex gap-10'>
        <User />
        <button
          onClick={handleSellerClick}
          className='bg-[#61005D] text-white rounded px-4 py- hover:bg-[#61005ee2]'
        >
          Quiero vender
        </button>
      </div>
    </nav>
  );
}
