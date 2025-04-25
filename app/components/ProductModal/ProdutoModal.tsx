import { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { ProdutoT } from "@/.@types/Produto";

interface ProdutoModalProps {
  produto: ProdutoT;
  onClose: () => void;
  onAdd: (produto: ProdutoT, quantidade: number) => void;
}

export default function ProdutoModal({
  produto,
  onClose,
  onAdd,
}: ProdutoModalProps) {
  const [quantidade, setQuantidade] = useState(1);

  if (!produto) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 overflow-hidden shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-xl"
        >
          &times;
        </button>
        <div className="grid md:grid-cols-2">
          <div className="h-96 relative">
            <Image
              src={produto.imagem || "/placeholder.webp"} // Use a fallback image if produto.imagem is empty
              alt={produto.nome}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-2 text-red-700 uppercase">
              {produto.nome}
            </h2>
            <p className="text-sm text-gray-700 mb-4">{produto.descricao}</p>

            <div className="text-lg font-bold text-red-600 mb-2">
              R$ {produto.preco}
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-800 mb-1">Comentários</h4>
              <textarea
                placeholder="Deixe um comentário sobre este produto..."
                className="w-full border p-2 rounded h-24 text-sm"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  <Minus size={16} />
                </button>
                <span>{quantidade}</span>
                <button
                  onClick={() => setQuantidade((q) => q + 1)}
                  className="bg-green-600 text-white p-2 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => {
                  onAdd(produto, quantidade); // Ensure quantidade is passed correctly
                  onClose();
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold"
              >
                Adicionar • R${" "}
                {(
                  parseFloat(
                    produto.preco.replace("R$ ", "").replace(",", ".")
                  ) * quantidade
                ).toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
