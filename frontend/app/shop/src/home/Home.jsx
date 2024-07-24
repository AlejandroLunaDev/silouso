/* eslint-disable react-hooks/exhaustive-deps */
import HeroItemContainer from "../product/HeroItemContainer";
import LastItemListContainer from "../product/LastItemListContainer";

export default function Home() {
  return (
    <section className="bg-black relative">
      <HeroItemContainer />
      <section className="px-4 mt-screen">
        <header className="w-full p-4 text-center font-extrabold text-3xl tracking-wide text-white ">
          <h1 className="text-shadow-lg-[#61005D]">¡Entérate de las últimas novedades!</h1>
        </header>
        <LastItemListContainer />
      </section>
    </section>
  );
}
