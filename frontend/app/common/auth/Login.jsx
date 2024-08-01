/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir
import { useAuth } from './hook/useAuth';
import { FaEye, FaEyeSlash, FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import CircularProgress from '@mui/material/CircularProgress'; // Eliminar si no se usa
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  const { login, loginWithGitHub, loginWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para navegación

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      showPassword: false
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio'),
      password: Yup.string().required('La contraseña es obligatoria')
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await login({ email: values.email, password: values.password });
        // Redirigir o manejar el éxito del login aquí
      } catch (error) {
        console.error('Login error:', error);
        formik.setErrors({ general: 'Usuario o contraseña incorrectos' });
      } finally {
        setLoading(false);
      }
    }
  });

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
    <section className='w-full h-screen flex justify-center items-center  '>
      <div className='bg-white shadow-lg p-8 rounded-lg w-2/4 flex flex-col justify-center'>
        {formik.errors.general && <p className='text-red-500 mb-4'>{formik.errors.general}</p>}
        <h2 className='text-2xl font-extrabold text-center text-[#61005D] mb-4'>Iniciar Sesión</h2>
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
                <FaGithub className='mr-2 h-7 w-7' /> Iniciar sesión con GitHub
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
                <FcGoogle className='mr-2 h-7 w-7' /> Iniciar sesión con Google
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
          <div className='mb-4'>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
            >
              Correo electrónico:
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61005D] focus:border-[#61005D] sm:text-sm'
            />
            {formik.touched.email && formik.errors.email ? (
              <p className='text-red-500 mt-1'>{formik.errors.email}</p>
            ) : null}
          </div>
          <div className='mb-6'>
            <label
              htmlFor='password'
              className='text-sm font-medium text-gray-700 flex justify-between'
            >
              Contraseña:
            </label>
            <div className='relative'>
              <input
                type={formik.values.showPassword ? 'text' : 'password'}
                id='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#61005D] focus:border-[#61005D] sm:text-sm'
              />
              <div className='absolute top-1/2 right-3 -translate-y-1/2'>
                {formik.values.showPassword ? (
                  <FaEyeSlash
                    onClick={() => formik.setFieldValue('showPassword', false)}
                    className='cursor-pointer text-gray-500'
                  />
                ) : (
                  <FaEye
                    onClick={() => formik.setFieldValue('showPassword', true)}
                    className='cursor-pointer text-gray-500'
                  />
                )}
              </div>
            </div>
            <small>
              ¿Olvidaste tu contraseña?{' '}
              <Link
                to="/passwordRecovery"
                className='text-[#61005D] font-semibold'
              >
                Restablecer
              </Link>
            </small>
          </div>
          <button
            type='submit'
            className='w-full bg-[#61005D] text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-[#61005D] focus:ring-opacity-50'
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
        <div className='text-center mt-4'>
          <small>
            ¿No tienes una cuenta?{' '}
            <button
              className='text-[#61005D] font-semibold'
              onClick={() => navigate('/register')} // Redirige a /register
            >
              Regístrate
            </button>
          </small>
        </div>
      </div>
    </section>
  );
}
