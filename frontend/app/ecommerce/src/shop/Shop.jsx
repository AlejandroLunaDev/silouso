
import ItemListContainer from "../product/ItemListContainer";



export default function Shop() {
  
  return (
    <section className="px-5">
      <header>
        <h1 className="text-3xl font-bold text-end my-5">Tienda</h1>
      </header>
      <div>
        filtros
      </div>
      <div className="">
        <ItemListContainer/>
      </div>
    </section>
  )
}
