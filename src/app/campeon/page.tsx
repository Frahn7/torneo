"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";
import img from "../../../public/campeon.jpg";

export default function Campeon() {
  const searchParams = useSearchParams();

  const search = searchParams.get("campeon");
  return (
    <div className="text-4xl flex justify-center flex-col gap-5">
      <p className="flex justify-center">CAMPEON DEL TORNEO</p>
      <p className="uppercase flex justify-center">{search}</p>
      <div className="flex justify-center">
        <Image alt="/" src={img} width={500} height={500} />
      </div>
    </div>
  );
}
