import  { useEffect, useState } from 'react';
import { getTickets } from '../services/orders/getTickets';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

export default function Orders() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [sortOrder, setSortOrder] = useState('dateDesc'); // default sorting criteria

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

  const toggleDropdown = (ticketId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortedTickets = () => {
    return [...tickets].sort((a, b) => {
      switch (sortOrder) {
        case 'priceAsc':
          return a.amount - b.amount;
        case 'priceDesc':
          return b.amount - a.amount;
        case 'dateAsc':
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        case 'dateDesc':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        default:
          return 0;
      }
    });
  };

  if (loading) return <p className="text-center text-lg font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className=" h-dvh p-6 bg-gray-50">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Pedidos</h1>
      
      {/* Sorting select input */}
      <div className="mb-4">
        <label htmlFor="sortOrder" className="block text-gray-700 text-sm font-bold mb-2">
          Ordenar por:
        </label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={handleSortChange}
          className="bg-white border border-gray-300 text-gray-900 rounded-lg py-2 px-3"
        >
          <option value="priceAsc">Más barato</option>
          <option value="priceDesc">Más caro</option>
          <option value="dateAsc">Fecha mas antigua</option>
          <option value="dateDesc">Fecha mas reciente</option>
        </select>
      </div>
      
      <div>
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
          <thead className="border-b border-gray-300">
            <tr>
              <th className="px-6 py-3 text-left text-md font-bold text-gray-700">Code</th>
              <th className="px-6 py-3 text-left text-md font-bold text-gray-700">Cantidad</th>
              <th className="px-6 py-3 text-left text-md font-bold text-gray-700">Comprador</th>
              <th className="px-6 py-3 text-left text-md font-bold text-gray-700">Fecha de Compra</th>
              <th className="px-6 py-3 text-left text-md font-bold text-gray-700">Productos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedTickets().map((ticket) => (
              <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">{ticket.code}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{ticket.purchaser}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(ticket.updatedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm text-gray-600 relative">
                  <button
                    onClick={() => toggleDropdown(ticket._id)}
                    className="flex items-center text-[#61005D] hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors"
                  >
                    {openDropdowns[ticket._id] ? (
                      <>
                        Esconder Productos
                        <FaChevronUp className="ml-2" />
                      </>
                    ) : (
                      <>
                        Mostrar Productos
                        <FaChevronDown className="ml-2" />
                      </>
                    )}
                  </button>
                  {openDropdowns[ticket._id] && (
                    <ul className="mt-2 absolute right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-60">
                      {ticket.products.map((product) => (
                        <li key={product.product._id} className="px-4 py-2 text-sm text-gray-700 border-b last:border-b-0">
                          {product.product.title} - {product.quantity} x ${product.product.price}
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
