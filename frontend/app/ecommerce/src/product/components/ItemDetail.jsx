/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const ButtonCount = ({ onAdd, stock, initial = 1 }) => {
  const [count, setCount] = useState(initial);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  const mostrarAlerta = () => {
    Toastify({
      text: "Producto Agregado al Carrito",
      position: "right",
      gravity: "bottom",
      duration: 1500,
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  };

  const increment = () => {
    if (count < stock) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const decrement = () => {
    if (count > 0) setCount((prevCount) => prevCount - 1);
  };

  const handleAddToCart = () => {
    onAdd(count);
    mostrarAlerta();
  };

  return (
    <div className="flex justify-between">
      <button
        className="border rounded-sm flex items-center justify-center"
        onClick={decrement}
      >
        -
      </button>
      <p className="text-[13px] border rounded-sm px-3 flex items-center">
        {count}
      </p>
      <button
        className="border rounded-sm flex items-center justify-center"
        onClick={increment}
      >
        +
      </button>
      {user ? (
        <button
          className="bg-[#61005D] rounded text-center text-white py-1 px-2"
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </button>
      ) : (
        <button
          className="bg-[#61005D] rounded text-center text-white py-1 px-2"
          onClick={() => navigate("/login")}
        >
          Agregar al carrito
        </button>
      )}
    </div>
  );
};

export default function ItemDetail({ product }) {
    
  const { _id, title, category, thumbnails, price, stock, description } = product.payload || {};
  const ItemCount = ButtonCount;
  const [hasStock, setHasStock] = useState(stock > 0);


  // Log product to the console
  console.log("Product:", product);

 /*  const handleOnAdd = (quantity) => {
    const objProductToAdd = {
      _id,
      title,
      price,
      quantity,
      thumbnails,
      stock,
    };
    addItem(objProductToAdd);
  }; */

  return (
    <section className="flex-none md:flex gap-4  items-center">
      <article className=" ">
        <header className="p-10">
          {thumbnails && thumbnails.length > 0 ? (
            <img
              className="h-44 md:h-[400px]"
              src={thumbnails[0]} // Accede a la primera imagen en el array de thumbnails
              alt={title}
            />
          ) : (
            <p>No image available</p>
          )}
        </header>
      </article>
      <aside className="md:border-l pl-8">
        <article>
          <header className="mb-10">
            <h3 className="font-semibold text-xl mb-2">{title}</h3>
            <div className="flex font-semibold text-sm gap-2">
              <p className="border-r border-black pr-3">SKU</p>
              <p>{_id}</p>
            </div>
          </header>
          <p className="font-bold mb-5 ">$ {price}</p>
          <h3 className="font-bold">Categoria</h3>
          <p>{category}</p>
          <h3 className="font-bold">Descripción</h3>
          <p className="text-[11px] md:text-sm w-1/3">{description}</p>
        </article>
        <div className="w-60 mt-8">
{/*           {hasStock ? (
            !isInCart(_id) ? (
              <ItemCount onAdd={handleOnAdd} stock={stock} />
            ) : (
              <div className="bg-[#61005D] rounded text-center text-white py-1">
                <Link to="/cart">Seguir Comprando</Link>
              </div>
            )
          ) : (
            <div className="bg-red-500 text-white rounded px-2 py-1">
              No hay stock de este producto
            </div>
          )} */}
        </div>
      </aside>
    </section>
  );
}
