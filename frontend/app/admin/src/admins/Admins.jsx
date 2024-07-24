import { useEffect, useState } from 'react';
import { getAdminUsers, updateUserRole, getUsers } from '../services/users'; // Ajusta la ruta según sea necesario
import { FaCircle, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { IoAdd } from 'react-icons/io5';

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [addError, setAddError] = useState(null);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const data = await getAdminUsers();
        setAdmins(data.users);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminUsers();
  }, []);

  const isUserActive = lastConnection => {
    const lastConnectionDate = new Date(lastConnection);
    const now = new Date();
    const differenceInDays = (now - lastConnectionDate) / (1000 * 3600 * 24);
    return differenceInDays <= 3;
  };

  const handleChangeRole = async (userId, newRole) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción cambiará el rol del usuario a ${newRole}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cambiar rol'
    });

    if (result.isConfirmed) {
      await updateUserRole(userId, newRole);
      const updatedAdmins = admins.filter(admin => admin._id !== userId);
      setAdmins(updatedAdmins);
      Swal.fire(
        'Rol cambiado!',
        `El rol del usuario ha sido cambiado a ${newRole}.`,
        'success'
      );
    }
  };

  const handleAddAdmin = async () => {
    try {
      const data = await getUsers();
      const users = data.users;
      console.log('allUsers', users);

      const user = users.find(user => user.email === email);

      if (user) {
        if (user.role !== 'admin') {
          await updateUserRole(user._id, 'admin');
        }

        // Actualiza la lista de admins
        setAdmins(prevAdmins =>
          prevAdmins.some(admin => admin._id === user._id)
            ? prevAdmins
            : [...prevAdmins, user]
        );
        setEmail('');
        Swal.fire(
          'Éxito',
          'El usuario ha sido agregado como administrador.',
          'success'
        );
      } else {
        Swal.fire(
          'Error',
          'No se encontró ningún usuario con ese email.',
          'error'
        );
      }
    } catch (error) {
      setAddError(error.message);
      Swal.fire(
        'Error',
        'No se pudo agregar el usuario como administrador.',
        'error'
      );
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddAdmin();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className='p-4'>
      <div className='h-dvh overflow-x-auto'>
        <h1 className='text-3xl font-extrabold text-gray-800 mb-6'>Admins</h1>
        <div className='mb-4 flex'>
          <input
            type='email'
            placeholder='Email del usuario'
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className='px-4 py-2 border border-gray-300 rounded mr-2'
          />
          <button
            onClick={handleAddAdmin}
            className='flex items-center gap-2 px-4 py-2 bg-[#61005D] text-white rounded hover:bg-[#61005ee2] '
          >
            <IoAdd size={20} />
            Agregar Admin
          </button>
        </div>
        {addError && <p className='text-red-500'>{addError}</p>}
        <table className='min-w-full bg-white shadow-md rounded-lg border border-gray-200'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b text-left'>Nombre</th>
              <th className='py-2 px-4 border-b text-left'>Email</th>
              <th className='py-2 px-4 border-b text-left'>Rol</th>
              <th className='py-2 px-4 border-b text-left'>Estado</th>
              <th className='py-2 px-4 border-b text-left'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin._id}>
                <td className='py-2 px-4 border-b'>
                  {admin.first_name} {admin.last_name}
                </td>
                <td className='py-2 px-4 border-b'>{admin.email}</td>
                <td className='py-2 px-4 border-b'>{admin.role}</td>
                <td className='py-2 px-4 border-b'>
                  <FaCircle
                    className={
                      isUserActive(admin.last_connection)
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  />
                </td>
                <td className='py-2 px-4 border-b flex space-x-2'>
                  <button
                    onClick={() => handleChangeRole(admin._id, 'premium')}
                    className='hover:scale-110 border-red-600 px-4 py-2 border flex flex-col justify-center items-center text-red-600 rounded'
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
