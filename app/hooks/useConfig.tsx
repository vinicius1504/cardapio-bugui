// hooks/useConfig.ts
"use client";

import { useState, useEffect } from "react";
import { ConfigT } from "@/.@types/Config"; // Ajuste o caminho conforme necessário

export function useConfig() {
  const [config, setConfig] = useState<ConfigT | null>(null);
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

  const saveConfig = async (novaConfig: ConfigT) => {
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
