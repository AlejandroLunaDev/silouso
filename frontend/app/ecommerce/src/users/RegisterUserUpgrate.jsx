import { FaCheckCircle, FaTimesCircle, FaUser, FaMapMarkedAlt, FaCreditCard } from 'react-icons/fa';
import { useAuth } from '../../../common/auth/hook/useAuth';
import { useNavigate } from 'react-router-dom';

export default function RegisterUserUpgrate() {
  const { decodedToken } = useAuth();
  console.log(decodedToken.user)
  const navigate = useNavigate();

  // Datos personales (completos si todos los campos necesarios están presentes en el primer documento)
  const isPersonalDataComplete1 = decodedToken.user.documents[0];
  const isPersonalDataComplete2 = decodedToken.user.documents[1];

  // Verificación de que todos los campos necesarios están completos en el primer documento
  const isPersonalDataComplete =
    isPersonalDataComplete1 &&
    isPersonalDataComplete1.fullName &&
    isPersonalDataComplete1.dni &&
    isPersonalDataComplete1.birthDate &&
    isPersonalDataComplete1.phone &&
    // Consideramos que la referencia en el segundo documento es suficiente
    (isPersonalDataComplete1.reference || isPersonalDataComplete2?.reference);

  // Simulación del estado de cada sección
  const isAddressComplete = false;
  const isBankDataComplete = false;

  return (
    <section className="px-52 flex justify-between items-start py-40">
      <header className="w-1/2">
        <h1 className="text-4xl font-bold text-black mb-6">
          Completa tus datos para tener acceso completo a SiLoUso
        </h1>
      </header>

      <aside className="w-1/3">
        <ul className="space-y-6">
          <li className="flex items-center justify-between space-x-4">
            <button
              onClick={() => !isPersonalDataComplete && navigate('/upgrade/personalData')}
              className={`border p-8 min-w-80 flex justify-between items-center w-full ${
                isPersonalDataComplete ? 'bg-gray-200 cursor-not-allowed' : ''
              }`}
              disabled={isPersonalDataComplete}
            >
              <div className="flex items-center space-x-2">
                <FaUser className="text-black" size={24} />
                <h2 className="text-xl font-semibold text-black">Datos personales</h2>
              </div>
              {isPersonalDataComplete ? (
                <FaCheckCircle className="text-green-500" size={24} />
              ) : (
                <FaTimesCircle className="text-red-500" size={24} />
              )}
            </button>
          </li>
          <li className="flex items-center justify-between space-x-4">
            <button onClick={() => !isAddressComplete && navigate('/upgrade/AdressData')} className="border p-8 min-w-80 flex justify-between items-center w-full">
              <div className="flex items-center space-x-2">
                <FaMapMarkedAlt className="text-black" size={24} />
                <h2 className="text-xl font-semibold text-black">Dirección</h2>
              </div>
              {isAddressComplete ? (
                <FaCheckCircle className="text-green-500" size={24} />
              ) : (
                <FaTimesCircle className="text-red-500" size={24} />
              )}
            </button>
          </li>
          <li className="flex items-center justify-between space-x-4">
            <div className="border p-8 min-w-80 flex justify-between items-center w-full">
              <div className="flex items-center space-x-2">
                <FaCreditCard className="text-black" size={24} />
                <h2 className="text-xl font-semibold text-black">Datos bancarios</h2>
              </div>
              {isBankDataComplete ? (
                <FaCheckCircle className="text-green-500" size={24} />
              ) : (
                <FaTimesCircle className="text-red-500" size={24} />
              )}
            </div>
          </li>
        </ul>
        <footer className="w-full flex justify-end mt-8">
          <button
            disabled={!isPersonalDataComplete || !isAddressComplete || !isBankDataComplete}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white ${
              isPersonalDataComplete && isAddressComplete && isBankDataComplete
                ? 'bg-[#61005D] hover:bg-[#61005ee2]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isPersonalDataComplete && isAddressComplete && isBankDataComplete ? (
              <>
                <FaCheckCircle className="text-green-500" size={20} />
                <span>Finalizar</span>
              </>
            ) : (
              <>
                <FaTimesCircle className="text-red-500" size={20} />
                <span>Finalizar</span>
              </>
            )}
          </button>
        </footer>
      </aside>
    </section>
  );
}
