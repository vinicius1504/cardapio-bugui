"use client";
import { useState } from "react";
import ProdutoCard from "./ProdutoCard";
import { produtos } from "../data/produtosL";
import { AnimatePresence, motion } from "framer-motion";

const categorias = ["Tudo", ...new Set(produtos.map((p) => p.categoria))];

export default function SecaoMenu() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Tudo");
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);
  const [loading, setLoading] = useState(false);
  const [linhasExibidas, setLinhasExibidas] = useState(4);

  const colunas = 3; // corresponde ao md:grid-cols-3
  const quantidadeExibida = linhasExibidas * colunas;

  const filtrarProdutos = (categoria: string) => {
    setLoading(true);
    setCategoriaSelecionada(categoria);
    setLinhasExibidas(4);

    setTimeout(() => {
      const filtrados =
        categoria === "Tudo"
          ? produtos
          : produtos.filter((p) => p.categoria === categoria);
      setProdutosFiltrados(filtrados);
      setLoading(false);
    }, 200);
  };

  const produtosVisiveis = produtosFiltrados.slice(0, quantidadeExibida);
  const podeMostrarMais = quantidadeExibida < produtosFiltrados.length;

  return (
    <section className="w-full px-4 pb-20 min-h-screen">
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-medium border ${
              categoriaSelecionada === cat
                ? "bg-red-700 text-white"
                : "bg-white text-red-700 border-red-500"
            } transition`}
            onClick={() => filtrarProdutos(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grade de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-52 bg-gray-200 animate-pulse rounded-xl"
            ></div>
          ))
        ) : (
          <AnimatePresence mode="wait">
            {produtosVisiveis.map((produto, index) => (
              <motion.div
                key={produto.nome + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <ProdutoCard {...produto} />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Botão de ver mais */}
      {podeMostrarMais && (
        <div className="text-center mt-6">
          <button
            onClick={() => setLinhasExibidas((prev) => prev + 4)}
            className="px-6 py-2 bg-red-700 text-white rounded-full hover:bg-red-800 transition"
          >
            Ver mais
          </button>
        </div>
      )}
    </section>
  );
}
