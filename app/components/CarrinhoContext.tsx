"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type Produto = {
  nome: string;
  preco: string;
  imagem: string;
  quantidade: number;
};

type CarrinhoContextType = {
  itens: Produto[];
  adicionar: (produto: Omit<Produto, "quantidade">) => void;
  alterarQuantidade: (nome: string, delta: number) => void;
  total: () => number;
  limpar: () => void;
};

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<Produto[]>([]);

  const adicionar = (produto: Omit<Produto, "quantidade">) => {
    setItens((prev) => {
      const index = prev.findIndex((p) => p.nome === produto.nome);
      if (index !== -1) {
        const novo = [...prev];
        novo[index].quantidade += 1;
        return novo;
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const alterarQuantidade = (nome: string, delta: number) => {
    setItens((prev) =>
      prev
        .map((item) =>
          item.nome === nome
            ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
            : item
        )
    );
  };

  const total = () => {
    return itens.reduce((soma, item) => {
      const precoNumerico = parseFloat(item.preco.replace("R$", "").replace(",", "."));
      return soma + precoNumerico * item.quantidade;
    }, 0);
  };

  const limpar = () => setItens([]);

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionar, alterarQuantidade, total, limpar }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho deve ser usado dentro do CarrinhoProvider");
  }
  return context;
}
