import { useEffect, useState } from 'react';
import {
  getUsers,
  deleteUser,
  deleteInactiveUsers,
  updateUserRole
} from '../services/users';
import { FaTrash, FaCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  const isUserActive = lastConnection => {
    const lastConnectionDate = new Date(lastConnection);
    const now = new Date();
    const differenceInDays = (now - lastConnectionDate) / (1000 * 3600 * 24);
    return differenceInDays <= 3;
  };

  const handleDeleteUser = async userId => {
    await deleteUser(userId);
    setUsers(users.filter(user => user._id !== userId));
  };

  const handleDeleteInactiveUsers = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará todos los usuarios inactivos. Esta acción no se puede revertir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar todos los inactivos'
    });

    if (result.isConfirmed) {
      await deleteInactiveUsers();
      setUsers(users.filter(user => isUserActive(user.last_connection)));
      Swal.fire(
        'Borrado!',
        'Todos los usuarios inactivos han sido eliminados.',
        'success'
      );
    }
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
      await updateUserRole(userId, newRole); // Asegúrate de pasar solo el nuevo rol
      // Actualiza la lista de usuarios después de cambiar el rol
      const updatedUsers = users.map(user =>
        user._id === userId ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
      Swal.fire(
        'Rol cambiado!',
        `El rol del usuario ha sido cambiado a ${newRole}.`,
        'success'
      );
    }
  };

  if (!users.length) return <p>Loading...</p>;

  const filteredUsers = users.filter(
    user =>
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className='p-4'>
      <div className='h-dvh overflow-x-auto'>
        <h1 className='text-3xl font-extrabold text-gray-800 mb-6'>Usuarios</h1>
        <div className='flex justify-between'>
          <button
            onClick={handleDeleteInactiveUsers}
            className='mb-4 px-4 py-2 border border-red-700 text-red-700 rounded hover:bg-red-600 hover:text-white'
          >
            Borrar Usuarios Inactivos
          </button>
          <input
            type='text'
            placeholder='Buscar por nombre, apellido o rol'
            className='mb-4 px-4 py-2 border border-[#61005D] focus:outline-none rounded w-1/2'
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <table className='min-w-full bg-white shadow-md rounded-lg border border-gray-200'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b text-left'>Nombre</th>
              <th className='py-2 px-4 border-b text-left'>Apellido</th>
              <th className='py-2 px-4 border-b text-left'>Email</th>
              <th className='py-2 px-4 border-b text-left'>Rol</th>
              <th className='py-2 px-4 border-b text-left'>Estado</th>
              <th className='py-2 px-4 border-b text-left'>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user._id}>
                <td className='py-2 px-4 border-b'>{user.first_name}</td>
                <td className='py-2 px-4 border-b'>{user.last_name}</td>
                <td className='py-2 px-4 border-b'>{user.email}</td>
                <td className='py-2 px-4 border-b'>
                  <select
                    value={user.role}
                    onChange={e => handleChangeRole(user._id, e.target.value)}
                    className='border border-gray-300 rounded px-2 py-1 w-full'
                  >
                    <option value='user'>User</option>
                    <option value='premium'>Premium</option>
                  </select>
                </td>
                <td className='py-2 px-4 border-b'>
                  <FaCircle
                    className={
                      isUserActive(user.last_connection)
                        ? 'text-green-500'
                        : 'text-red-500'
                    }
                  />
                </td>
                <td className='py-2 px-4 border-b flex space-x-2'>
                  <button
                    onClick={() => handleDeleteUser(user._id)}
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
};

export default Users;
