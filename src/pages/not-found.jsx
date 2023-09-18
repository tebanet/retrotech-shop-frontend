import { Link } from "react-router-dom";
import notFound from "/assets//404/404.gif";
import { Main } from "../components/main";

export function NotFound() {
  return (
    <Main>
      <section className="flex flex-col justify-evenly items-center mt-4 gap-4 md:mt-0 md:gap-4">
        <h2 className="text-3xl md:text-2xl">¡Te has perdido!</h2>
        <img
          className="w-[25rem] md:w-[15rem]"
          src={notFound}
          alt="This is fine."
        />
        <p className="text-2xl md:text-xl text-center">
          No pasa nada, te ayudamos a volver al inicio :)
        </p>
        <Link
          to="/"
          className="flex text-[var(--primary-color)] bg-[var(--secondary-color)] rounded-2xl border-black items-center justify-center
			w-40 h-8 border"
        >
          <b>Volver a la tienda</b>
        </Link>
      </section>
    </Main>
  );
}
