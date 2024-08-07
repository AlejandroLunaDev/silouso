import { useState, useEffect } from "react";
import { useAuth } from "../../../../common/auth/hook/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

export default function User() {
  const { decodedToken, logout } = useAuth();
  const [user, setUser] = useState(null); // Estado local para el usuario
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook para redirección
  const location = useLocation(); // Hook para obtener la ruta actual

  useEffect(() => {
    if (decodedToken && decodedToken.user) {
      setUser(decodedToken.user); // Guardar el usuario en el estado local
    }
    else{
      setUser(null)}
  }, [decodedToken]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setIsMenuOpen(false);
      navigate('/login'); 
      window.location.reload(); 
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      toggleMenu();
    }
  };

  // Determina el color del texto según la ruta actual
  const isHomePage = location.pathname === '/';
  const textColor = isHomePage ? 'text-white' : 'text-[#61005D]';

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className="flex items-center space-x-2 cursor-pointer"
      >
        {user ? (
          <>
            <img
              src={user.thumbnail}
              alt="User Avatar"
              className="w-10 h-10 rounded-full border border-gray-300"
            />
            <span className={textColor}>{user.first_name}</span>
          </>
        ) : (
          <span className={textColor}>Login</span>
        )}
      </div>
      {isMenuOpen && user && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg"
          onClick={() => setIsMenuOpen(false)}
        >
          <button
            onClick={handleLogout}
            className="block w-full px-4 py-2 text-left hover:bg-gray-200"
          >
            Salir
          </button>
        </div>
      )}
    </div>
  );
}
