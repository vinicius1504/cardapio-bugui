import Image from "next/image";
import { ShoppingCart } from "@deemlol/next-icons";
import { motion } from "framer-motion";
// import { adicionar } from "./CarrinhoContext";
import { useCarrinho } from "../../layout/Shoppingcart/CarrinhoContext";
import { Star } from "lucide-react";


interface ProdutoProps {
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  avaliacao?: string;
};



export default function ProdutoCard({nome, descricao,preco,imagem,avaliacao = '4,5'}: ProdutoProps) {
  const { adicionar } = useCarrinho();

  return (
    <motion.div
      className="bg-white shadow-md rounded-lg p-4 flex xl:flex-row sm:flex-col sm:text-hidden h-[200px]"
      whileHover={{ scale: 1.0 }}
      whileTap={{ scale: 0.95 }}
      // onHoverStart={() => console.log('hover started!')}
    >
       <div className="min-w-[140px] h-[140px] rounded-2xl overflow-hidden mr-5">
        <Image
          src={imagem || "/placeholder.webp"} // Use a fallback image if imagem is empty
          alt={nome}
          width={140}
          height={140}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-red-700">{nome}</h3>
          <div className="flex items-center gap-1 text-yellow-500 font-medium">
            <span className="text-xl"><Star color="#FFC300" strokeWidth={1.75} fill="#FFC300"/></span>
            <span className="text-gray-700 text-sm">{avaliacao}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 leading-snug line-clamp-3">
          {descricao}
        </p>

        <div className="flex justify-between items-end mt-2">
          <p className="text-lg font-bold text-red-600">{preco}</p>
          <button
            onClick={() =>
              adicionar({
                              nome,
                              preco,
                              descricao,
                              categoria: "default", // Replace "default" with the appropriate category
                              imagem: imagem || "/lanche.jpg",
                              ativo: true, // Add the required 'ativo' property
                            }, 1) // Pass a default quantidade of 1
            }
          className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition">
            <ShoppingCart size={18} color="#fff" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
