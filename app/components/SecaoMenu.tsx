"use client";
import { useEffect, useState } from "react";
import ProdutoCard from "./ProdutoCard";
import { produtos } from "../data/produtosL";
import { AnimatePresence, motion } from "framer-motion";

const categorias = ["Tudo", ...new Set(produtos.map((p) => p.categoria))];

export default function SecaoMenu() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Tudo");
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);
  const [loading, setLoading] = useState(false);

  const filtrarProdutos = (categoria: string) => {
    setLoading(true);
    setCategoriaSelecionada(categoria);

    setTimeout(() => {
      const filtrados =
        categoria === "Tudo"
          ? produtos
          : produtos.filter((p) => p.categoria === categoria);
      setProdutosFiltrados(filtrados);
      setLoading(false);
    }, 500);
  };

  return (
    <section className="w-full px-4 pb-20">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-52 bg-gray-200 animate-pulse rounded-xl"
            ></div>
          ))
        ) : (
          <AnimatePresence mode="wait">
            {produtosFiltrados.map((produto, index) => (
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
    </section>
  );
}
