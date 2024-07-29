/* eslint-disable react/prop-types */
import Swal from "sweetalert2"; // Importa SweetAlert2
import { useAuth } from "../hook/useAuth";
import { useNavigate, Link } from "react-router-dom"; // Importa useNavigate
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from 'react'; // Importa useState
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import CircularProgress from '@mui/material/CircularProgress';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { validatePassword } from '../utils/validation';

const RegisterForm = ({ onClose }) => {
 
  const { register,loginWithGitHub,loginWithGoogle } = useAuth();
  const navigate = useNavigate(); 
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para manejar la visibilidad de la contraseña
  const [password, setPassword] = useState(''); // Estado para manejar el valor de la contraseña
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      age: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .required('Nombre requerido'),
      last_name: Yup.string()
        .required('Apellido requerido'),
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('Correo electrónico requerido'),
      password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
        .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un carácter especial')
        .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
        .required('Contraseña requerida'),
      age: Yup.number()
        .required('Edad requerida')
        .positive('La edad debe ser un número positivo')
        .integer('La edad debe ser un número entero'),
    }),
    onSubmit: async (values) => {
      try {
        const data = await register(values);

        if (data.status === 'success') {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Usuario creado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            navigate('/login'); // Redirige a la página de login
            onClose();
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: data.message || "Error al registrar el usuario",
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
        Swal.fire({
          title: 'Error',
          text: "Error al registrar el usuario",
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    },
  });



  const { lengthValid, letterValid, numberValid, specialCharValid, upperCaseValid } = validatePassword(password);


  const handleLoginWithGitHub = async () => {
    setLoading(true);
    try {
      await loginWithGitHub();
    } catch (error) {
      formik.setErrors({ general: 'Error al iniciar sesión con GitHub' });
    } finally {
      setLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
    } catch (error) {
      formik.setErrors({ general: 'Error al iniciar sesión con Google' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className='w-full py-10 flex justify-center items-center'>

    <div className="p-4 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-2xl font-semibold mb-4">Registrarse</h2>
      {formik.errors && <p className="text-red-500 mb-4">{formik.errors.general}</p>}
      <div className='mt-4 flex items-center gap-3'>
          <button
            type='button'
            className='w-full flex items-center justify-center border border-[#61005D] text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            onClick={handleLoginWithGitHub}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color='inherit' />
            ) : (
              <>
                <FaGithub className='mr-2 h-7 w-7' /> Registrarse con GitHub
              </>
            )}
          </button>
          <button
            type='button'
            className='w-full flex items-center justify-center border border-[#61005D] text-black py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-[#61005D] focus:ring-opacity-50'
            onClick={handleLoginWithGoogle}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color='inherit' />
            ) : (
              <>
                <FcGoogle className='mr-2 h-7 w-7' /> Registrarse con Google
              </>
            )}
          </button>
        </div>
        <div className='flex items-center gap-3'>
          <hr className='my-6 border-[#61005D] w-1/2' />
          <small className='text-center text-[#61005D] text-xl font-semibold'>O</small>
          <hr className='my-6 border-[#61005D] w-1/2' />
        </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61005D] focus:border-[#61005D] sm:text-sm"
            />
            {formik.touched.first_name && formik.errors.first_name ? (
              <div className="text-red-500 text-sm">{formik.errors.first_name}</div>
            ) : null}
          </div>
          <div>
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Apellido:
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61005D] focus:border-[#61005D] sm:text-sm"
            />
            {formik.touched.last_name && formik.errors.last_name ? (
              <div className="text-red-500 text-sm">{formik.errors.last_name}</div>
            ) : null}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Edad:
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61005D] focus:border-[#61005D] sm:text-sm"
          />
          {formik.touched.age && formik.errors.age ? (
            <div className="text-red-500 text-sm">{formik.errors.age}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Correo electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61005D] focus:border-[#61005D] sm:text-sm"
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Contraseña:
          </label>
          <div className="relative">

          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            value={formik.values.password}
            onChange={(e) => {
              formik.handleChange(e);
              setPassword(e.target.value); // Actualiza el estado de la contraseña
            }}
            onBlur={formik.handleBlur}
            required
            className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61005D] focus:border-[#61005D] sm:text-sm pr-10`} // Ajusta el padding a la derecha
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 right-0 flex items-center text-gray-500" // Ajusta la posición y el centrado vertical
          >
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </button>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
     <div className="grid grid-cols-3 gap-4 mt-2 text-xs">
  <div className={`flex items-center ${lengthValid ? 'text-green-600' : 'text-red-600'}`}>
    {lengthValid ? <FaCheckCircle className="mr-2"/> : <FaTimesCircle className="mr-2"/>}
    <span>Debe tener al menos 8 caracteres</span>
  </div>
  <div className={`flex items-center ${letterValid ? 'text-green-600' : 'text-red-600'}`}>
    {letterValid ? <FaCheckCircle className="mr-2"/> : <FaTimesCircle className="mr-2"/>}
    <span>Debe contener al menos una letra</span>
  </div>
  <div className={`flex items-center ${numberValid ? 'text-green-600' : 'text-red-600'}`}>
    {numberValid ? <FaCheckCircle className="mr-2"/> : <FaTimesCircle className="mr-2"/>}
    <span>Debe contener al menos un número</span>
  </div>
  <div className={`flex items-center ${specialCharValid ? 'text-green-600' : 'text-red-600'}`}>
    {specialCharValid ? <FaCheckCircle className="mr-2"/> : <FaTimesCircle className="mr-2"/>}
    <span>Debe contener al menos un carácter especial</span>
  </div>
  <div className={`flex items-center ${upperCaseValid ? 'text-green-600' : 'text-red-600'}`}>
    {upperCaseValid ? <FaCheckCircle className="mr-2"/> : <FaTimesCircle className="mr-2"/>}
    <span>Debe contener al menos una letra mayúscula</span>
  </div>
</div>

        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#61005D] text-white px-4 py-2 rounded-md hover:bg-[#490046] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#61005D]"
          >
            Registrarse
          </button>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="text-[#61005D] font-semibold">
              Inicia sesión
            </Link>
          </p>
        </div>
    </div>
    </section>
  );
};

export default RegisterForm;
