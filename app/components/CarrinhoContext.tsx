"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { ProdutoT } from "@/@types/Produto";

type CarrinhoContextType = {
  itens: ProdutoT[];
  adicionar: (produto: Omit<ProdutoT, "quantidade">, quantidade?: number) => void;
  alterarQuantidade: (nome: string, delta: number) => void;
  total: () => number;
  limpar: () => void;
  remover: (nome: string) => void;
};

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ProdutoT[]>([]);

  const adicionar = (produto: Omit<ProdutoT, "quantidade">, quantidade: number = 1) => {
    setItens((prev) => {
      const index = prev.findIndex((p) => p.nome === produto.nome);
      if (index !== -1) {
        const novo = [...prev];
        novo[index].quantidade = (novo[index].quantidade ?? 0) + quantidade;
        return novo;
      }
      return [...prev, { ...produto, quantidade }];
    });
  };

  const alterarQuantidade = (nome: string, delta: number) => {
    setItens((prev) =>
      prev.map((item) =>
        item.nome === nome
          ? { ...item, quantidade: Math.max(1, (item.quantidade ?? 0) + delta) }
          : item
      )
    );
  };

  const remover = (nome: string) => {
    setItens(prev => prev.filter(item => item.nome !== nome));
  };
  

  const total = () => {
    return itens.reduce((soma, item) => {
      const precoNumerico = parseFloat(item.preco.replace("R$", "").replace(",", "."));
      return soma + precoNumerico * (item.quantidade ?? 0);
    }, 0);
  };

  const limpar = () => setItens([]);

  return (
    <CarrinhoContext.Provider
      value={{ itens, adicionar, alterarQuantidade, total, limpar, remover }}
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
