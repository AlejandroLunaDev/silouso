import { getUsers } from './getUsers';
import { deleteUser } from './deleteUser';
export const deleteInactiveUsers = async () => {
  try {
    const usersData = await getUsers();
    const users = usersData.users;

    const inactiveUsers = users.filter(user => {
      const lastConnectionDate = new Date(user.last_connection);
      const now = new Date();
      const differenceInDays = (now - lastConnectionDate) / (1000 * 3600 * 24);
      return differenceInDays > 3;
    });

    const deletePromises = inactiveUsers.map(user => deleteUser(user._id));
    await Promise.all(deletePromises);
    console.log(`Deleted ${inactiveUsers.length} inactive users`);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
