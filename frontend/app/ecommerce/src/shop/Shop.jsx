
import ItemListContainer from "../product/ItemListContainer";



export default function Shop() {
  
  return (
    <section className="px-5">
      <header>
        <h1 className=" px-5 text-3xl font-bold text-end my-5">Tienda</h1>
      </header>
      <div className="">
        <ItemListContainer/>
      </div>
    </section>
  )
}
