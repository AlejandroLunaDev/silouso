/* eslint-disable react/prop-types */
import { Item } from "./Item";

export function LastItemList({ products }) {
  return (
    <section className="">
      {products.map((product) => (
        <Item key={product._id} {...product} />
      ))}
    </section>
  );
}