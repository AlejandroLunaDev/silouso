/* eslint-disable react-hooks/exhaustive-deps */
import HeroItemContainer from "../product/HeroItemContainer";
import LastItemListContainer from "../product/LastItemListContainer";
import NavBarHome from "./Navbar/NavBarHome";



export default function Home() {
  return (
    <section className=" relative">
      <header className="z-10">
        <NavBarHome />
      </header>
      <HeroItemContainer />
      <section className="px-4 mt-screen">
        <header className="w-full p-4 text-center font-extrabold text-3xl tracking-wide  ">
          <h1 className="text-shadow-lg-[#61005D]">¡Entérate de las últimas novedades!</h1>
        </header>
        <LastItemListContainer />
      </section>
    </section>
  );
}
