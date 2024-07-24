import { useEffect, useState } from 'react';
import { getTickets } from '../services/orders/getTickets';
import TodayOrders from './components/TodayOrders';
import WeekOrders from './components/WeekOrders';
import MonthOrders from './components/MonthOrders';
import TodayRevenue from './components/TodayRevenue';
import WeekRevenue from './components/WeekRevenue';
import MonthRevenue from './components/MonthRevenue';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (error) {
        setError('Failed to fetch tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // Calculate today's sales count and revenue
  const today = new Date().toISOString().slice(0, 10);
  const todayTickets = tickets.filter(ticket => new Date(ticket.updatedAt).toISOString().slice(0, 10) === today);
  const todaySalesCount = todayTickets.length;
  const todayRevenue = todayTickets.reduce((total, ticket) => total + ticket.products.reduce((sum, product) => sum + (product.quantity * product.product.price), 0), 0);

  // Calculate this week's sales count and revenue
  const todayDate = new Date();
  const startOfWeek = todayDate.getDate() - todayDate.getDay() + 1; // Monday
  const endOfWeek = startOfWeek + 6; // Sunday
  const startDate = new Date(todayDate.setDate(startOfWeek)).toISOString().slice(0, 10);
  const endDate = new Date(todayDate.setDate(endOfWeek)).toISOString().slice(0, 10);
  const weekTickets = tickets.filter(ticket => {
    const ticketDate = new Date(ticket.updatedAt).toISOString().slice(0, 10);
    return ticketDate >= startDate && ticketDate <= endDate;
  });
  const weekSalesCount = weekTickets.length;
  const weekRevenue = weekTickets.reduce((total, ticket) => total + ticket.products.reduce((sum, product) => sum + (product.quantity * product.product.price), 0), 0);

  // Calculate this month's sales count and revenue
  const startOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth(), 1).toISOString().slice(0, 10);
  const endOfMonth = new Date(todayDate.getFullYear(), todayDate.getMonth() + 1, 0).toISOString().slice(0, 10);
  const monthTickets = tickets.filter(ticket => {
    const ticketDate = new Date(ticket.updatedAt).toISOString().slice(0, 10);
    return ticketDate >= startOfMonth && ticketDate <= endOfMonth;
  });
  const monthSalesCount = monthTickets.length;
  const monthRevenue = monthTickets.reduce((total, ticket) => total + ticket.products.reduce((sum, product) => sum + (product.quantity * product.product.price), 0), 0);

  return (
    <section className=" h-dvh p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-gray-800">Panel</h1>
      </header>
      <div className='flex flex-col gap-6'>
        <article>
          <h2 className='text-2xl font-semibold text-gray-700 mb-4   '>Pedidos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TodayOrders salesCount={todaySalesCount} />
        <WeekOrders salesCount={weekSalesCount} />
        <MonthOrders salesCount={monthSalesCount} />
      </div>
        </article>
        <article>
          <h2 className='text-2xl font-semibold text-gray-700 mb-4  '>Ingresos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TodayRevenue totalRevenue={todayRevenue} salesCount={todaySalesCount} />
        <WeekRevenue totalRevenue={weekRevenue} salesCount={weekSalesCount} />
        <MonthRevenue totalRevenue={monthRevenue}
          salesCount={monthSalesCount} />
        
      </div>
        </article>
      </div>
    </section>
  );
}
