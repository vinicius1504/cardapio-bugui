"use client";
import { useState } from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCarrinho } from "../components/CarrinhoContext";

export default function Carrinho() {
  const [aberto, setAberto] = useState(false);
  const { itens, alterarQuantidade, total } = useCarrinho();

  return (
    <>
      <button
        onClick={() => setAberto(!aberto)}
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition"
      >
        <ShoppingCart size={24} />
      </button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-40 p-6 flex flex-col"
          >
            <h2 className="text-xl font-bold mb-4 text-red-700">Seu Carrinho</h2>

            {/* Lista de produtos */}
            <div className="flex-1 overflow-y-auto text-gray-950">
              {itens.length === 0 ? (
                <p className="text-sm">Nenhum item no carrinho.</p>
              ) : (
                itens.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-4 border-b"
                  >
                    <div className="flex gap-4 items-center">
                      <img
                        src={item.imagem}
                        alt={item.nome}
                        className="w-14 h-14 rounded object-cover"
                      />
                      <div>
                        <p className="font-semibold">{item.nome}</p>
                        <p className="text-xs">{item.preco}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alterarQuantidade(item.nome, -1)}
                        className="bg-red-900 px-2 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="min-w-[24px] text-center">{item.quantidade}</span>
                      <button
                        onClick={() => alterarQuantidade(item.nome, +1)}
                        className="bg-green-900 px-2 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totais */}
            <div className="mt-4 border-t pt-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R$ {total().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Frete</span>
                <span>--</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>R$ {total().toFixed(2)}</span>
              </div>
              <button className="w-full bg-green-700 py-3 mt-6 rounded hover:bg-green-800">
                Confirmar Pedido
              </button>
              <button
                onClick={() => setAberto(false)}
                className="w-full mt-2 text-sm text-red-500 hover:underline text-center"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
