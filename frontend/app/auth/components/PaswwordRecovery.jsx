import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from "sweetalert2";
import { useAuth } from "../hook/useAuth";
import { Link } from 'react-router-dom';

const PasswordRecovery = () => {
  const { recoveredPassword } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Correo electrónico inválido').required('El correo electrónico es obligatorio')
    }),
    onSubmit: async (values) => {
      console.log('Datos enviados:', values); // Verifica los datos enviados
      try {
        await recoveredPassword(values.email);
        Swal.fire({
          title: '¡Éxito!',
          text: 'Te hemos enviado un correo para restablecer tu contraseña',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } catch (error) {
        console.error("Error al recuperar la contraseña:", error);
        Swal.fire({
          title: 'Error',
          text: 'Error al enviar el correo de recuperación',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
  });

  return (
    <section className='flex justify-center items-center h-dvh'>
      <div className="p-8 flex flex-col gap-6 justify-center bg-white rounded-lg shadow-lg w-1/3 h-[400px] ">
        <h2 className="text-2xl font-semibold mb-4">Recuperar Contraseña</h2>
        <form onSubmit={formik.handleSubmit}>
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
              <p className="text-red-500 mt-1">{formik.errors.email}</p>
            ) : null}
          </div>
          <div>
              <p>Enviaremos un correo para restablecer tu contraseña</p>
          </div>
          <button
            type="submit"
            className="w-full bg-[#61005D] text-white py-2 px-4 rounded-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-[#61005D] focus:ring-opacity-50"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-[#61005D] font-semibold"
            >
              Volver al inicio de sesión
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PasswordRecovery;
