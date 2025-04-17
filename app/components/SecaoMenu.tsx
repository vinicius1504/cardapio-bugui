"use client";
import { useState, useEffect } from "react";
import ProdutoCard from "./ProdutoCard";
import { produtosD } from "../data/produtosL";
import { AnimatePresence, motion } from "framer-motion";
import ProdutoModal from "./ProdutoModal";
import { ProdutoT } from "@/.@types/Produto";
import { useCarrinho } from "./CarrinhoContext";
import { MagneticButton } from "../components/ui/magnetic-button";

const categorias = ["Tudo", ...new Set(produtosD.map((p) => p.categoria))];

export default function SecaoMenu() {
  const { adicionar } = useCarrinho();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Tudo");
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtosD);
  const [loading, setLoading] = useState(false);
  const [linhasExibidas, setLinhasExibidas] = useState(4);
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoT | null>(
    null
  );
  const colunas = 3;
  const quantidadeExibida = linhasExibidas * colunas;

  const filtrarProdutos = (categoria: string) => {
    setLoading(true);
    setCategoriaSelecionada(categoria);
    setLinhasExibidas(4);

    setTimeout(() => {
      const filtrados =
        categoria === "Tudo"
          ? produtosD
          : produtosD.filter((p) => p.categoria === categoria);
      setProdutosFiltrados(filtrados);
      setLoading(false);
    }, 200);
  };

  const pesquisarProdutos = (termo: string) => {
    setLoading(true);
    setTermoPesquisa(termo);

    setTimeout(() => {
      const filtrados = produtosD.filter((p) =>
        p.nome.toLowerCase().includes(termo.toLowerCase())
      );
      setProdutosFiltrados(filtrados);
      setLoading(false);
    }, 200);
  };

  const produtosVisiveis = produtosFiltrados.slice(0, quantidadeExibida);
  const podeMostrarMais = quantidadeExibida < produtosFiltrados.length;

  return (
    <>
      {/* Modal */}
      {produtoSelecionado && (
        <ProdutoModal
          produto={produtoSelecionado}
          onClose={() => setProdutoSelecionado(null)}
          onAdd={(produto, qtd) => {
            adicionar(produto, qtd); // Add the product to the cart
            setProdutoSelecionado(null);
          }}
        />
      )}

      <section className="w-full px-4 pb-20 min-h-screen">
        {/* Filtros e Pesquisa */}
        <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto mb-6">
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium border hover:bg-red-700 hover:text-white ${
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

          <input
            type="text"
            placeholder="Pesquisar..."
            value={termoPesquisa}
            onChange={(e) => pesquisarProdutos(e.target.value)}
            className="px-4 py-2 border-1 border-red-500 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
          />
        </div>

        {/* Produtos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto max-h-[calc(100vh-250px)] overflow-y-auto custom-scrollbar">
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
                  className="cursor-pointer"
                  onClick={() => setProdutoSelecionado(produto)}
                >
                  <ProdutoCard {...produto} />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {podeMostrarMais && (
          <div className="text-center mt-6">
            <MagneticButton>
              <button
                onClick={() => setLinhasExibidas((prev) => prev + 4)}
                className="px-6 py-2 bg-red-700 text-white rounded-full hover:bg-red-800 transition"
              >
                Ver mais
              </button>
            </MagneticButton>
          </div>
        )}
      </section>
    </>
  );
}
