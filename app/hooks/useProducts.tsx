// app/hooks/useProdutos.ts
"use client";

import { useEffect, useState } from "react";

export type Produto = {
  nome: string;
  categoria: string;
  preco: string;
  descricao: string;
  imagem: string;
  ativo: boolean;
  avaliacao?: number;
};

export function useProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const res = await fetch("http://localhost:5000/api/produtos");
        const data = await res.json();
        setProdutos(data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProdutos();
  }, []);

  return { produtos, loading };
}
