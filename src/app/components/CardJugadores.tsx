import React, { useState } from "react";

interface JugadorProps {
  Nombre: string;
  className?: string;
}

export const CardJugadores = ({ Nombre, className }: JugadorProps) => {
  return (
    <div className={className}>
      <div className="w-full   bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 py-10 px-10 hover:bg-green-800 ">
        <div className="flex flex-col items-center ">
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {Nombre}
          </h5>
        </div>
      </div>
    </div>
  );
};
