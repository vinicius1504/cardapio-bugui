"use client";
import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Plus, Minus, Trash2, ArrowBigRightDash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCarrinho } from "./CarrinhoContext";
import { useAlert } from "../../hooks/useAlert";
import Alert from "../ui/alerts";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

export default function Carrinho() {
  const [aberto, setAberto] = useState(false);
  const carrinhoRef = useRef<HTMLDivElement>(null); // Referência ao carrinho
  const { itens, alterarQuantidade, total, limpar, remover } = useCarrinho();
  const { alertState, closeAlert, showCancelConfirm } = useAlert();
  const router = useRouter();
  const pathname = usePathname(); // Always call this hook

  // Prevent rendering the cart UI if on the checkout page
  const isCheckoutPage = pathname === "/checkout";
  const isAdmPage = pathname === "/adm";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        carrinhoRef.current &&
        !carrinhoRef.current.contains(event.target as Node)
      ) {
        setAberto(false);
      }
    }

    if (aberto) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [aberto]);

  if (isCheckoutPage) {
    return null;
  }

  if (isAdmPage) {
    return null;
  }

  return (
    <>
      {!aberto && ( // Renderiza o botão apenas se o carrinho não estiver aberto

          <button
            onClick={() => setAberto(!aberto)}
            className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition"
          >
            <ShoppingCart size={24} />
          </button>

      )}

      <AnimatePresence>
        {aberto && (
          <motion.div
            ref={carrinhoRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-lg z-40 p-6 flex flex-col"
          >
            <div className="flex justify-between">
              <button
                onClick={() => setAberto(false)}
                className="text-red-600 hover:text-red-800 transition"
              >
                <ArrowBigRightDash size={24} />
              </button>
              <h2 className="text-xl font-bold my-4 text-red-700">Seu Carrinho</h2>

              <button
                onClick={() =>
                  showCancelConfirm(
                    "Tem certeza que deseja limpar o carrinho?",
                    () => limpar()
                  )
                }
                title="Esvaziar carrinho"
                className="text-red-600 hover:text-red-800 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
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
                      <Image
                        src={item.imagem || "/placeholder.webp"} // Use a fallback image if item.imagem is empty
                        alt={item.nome}
                        width={56}
                        height={56}
                        className="rounded object-cover"
                      />

                      <div>
                        <p className="font-semibold">{item.nome}</p>
                        <p className="text-xs">{item.preco}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (Number(item.quantidade ?? 0) <= 1) {
                            showCancelConfirm(
                              `Deseja remover "${item.nome}" do carrinho?`,
                              () => remover(item.nome)
                            );
                          } else {
                            alterarQuantidade(item.nome, -1);
                          }
                        }}
                        className="bg-red-500 px-2 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="min-w-[24px] text-center">
                        {item.quantidade}
                      </span>
                      <button
                        onClick={() => alterarQuantidade(item.nome, +1)}
                        className="bg-green-500 px-2 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Totais */}
            <div className="mt-4 border-t pt-4 text-sm text-black">
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
              <button
                onClick={() => router.push("/pages/checkout")}
                className="w-full bg-green-700 py-3 mt-6 rounded text-white hover:bg-green-800"
              >
                Confirmar Pedido
              </button>
              <button
                onClick={() => setAberto(false)}
                className="w-full mt-2 text-sm text-red-500 hover:underline text-center"
              >
                Fechar
              </button>
            </div>
            <Alert
              isOpen={alertState.isOpen}
              onClose={closeAlert}
              title={alertState.title}
              message={alertState.message}
              type={alertState.type}
              confirmText={alertState.confirmText}
              cancelText={alertState.cancelText}
              showCancel={alertState.showCancel}
              onConfirm={alertState.onConfirm}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
