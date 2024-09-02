import { FaUser, FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Upgrade() {
    const navigate = useNavigate();
  return (
    <section className="px-52 flex justify-between items-start py-40">
      <header className="w-1/2">
        <h1 className="text-4xl font-bold text-black mb-6">
          Antes de empezar, vamos a necesitar confirmar algunos de tus datos
        </h1>
      </header>

      <aside className="w-1/3">
        <ul className="space-y-6">
          <li className="flex items-start space-x-4">
            <FaUser className="text-[#61005D] text-3xl" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-semibold text-black">Datos personales</h2>
              <p className="text-gray-600">
                Para poder liberar el acceso completo a tu cuenta.
              </p>
            </div>
          </li>
          <li className="flex items-start space-x-4">
            <FaMapMarkerAlt className="text-[#61005D] text-3xl" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-semibold text-black">Dirección</h2>
              <p className="text-gray-600">
                Así podemos calcular el flete de todas tus ventas.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-4 ">
            <FaCreditCard className="text-[#61005D] text-5xl" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-semibold text-black">Datos bancarios</h2>
              <p className="text-gray-600">
                Para poder retirar el dinero de tus ventas. Recuerda que debe coincidir tu DNI registrado en tu cuenta.
              </p>
            </div>
          </li>
        </ul>
        <footer className="w-full flex justify-end mt-8">
          <button
          onClick={() => navigate('/upgrade/register')} 
          className="bg-[#61005D] text-white px-6 py-3 rounded-lg hover:bg-[#61005ee2]">
            Registrar datos
          </button>
        </footer>
      </aside>
    </section>
  );
}
