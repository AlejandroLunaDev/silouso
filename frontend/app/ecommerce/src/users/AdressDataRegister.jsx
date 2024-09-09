import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uploadAddress } from '../services/users/uploadAddress';
import { useAuth } from '../../../common/auth/hook/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';

const validationSchema = Yup.object({
  address: Yup.string().required('Dirección es requerida'),
  province: Yup.string().required('Provincia es requerida'),
  city: Yup.string().required('Ciudad es requerida'),
  postalCode: Yup.string().required('Código Postal es requerido'),
  neighborhood: Yup.string().required('Barrio es requerido'),
});

export default function AddressDataRegister() {
  const { decodedToken } = useAuth();
  const navigate = useNavigate();
  const [isFetchingPostalData, setIsFetchingPostalData] = useState(false);

  const formik = useFormik({
    initialValues: {
      address: '',
      province: '',
      city: '',
      postalCode: '',
      neighborhood: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const uid = decodedToken.user.id;
        await uploadAddress(uid, values);

        // Mostrar SweetAlert2 de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'La dirección se ha registrado correctamente.',
          timer: 2000, // Tiempo en milisegundos para mostrar el mensaje
          showConfirmButton: false,
        });

        // Navegar después de un breve retraso
        setTimeout(() => {
          navigate('/upgrade/register');
        }, 2000); // Debe coincidir con el tiempo del `timer` de SweetAlert2
      } catch (error) {
        console.error('Error al subir la dirección:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al registrar la dirección.',
        });
      }
    },
  });

  const handlePostalCodeChange = async (e) => {
    const postalCode = e.target.value;
    formik.handleChange(e);

    if (postalCode.length === 5) { // Ajusta la longitud del código postal según tu país
      setIsFetchingPostalData(true);
      try {
        const response = await fetch(`https://api.zippopotam.us/us/${postalCode}`); // Ajusta el país
        if (response.ok) {
          const data = await response.json();
          if (data.places.length > 0) {
            const place = data.places[0];
            formik.setFieldValue('city', place['place name']);
            formik.setFieldValue('province', place['state']);
          }
        }
      } catch (error) {
        console.error('Error fetching postal code data:', error);
      } finally {
        setIsFetchingPostalData(false);
      }
    }
  };

  return (
    <div className="px-6 py-8 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Registrar Dirección</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${
              formik.touched.address && formik.errors.address ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="text-red-500 text-sm">{formik.errors.address}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Código Postal</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formik.values.postalCode}
            onChange={handlePostalCodeChange}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${
              formik.touched.postalCode && formik.errors.postalCode ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.postalCode && formik.errors.postalCode ? (
            <div className="text-red-500 text-sm">{formik.errors.postalCode}</div>
          ) : null}
          {isFetchingPostalData && <div className="text-gray-500 text-sm">Cargando datos de ubicación...</div>}
        </div>
        <div className="mb-4">
          <label htmlFor="province" className="block text-sm font-medium text-gray-700">Provincia</label>
          <input
            type="text"
            id="province"
            name="province"
            value={formik.values.province}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border block w-full sm:text-sm ${
              formik.touched.province && formik.errors.province ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.province && formik.errors.province ? (
            <div className="text-red-500 text-sm">{formik.errors.province}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${
              formik.touched.city && formik.errors.city ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500 text-sm">{formik.errors.city}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-700">Barrio</label>
          <input
            type="text"
            id="neighborhood"
            name="neighborhood"
            value={formik.values.neighborhood}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 p-2 border block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${
              formik.touched.neighborhood && formik.errors.neighborhood ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.neighborhood && formik.errors.neighborhood ? (
            <div className="text-red-500 text-sm">{formik.errors.neighborhood}</div>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={`w-full py-2 px-4 text-white rounded-md ${
            formik.isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#61005D] hover:bg-[#61005ee2] transition duration-150'
          }`}
        >
          {formik.isSubmitting ? 'Enviando...' : 'Enviar Dirección'}
        </button>
      </form>
    </div>
  );
}
