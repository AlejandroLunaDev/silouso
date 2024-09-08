import { FaCheckCircle, FaTimesCircle, FaUser, FaMapMarkedAlt, FaCreditCard } from 'react-icons/fa';
import { useAuth } from '../../../common/auth/hook/useAuth';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { updateUserRole } from '../../../common/services/users';
import { useState } from 'react';

export default function RegisterUserUpgrade() {
  const { decodedToken } = useAuth();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // Obtener el userId y los documentos directamente del array
  const userId = decodedToken.user.id;
  const [addressData, personalData] = decodedToken.user.documents;

  // Verificación de que todos los campos necesarios están completos en los documentos
  const isPersonalDataComplete =
    personalData &&
    personalData.fullName &&
    personalData.dni &&
    personalData.birthDate &&
    personalData.phone &&
    personalData.reference &&
    personalData.reference.dniBack &&
    personalData.reference.dniFront;

  const isAddressComplete =
    addressData &&
    addressData.address &&
    addressData.city &&
    addressData.neighborhood &&
    addressData.postalCode &&
    addressData.province;

  // Datos bancarios (desactivado por ahora)
  const isBankDataComplete = false; // Por ahora, siempre está incompleto

  // El botón de finalizar estará habilitado si ambos datos personales y dirección están completos
  const isFinalizingEnabled = isPersonalDataComplete && isAddressComplete;

  const handleFinalize = async () => {
    if (!isFinalizingEnabled) return;
  
    setIsUpdating(true);
    setUpdateError(null);
  
    try {
      console.log('Attempting to update user role...');
      const result = await updateUserRole(userId, 'premium');
      console.log('Update result:', result);
      navigate('/success'); // Redirige a una página de éxito o al lugar que consideres adecuado
    } catch (error) {
      console.error('Update Error:', error);
      setUpdateError('Error al actualizar el rol. Inténtalo de nuevo más tarde.');
    } finally {
      setIsUpdating(false);
    }
  };
  

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
            <button
              onClick={() => !isAddressComplete && navigate('/upgrade/addressData')}
              className={`border p-8 min-w-80 flex justify-between items-center w-full ${
                isAddressComplete ? 'bg-gray-200 cursor-not-allowed' : ''
              }`}
              disabled={isAddressComplete}
            >
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
            <Tooltip title="Próximamente habilitado" placement="top">
              <div
                className="border p-8 min-w-80 flex justify-between items-center w-full bg-gray-200 cursor-not-allowed"
              >
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
            </Tooltip>
          </li>
        </ul>
        <footer className="w-full flex justify-end mt-8">
          <button
            onClick={handleFinalize}
            disabled={!isFinalizingEnabled || isUpdating}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white ${
              isFinalizingEnabled
                ? 'bg-[#61005D] hover:bg-[#61005ee2]'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {isUpdating ? (
              <span>Cargando...</span>
            ) : isFinalizingEnabled ? (
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
          {updateError && <p className="text-red-500 mt-4">{updateError}</p>}
        </footer>
      </aside>
    </section>
  );
}
