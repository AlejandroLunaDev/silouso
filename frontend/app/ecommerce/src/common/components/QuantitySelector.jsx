import PropTypes from 'prop-types';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function QuantitySelector({ quantity, onIncrease, onDecrease }) {
    return (
        <div className=" flex items-center gap-2">
            <button
                onClick={onDecrease}
                disabled={quantity <= 1}
                className="p-2 bg-[#61005D] text-white rounded cursor-pointer"
            >
                <FaMinus size={14} />
            </button>
            <span className="text-lg font-medium border border-[#61005D] rounded px-10">{quantity}</span>
            <button
                onClick={onIncrease}
                className="p-2 bg-[#61005D] text-white rounded cursor-pointer"
            >
                <FaPlus size={14} />
            </button>
        </div>
    );
}

QuantitySelector.propTypes = {
    quantity: PropTypes.number.isRequired,
    onIncrease: PropTypes.func.isRequired,
    onDecrease: PropTypes.func.isRequired,
};
