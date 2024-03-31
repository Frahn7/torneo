import { Seleccion } from "./components/Seleccion";

export default function Home() {
  return (
    <div className="w-full ">
      <h1 className="text-4xl py-10 text-center font-serif">
        Generador de torneos
      </h1>
      <Seleccion />
    </div>
  );
}
