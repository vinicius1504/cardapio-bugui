"use client";
import { motion } from "framer-motion";
import { useProducts } from "@/.hooks/useProducts";

export default function DashboardPage() {
  const { produtos } = useProducts();

  const total = produtos.length;
  const ativos = produtos.filter((p) => p.ativo).length;
  const inativos = total - ativos;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  const cards = [
    { title: "Total de Produtos", value: total, color: "bg-gray-600" },
    { title: "Produtos Ativos", value: ativos, color: "bg-gray-600" },
    { title: "Produtos Inativos", value: inativos, color: "bg-gray-600" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Resumo do Cardápio</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className={`p-6 rounded-lg text-white shadow-lg ${card.color}`}
          >
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-3xl mt-2 font-bold">{card.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
