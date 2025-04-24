"use client";

import { useState } from "react"; // Import useState
import { useProducts } from "../hooks/useProducts";
import FormCadastroProduto from "../components/FormsCadPdt";
import ModalProduto from "../components/ui/ModalProduto";

export default function ProdutosPage() {
  const { produtos, loading } = useProducts();
  const [modalAberto, setModalAberto] = useState(false); // Add state for modal

  if (loading) return <p className="text-gray-600">Carregando produtos...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <button
          onClick={() => setModalAberto(true)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Novo Produto
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Lista de Produtos</h2>
        <table className="w-full bg-white shadow rounded">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Categoria</th>
              <th className="p-3 text-left">Preço</th>
              <th className="p-3 text-left">Ativo</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p, i) => (
              <tr key={i} className="border-b hover:bg-gray-100">
                <td className="p-3">{p.nome}</td>
                <td className="p-3">{p.categoria}</td>
                <td className="p-3">{p.preco}</td>
                <td className="p-3">{p.ativo ? "Sim" : "Não"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalProduto isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        <FormCadastroProduto fecharModal={() => setModalAberto(false)} />
      </ModalProduto>
    </div>
  );
}
