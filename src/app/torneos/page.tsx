"use client";

import { useSearchParams } from "next/navigation";
import { CardJugadores } from "../components/CardJugadores";
import { Suspense, useEffect, useState } from "react";

function Torneo() {
  const searchParams = useSearchParams();
  const search = searchParams.get("jugadores");

  const [jugadoresArray, setJugadoresArray] = useState<string[]>([]);
  const [GanadoresArray, setGanadoresArray] = useState<string[]>([]);
  const [Titulo, setTitulo] = useState("");
  const [FINAL, setFinal] = useState("");

  useEffect(() => {
    if (search) {
      setJugadoresArray(search.split(",").sort(() => Math.random() - 0.5));
    }
  }, [search]);

  useEffect(() => {
    if (jugadoresArray.length === 2) {
      setTitulo("FINAL");
    } else if (jugadoresArray.length === 4) {
      setTitulo("SEMIFINAL");
    } else if (jugadoresArray.length === 8) {
      setTitulo("CUARTOS DE FINAL");
    } else if (jugadoresArray.length > 8) {
      setTitulo("RONDAS");
    }
  }, [jugadoresArray]);

  useEffect(() => {
    if (jugadoresArray.length === 2) {
      setFinal("FINAL");
    }
  }, [jugadoresArray]);

  const AddGanador = (e: any) => {
    e.preventDefault();
    const Ganador = e.target.elements[0].value;
    const nuevoArrayGanadores = [...GanadoresArray, Ganador];
    setGanadoresArray(nuevoArrayGanadores);
    e.target.elements[0].value = "";
  };

  const Continuar = () => {
    setJugadoresArray(GanadoresArray);
    setGanadoresArray([]);
  };

  const CAMPEON = (e: any) => {
    e.preventDefault();
    const CAMPEON = e.target.elements[0].value;
    window.location.href = `campeon?campeon=${CAMPEON}`;
  };

  const CampeonPorArray = (c: any) => {
    window.location.href = `campeon?campeon=${c}`;
  };

  console.log(GanadoresArray);

  return (
    <div>
      <div className="flex justify-center py-10">
        <h1 className="text-4xl">{Titulo}</h1>
      </div>
      <div className="mt-10 flex flex-row gap-10 pb-5 ">
        {jugadoresArray.map((jugador, i) => (
          <CardJugadores
            onclick={() => {
              if (!GanadoresArray.includes(jugador)) {
                const nuevoArrayGanadores = [...GanadoresArray, jugador];
                setGanadoresArray(nuevoArrayGanadores);
              }
              if (GanadoresArray.includes(jugador)) {
                const arrayConGanadorEliminado = GanadoresArray.filter(
                  (elemento) => elemento !== jugador
                );
                setGanadoresArray(arrayConGanadorEliminado);
              }
            }}
            key={i}
            Nombre={jugador}
            className={
              GanadoresArray.includes(jugador)
                ? "w-full border border-red-600"
                : "w-full"
            }
          />
        ))}
      </div>

      {FINAL === "FINAL" ? (
        ""
      ) : (
        <div className="flex justify-center py-5 flex-col ">
          <form onSubmit={(e) => AddGanador(e)}>
            <input
              type="text"
              className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
              placeholder="Pasaron:"
              required
            />
            <button
              type="submit"
              className="text-whites bg-yellow-400 w-full hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 dark:focus:ring-yellow-900"
            >
              Añadir ganador
            </button>
          </form>
        </div>
      )}
      {FINAL === "FINAL" ? (
        <form
          onSubmit={(e) => {
            CAMPEON(e);
          }}
        >
          <input
            type="text"
            className="bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            placeholder="CAMPEON"
            required
          />
          <button
            type="submit"
            className="text-white  -mt-[8px] justify-center flex bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 w-full focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              GanadoresArray.length === 1
                ? CampeonPorArray(GanadoresArray[0])
                : null;
            }}
          >
            AÑADIR CAMPEON
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => Continuar()}
          className="text-white  -mt-[8px] justify-center flex bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 w-full focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Continuar
        </button>
      )}
    </div>
  );
}

export default function TorneosPage() {
  return (
    <Suspense>
      <Torneo />
    </Suspense>
  );
}
