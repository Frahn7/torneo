import { Seleccion } from "./components/Seleccion";

export default function Home() {
  return (
    <div className="w-full">
      <h1 className="text-4xl flex justify-center">Creador de torneos</h1>
      <div className="px-10">
        <Seleccion />
      </div>
    </div>
  );
}
