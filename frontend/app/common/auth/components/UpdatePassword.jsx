/* eslint-disable no-unused-vars */
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hook/useAuth';
import Swal from 'sweetalert2';
import { useState } from 'react';
import {
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { validatePassword } from '../utils/validation';

export default function UpdatePassword() {
  const { updatePasswordOk } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Obtén el token de la URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(/[a-zA-Z]/, 'La contraseña debe contener al menos una letra')
        .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
        .matches(
          /[!@#$%^&*(),.?":{}|<>]/,
          'La contraseña debe contener al menos un carácter especial'
        )
        .matches(
          /[A-Z]/,
          'La contraseña debe contener al menos una letra mayúscula'
        )
        .required('La contraseña es requerida'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('La confirmación de contraseña es requerida')
    }),
    onSubmit: async values => {
      try {
        if (!token) {
          throw new Error('Token no encontrado en la URL');
        }
        await updatePasswordOk(values.password, values.confirmPassword, token);
        Swal.fire({
          title: 'Éxito',
          text: 'La contraseña se ha actualizado correctamente',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar la contraseña',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  });

  const {
    lengthValid,
    letterValid,
    numberValid,
    specialCharValid,
    upperCaseValid
  } = validatePassword(password);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Actualizar Contraseña
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='password' className='block text-gray-700 mb-2'>
              Nueva Contraseña
            </label>
            <div className='relative'>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id='password'
                name='password'
                value={formik.values.password}
                onChange={e => {
                  formik.handleChange(e);
                  setPassword(e.target.value);
                }}
                onBlur={formik.handleBlur}
                className={`w-full p-2 border rounded-md ${
                  formik.touched.password && formik.errors.password
                    ? 'border-red-500'
                    : 'border-gray-300'
                } focus:outline-none pr-10`} // Ajusta el padding a la derecha
                required
              />
              <button
                type='button'
                onClick={() => setPasswordVisible(!passwordVisible)}
                className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
              >
                {passwordVisible ? (
                  <FaEye className='text-gray-500' />
                ) : (
                  <FaEyeSlash className='text-gray-500' />
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className='text-red-500 mb-4 text-sm'>
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          <div className='mb-4'>
            <label
              htmlFor='confirmPassword'
              className='block text-gray-700 mb-2'
            >
              Confirmar Nueva Contraseña
            </label>
            <div className='relative'>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id='confirmPassword'
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={e => {
                  formik.handleChange(e);
                  setConfirmPassword(e.target.value);
                }}
                onBlur={formik.handleBlur}
                className={`w-full p-2 border rounded-md ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? 'border-red-500'
                    : 'border-gray-300'
                } focus:outline-none pr-10`} // Ajusta el padding a la derecha
                required
              />
              <button
                type='button'
                onClick={() =>
                  setConfirmPasswordVisible(!confirmPasswordVisible)
                }
                className='absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer'
              >
                {confirmPasswordVisible ? (
                  <FaEye className='text-gray-500' />
                ) : (
                  <FaEyeSlash className='text-gray-500' />
                )}
              </button>
            </div>
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <p className='text-red-500 mb-4 text-sm'>
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </div>
          <div className='my-4'>
            <ul className='list-disc  list-inside pl-4'>
              <li
                className={`flex items-center text-sm ${
                  lengthValid ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {lengthValid ? (
                  <FaCheckCircle className='mr-2' />
                ) : (
                  <FaTimesCircle className='mr-2' />
                )}
                Debe tener al menos 8 caracteres
              </li>
              <li
                className={`flex items-center text-sm ${
                  letterValid ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {letterValid ? (
                  <FaCheckCircle className='mr-2' />
                ) : (
                  <FaTimesCircle className='mr-2' />
                )}
                Debe contener al menos una letra
              </li>
              <li
                className={`flex items-center text-sm ${
                  upperCaseValid ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {upperCaseValid ? (
                  <FaCheckCircle className='mr-2' />
                ) : (
                  <FaTimesCircle className='mr-2' />
                )}
                Debe contener al menos una letra mayúscula
              </li>
              <li
                className={`flex items-center text-sm ${
                  numberValid ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {numberValid ? (
                  <FaCheckCircle className='mr-2' />
                ) : (
                  <FaTimesCircle className='mr-2' />
                )}
                Debe contener al menos un número
              </li>
              <li
                className={`flex items-center text-sm ${
                  specialCharValid ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {specialCharValid ? (
                  <FaCheckCircle className='mr-2' />
                ) : (
                  <FaTimesCircle className='mr-2' />
                )}
                Debe contener al menos un carácter especial
              </li>
            </ul>
          </div>
          <button
            type='submit'
            className='w-full py-2 px-4 bg-[#61005e] text-white rounded-md hover:bg-[#61005ee2] focus:outline-none'
          >
            Actualizar Contraseña
          </button>
        </form>
        <div className='mt-4 text-center'>
          <button
            onClick={() => navigate('/login')}
            className='text-[#61005D] font-semibold'
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    </div>
  );
}
