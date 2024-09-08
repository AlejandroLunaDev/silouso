import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uploadAddress } from '../services/users/uploadAddress'; // Ajusta la ruta según tu estructura de carpetas
import { useAuth } from '../../../common/auth/hook/useAuth';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object({
  address: Yup.string().required('Dirección es requerida'),
  province: Yup.string().required('Provincia es requerida'),
  city: Yup.string().required('Ciudad es requerida'),
  postalCode: Yup.string().required('Código Postal es requerido'),
  neighborhood: Yup.string().required('Barrio es requerido'), // Agregado
});

export default function AdressDataRegister() {
  const { decodedToken } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      address: '',
      province: '',
      city: '',
      postalCode: '',
      neighborhood: '', // Agregado
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const uid = decodedToken.user.id; // Asegúrate de que el decodedToken tiene el userId
        await uploadAddress(uid, values);
        console.log('Formulario enviado:', values);
        // Redirige al usuario o muestra un mensaje de éxito
        navigate('/next-step'); // Ajusta la ruta según tu flujo de aplicación
      } catch (error) {
        console.error('Error al subir la dirección:', error);
      }
    },
  });

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
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${
              formik.touched.address && formik.errors.address ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="text-red-500 text-sm">{formik.errors.address}</div>
          ) : null}
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
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${
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
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${
              formik.touched.city && formik.errors.city ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="text-red-500 text-sm">{formik.errors.city}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Código Postal</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={formik.values.postalCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${
              formik.touched.postalCode && formik.errors.postalCode ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.postalCode && formik.errors.postalCode ? (
            <div className="text-red-500 text-sm">{formik.errors.postalCode}</div>
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
            className={`mt-1 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm ${
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
            formik.isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
        >
          {formik.isSubmitting ? 'Enviando...' : 'Enviar Dirección'}
        </button>
      </form>
    </div>
  );
}
