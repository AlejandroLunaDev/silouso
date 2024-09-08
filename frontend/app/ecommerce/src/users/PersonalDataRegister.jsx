/* eslint-disable react/prop-types */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { uploadPersonalDocuments } from '../services/users/uploadPersonalDocuments';
import { useAuth } from '../../../common/auth/hook/useAuth';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Paso1Formulario({ onNext }) {
  const { decodedToken } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      dni: '',
      birthDate: '',
      phone: '',
      identificationFront: null,
      identificationBack: null
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Nombre completo es obligatorio'),
      dni: Yup.string().matches(/^[0-9]{8,10}$/, 'DNI debe tener entre 8 y 10 dígitos').required('DNI es obligatorio'),
      birthDate: Yup.date().required('Fecha de nacimiento es obligatoria').nullable(),
      phone: Yup.string().matches(/^\+?\d{10,15}$/, 'Número de celular no es válido').required('Número de celular es obligatorio'),
    }),
    onSubmit: async (values) => {
      const uid = decodedToken.user.id;
      const files = {
        identificationFront: formik.values.identificationFront,
        identificationBack: formik.values.identificationBack
      };

      try {
        // Intentar subir los documentos
        await uploadPersonalDocuments(uid, { ...values }, files);
        
        // Mostrar alerta de éxito
        await Swal.fire({
          title: '¡Éxito!',
          text: 'Documentos personales subidos correctamente',
          icon: 'success',
          confirmButtonText: 'Continuar',
        });

        // Navegar a la ruta /upgrade/register después de cerrar la alerta
        setTimeout(() => {
          navigate('/upgrade/register');
          onNext();
        }, 500);
      } catch (error) {
        // Mostrar alerta de error si algo sale mal
        await Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al cargar los documentos.',
          icon: 'error',
          confirmButtonText: 'Reintentar',
        });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-6 p-6 bg-white rounded-lg shadow-md">
      <input
        type="file"
        id="identificationFront"
        name="identificationFront"
        onChange={(event) => formik.setFieldValue("identificationFront", event.currentTarget.files[0])}
        className="border border-gray-300 rounded-md p-2"
      />
      <input
        type="file"
        id="identificationBack"
        name="identificationBack"
        onChange={(event) => formik.setFieldValue("identificationBack", event.currentTarget.files[0])}
        className="border border-gray-300 rounded-md p-2"
      />
      <div className="flex flex-col space-y-2">
        <label htmlFor="fullName" className="font-medium text-gray-700">Nombre completo:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded-md p-2"
        />
        {formik.touched.fullName && formik.errors.fullName ? (
          <div className="text-red-600 text-sm">{formik.errors.fullName}</div>
        ) : null}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="dni" className="font-medium text-gray-700">DNI:</label>
        <input
          type="text"
          id="dni"
          name="dni"
          value={formik.values.dni}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded-md p-2"
        />
        {formik.touched.dni && formik.errors.dni ? (
          <div className="text-red-600 text-sm">{formik.errors.dni}</div>
        ) : null}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="birthDate" className="font-medium text-gray-700">Fecha de nacimiento:</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={formik.values.birthDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded-md p-2"
        />
        {formik.touched.birthDate && formik.errors.birthDate ? (
          <div className="text-red-600 text-sm">{formik.errors.birthDate}</div>
        ) : null}
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="phone" className="font-medium text-gray-700">Número de celular:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="border border-gray-300 rounded-md p-2"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <div className="text-red-600 text-sm">{formik.errors.phone}</div>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150"
      >
        Siguiente
      </button>
    </form>
  );
}
