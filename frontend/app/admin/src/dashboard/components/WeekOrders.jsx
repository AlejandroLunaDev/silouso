/* eslint-disable react/prop-types */

const WeekOrders = ({ salesCount }) => {
  return (
    <div className="bg-white shadow-md rounded-lg border border-gray-200 p-4 text-center">
      <h2 className="text-2xl font-semibold text-gray-700">Semana</h2>
      <p className="text-5xl font-bold text-[#61005D] mt-2">{salesCount}</p>
      <small className="text-gray-500 text-semibold">{salesCount} ventas esta semana</small>
    </div>
  );
};

export default WeekOrders;
