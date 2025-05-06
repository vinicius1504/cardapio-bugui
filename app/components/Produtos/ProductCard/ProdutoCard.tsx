import Image from "next/image";
import { ShoppingCart } from "@deemlol/next-icons";
import { motion } from "framer-motion";
// import { adicionar } from "./CarrinhoContext";
import { useCarrinho } from "@/.components/layout/Shoppingcart/CarrinhoContext";
import { Star } from "lucide-react";

interface ProdutoProps {
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  avaliacao?: string;
}

export default function ProdutoCard({
  nome,
  descricao,
  preco,
  imagem,
  avaliacao = "4,5",
}: ProdutoProps) {
  const { adicionar } = useCarrinho();

  return (
    <motion.div
      className="bg-[var(--cor-secundaria)] shadow-md rounded-lg p-4 flex xl:flex-row sm:flex-col sm:text-hidden h-[200px]"
      whileHover={{ scale: 1.0 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="min-w-[140px] h-[140px] rounded-2xl overflow-hidden mr-5 mt-3">
        <Image
          src={imagem || "/placeholder.webp"}
          alt={nome}
          width={140}
          height={140}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-[var(--cor-primaria)]">
            {nome}
          </h3>
        </div>

        <p className="text-sm text-[var(--cor-texto)] leading-snug line-clamp-3">
          {descricao}
        </p>

        <div className="flex justify-between items-end mt-2">
          <p className="text-lg font-bold text-[var(--cor-primaria)]">
            {preco}
          </p>

          <button
            onClick={() =>
              adicionar(
                {
                  nome,
                  preco,
                  descricao,
                  categoria: "default",
                  imagem: imagem || "/lanche.jpg",
                  ativo: true,
                },
                1
              )
            }
            className="bg-[var(--cor-primaria)] text-white p-2 rounded-full hover:brightness-90 transition"
          >
            <ShoppingCart size={18} color="#fff" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
