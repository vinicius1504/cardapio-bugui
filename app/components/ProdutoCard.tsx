import Image from "next/image";
import { ShoppingCart } from "@deemlol/next-icons";
import { motion } from "framer-motion";
// import { adicionar } from "./CarrinhoContext";
import { useCarrinho } from "./CarrinhoContext";

type ProdutoProps = {
  nome: string;
  descricao: string;
  preco: string;
  imagem?: string;
};

export default function ProdutoCard({nome, descricao,preco,imagem = "/lanche.jpg",}: ProdutoProps) {
  const { adicionar } = useCarrinho();

  return (
    <motion.div
      className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between w-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      // onHoverStart={() => console.log('hover started!')}
    >
        {/* Topo */}
        <div className="flex items-center gap-4">
          <Image
            src={imagem}
            alt={nome}
            width={70}
            height={70}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col flex-1">
            <h3 className="text-base font-bold text-red-700 line-clamp-2">
              {nome}
            </h3>
            <p className="text-xs text-gray-600 line-clamp-3">{descricao}</p>
          </div>
        </div>

        {/* Base */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-lg font-semibold text-red-600">{preco}</p>
          <button 
            onClick={() =>
              adicionar({
                nome,
                preco,
                imagem: imagem || "/lanche.jpg",
                // quantidade: 1,
              })
            }
          
          className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition">
            <ShoppingCart size={18} color="#fff" />
          </button>
        </div>
    </motion.div>
  );
}
