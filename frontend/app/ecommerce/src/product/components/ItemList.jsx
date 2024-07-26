/* eslint-disable react/prop-types */
import { Item } from "./Item";

export function ItemList({ products }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <Item key={product._id} {...product} />
      ))}
    </section>
  );
}