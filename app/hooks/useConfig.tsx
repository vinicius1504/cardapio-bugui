// hooks/useConfig.ts
"use client";

import { useState, useEffect } from "react";

export interface ConfigData {
  nomeEmpresa: string;
  logoUrl: string;
  corPrimaria: string;
  corSecundaria: string;
  corTexto: string;
  corDestaque: string;
  endereco: string;
  horario: string;
}

export function useConfig() {
  const [config, setConfig] = useState<ConfigData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/config");
      const data = await res.json();
      setConfig(data);
    } catch (err) {
      console.error("Erro ao buscar configuração:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveConfig = async (novaConfig: ConfigData) => {
    try {
      const res = await fetch("http://localhost:5000/api/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaConfig),
      });
      const saved = await res.json();
      setConfig(saved);
      return saved;
    } catch (err) {
      console.error("Erro ao salvar config:", err);
      throw err;
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return { config, loading, fetchConfig, saveConfig };
}
