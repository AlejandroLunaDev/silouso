import { FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../../../common/auth/hook/useAuth';

export default function RegisterUserUpgrate() {
    const {decodedToken} = useAuth();
    console.log(decodedToken)
  return (
    <section className="px-52 flex justify-between items-start py-40">
    <header className="w-1/2">
      <h1 className="text-4xl font-bold text-black mb-6">
        Completa tus datos para tener acceso completo a SiLoUso
      </h1>
    </header>

    <aside className="w-1/3">
      <ul className="space-y-6">
        <li className="flex items-start space-x-4">
       
          <div>
            <h2 className="text-xl font-semibold text-black">Datos personales</h2> 
          </div>
        </li>
        <li className="flex items-start space-x-4">

          <div>
            <h2 className="text-xl font-semibold text-black">Dirección</h2>
          </div>
        </li>
        <li className="flex items-start gap-4 ">

          <div>
            <h2 className="text-xl font-semibold text-black">Datos bancarios</h2>
          </div>
        </li>
      </ul>
      <footer className="w-full flex justify-end mt-8">
        <button

        className="bg-[#61005D] text-white px-6 py-3 rounded-lg hover:bg-[#61005ee2]">
          Finalizar
        </button>
      </footer>
    </aside>
  </section>
  )
}
