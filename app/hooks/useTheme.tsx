// hooks/useTheme.ts
"use client";

import { useEffect } from "react";
import { useConfig } from "./useConfig";

export function useTheme() {
  const { config, loading } = useConfig();

  useEffect(() => {
    if (config) {
      document.documentElement.style.setProperty("--cor-primaria", config.corPrimaria);
      document.documentElement.style.setProperty("--cor-secundaria", config.corSecundaria);
      document.documentElement.style.setProperty("--cor-texto", config.corTexto);
      document.documentElement.style.setProperty("--cor-destaque", config.corDestaque);
    }
  }, [config]);

  // ✅ Retorne loading aqui
  return { loading };
}
