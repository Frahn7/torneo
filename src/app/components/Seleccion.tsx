"use client";

import { useState } from "react";

export const Seleccion = () => {
  const [Ajugdores, setAjugdores] = useState<string[]>([]);
  const [NumeroTotal, setNumeroTotal] = useState(0);
  const [Error, setError] = useState("");

  const AddJugador = (e: any) => {
    e.preventDefault();
    const nombreJugador = e.target.elements[0].value;
    const nuevoArrayJugadores = [...Ajugdores, nombreJugador];
    setAjugdores(nuevoArrayJugadores);
    e.target.elements[0].value = "";
    setNumeroTotal((prevNumeroTotal) => prevNumeroTotal + 1);
  };

  const irTorneo = () => {
    if (Ajugdores.length >= 4) {
      window.location.href = `torneos?jugadores=${Ajugdores}`;
    }
    setError("Minimo 4 jugadores");
  };

  return (
    <div className="flex flex-col justify-center gap-5">
      <div className="text-xl text-center py-4">Selecciona los jugadores</div>
      <form
        className="flex justify-center flex-col"
        onSubmit={(e) => {
          AddJugador(e);
        }}
      >
        <div className="flex justify-center">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            placeholder="Añade los jugadores"
            required
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-whites bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 w-1/2 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:focus:ring-yellow-900"
          >
            Añadir jugador
          </button>
        </div>
      </form>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={irTorneo}
          className="text-white -mt-[8px] justify-center flex bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 w-1/2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Crear torneo
        </button>
      </div>
      <div className="flex flex-col">
        Haz añadido a {NumeroTotal} jugadores
        <p>{Error}</p>
      </div>
    </div>
  );
};
