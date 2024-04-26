"use client";

import { useSearchParams } from "next/navigation";
import { CardJugadores } from "../components/CardJugadores";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function Torneo() {
  const searchParams = useSearchParams();
  const search = searchParams.get("jugadores");
  const Router = useRouter();

  const [jugadoresArray, setJugadoresArray] = useState<string[]>([]);
  const [GanadoresArray, setGanadoresArray] = useState<string[]>([]);
  const [Titulo, setTitulo] = useState("");
  const [Error, setError] = useState("");

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

  const Continuar = () => {
    if (GanadoresArray.length === jugadoresArray.length / 2) {
      setJugadoresArray(GanadoresArray);
      setGanadoresArray([]);
      setError("");
    } else setError("Selecciona correctamente los ganadores");
  };

  const CampeonPorArray = (c: any) => {
    Router.push(`/campeon?campeon=${c}`);
  };

  return (
    <div>
      <div className="flex justify-center py-10">
        <h1 className="text-4xl font-serif">{Titulo}</h1>
      </div>

      <div className="mt-10 flex flex-row flex-wrap gap-10  justify-center pb-5">
        {jugadoresArray.map((jugador, i) => (
          <React.Fragment key={i}>
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
                  ? "border border-green-600 rounded-lg"
                  : ""
              }
            />
            {i % 2 === 1 && <div className="w-5" />}
          </React.Fragment>
        ))}
      </div>

      {Titulo === "FINAL" ? (
        <button
          type="submit"
          className="text-white  -mt-[8px] justify-center flex bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 w-full focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            GanadoresArray.length === 1
              ? CampeonPorArray(GanadoresArray[0])
              : null;
          }}
        >
          CAMPEON
        </button>
      ) : (
        <button
          type="button"
          onClick={() => Continuar()}
          className="text-white  -mt-[8px] justify-center flex bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 w-full focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Continuar
        </button>
      )}
      <div className="flex flex-col text-xl text-center font-serif">
        {Error}
      </div>
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
