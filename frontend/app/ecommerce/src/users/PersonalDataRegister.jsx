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
    <section className='px-96 py-16 flex flex-col justify-center'>
      <header>
        <h1 className="text-3xl font-bold  my-5 text-center">Confirme sus dates personales</h1>
      </header>
    <form onSubmit={formik.handleSubmit} className="space-y-6 p-6 flex flex-col">
  
      <div className="flex flex-col space-y-2">
        <label htmlFor="fullName" className="text-gray-700 font-semibold">Nombre completo:</label>
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
        <label htmlFor="dni" className=" text-gray-700 font-semibold">DNI:</label>
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
        <span className='text-gray-700 font-semibold'>Foto frente y verso del DNI</span>
      <div className='flex'>
      <input
        type="file"
        id="identificationFront"
        name="identificationFront"
        onChange={(event) => formik.setFieldValue("identificationFront", event.currentTarget.files[0])}
        className="p-2"
      />
      <input
        type="file"
        id="identificationBack"
        name="identificationBack"
        onChange={(event) => formik.setFieldValue("identificationBack", event.currentTarget.files[0])}
        className="p-2"
      />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="birthDate" className="text-gray-700 font-semibold">Fecha de nacimiento:</label>
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
        <label htmlFor="phone" className="text-gray-700 font-semibold">Número de celular:</label>
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
        className="w-full py-2 bg-[#61005D] text-white rounded-md hover:bg-[#61005ee2] transition duration-150"
      >
        Continuar
      </button>
    </form>
    </section>
  );
}
