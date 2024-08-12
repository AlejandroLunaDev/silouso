/* eslint-disable react/prop-types */
import {formatNumber} from '../../../../common/helper/formatNumeber';

const TodayRevenue = ({ totalRevenue, salesCount }) => {
    return (
      <div className="bg-white shadow-md rounded-lg border border-gray-200 p-4 text-center">
        <h2 className="text-2xl font-semibold text-gray-700"> Día</h2>
        <p className="text-4xl font-bold text-[#61005D] mt-2">${formatNumber(totalRevenue)}</p>
        <small className="text-gray-500 text-semibold">{salesCount} ventas este día</small>
        
      </div>
    );
  };
  
  export default TodayRevenue;
  