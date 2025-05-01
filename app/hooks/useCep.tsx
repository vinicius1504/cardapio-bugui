// app/hooks/useCep.tsx
"use client";
import { useState } from "react";

interface Endereco {
  rua: string;
  bairro: string;
  cidade: string;
  uf: string;
  cep: string;
}

export function useCep() {
  const [endereco, setEndereco] = useState<Endereco>({
    rua: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
  });
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);

  const buscarCep = async (cep: string) => {
    setCarregando(true);
    setErro(null);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErro("CEP não encontrado.");
      } else {
        setEndereco({
          rua: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
          cep: data.cep,
        });
      }
    } catch (error) {
      setErro("Erro ao buscar o CEP.");
    } finally {
      setCarregando(false);
    }
  };

  return { endereco, setEndereco, buscarCep, erro, carregando };
}
