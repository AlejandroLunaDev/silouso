/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export function Item({ _id, thumbnails, title, price, category }) {
  return (
    <article className="border bg-white shadow-lg border-[#61005D] rounded-md p-3 h-[300px] ">
      <Link to={`/product/${_id}`}>

      <header className="flex justify-center border-b border-b-[#61005D] ">
        <img className="mb-2 h-36" src={thumbnails[0]} alt={title} />
      </header>
      <div className="">
        <Link to={`/product/${_id}`}>
        
        <h3 className=" text-sm font-bold hover:text-[#61005D] mt-6">{title}</h3>
        </Link>
        <p className=" font-semibold text-[#61005D]">$ {price}</p>

      </div>
      </Link>
    </article>
  );
}