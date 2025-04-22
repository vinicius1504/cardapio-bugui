import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="relative h-[500px] sm:h-[400px] w-full overflow-hidden">
      {/* Vídeo de fundo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover pt-"
      >
        <source src="/videos/fundo.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos.
      </video>

      {/* Overlay escura */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />

      {/* Conteúdo sobreposto */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center space-y-3 px-4">
        {/* Logo opcional */}
        <Image
          src="/logo.webp"
          alt="Logo Red Burguer"
          width={100}
          height={100}
          className="rounded-full"
        />
        <h1 className="text-3xl sm:text-5xl font-bold">Red Burguer</h1>
        <p className="text-sm sm:text-base">
          Rua dev sucesso, 12, Campo Grande - MS
        </p>
        <p className="text-xs sm:text-sm">Seg à Dom — 18:00 às 22:00</p>
      </div>
    </header>
  );
}
