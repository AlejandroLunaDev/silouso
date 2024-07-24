/* eslint-disable react/prop-types */


const TodayRevenue = ({ totalRevenue, salesCount }) => {
    return (
      <div className="bg-white shadow-md rounded-lg border border-gray-200 p-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-700"> Més</h2>
        <p className="text-4xl font-bold text-[#61005D] mt-2">${totalRevenue.toFixed(2)}</p>
        <small className="text-gray-500 text-semibold">{salesCount} ventas este més</small>
        
      </div>
    );
  };
  
  export default TodayRevenue;
  