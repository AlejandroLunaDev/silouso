/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { formatNumber } from "../../../../common/helper/formatNumeber";

export function Item({ _id, thumbnails, title, price, category }) {
  return (
    <article className="border bg-white shadow-lg border-[#61005D] rounded-md p-3 h-[300px] max-h-[300px]">
      {/* Mueve el primer <Link> para envolver solo el contenido de la imagen */}
      <Link to={`/product/${_id}`} className="block">
        <header className="flex justify-center border-b border-b-[#61005D]">
          <img className="mb-2 h-36" src={thumbnails[0]} alt={title} />
        </header>
      <div className="">
        {/* Aquí puedes tener otro enlace si lo necesitas, pero asegúrate de que no esté anidado */}
        <h3 className="text-[14px]  font-bold hover:text-[#61005D] mt-6">
          {title}
        </h3>
        <p className="font-semibold text-[#61005D]">$ {formatNumber(price)}</p>
      </div>
      </Link>
    </article>
  );
}
