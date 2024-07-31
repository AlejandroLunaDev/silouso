import SubNavBar from "../layout/subNavBar/SubNavBar";
import ItemListContainer from "../product/components/ItemListContainer";



export default function Shop() {
  
  return (
    <section className="px-5">
      <header className="w-full flex   tracking-wide mt-28   ">
        <div className="w-1/6">
        </div>
        <SubNavBar/>
        </header>
      <div className="">
        <ItemListContainer/>
      </div>
    </section>
  )
}
