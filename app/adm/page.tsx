"use client";

import { useProdutos } from "../hooks/useProducts";

export default function ProdutosPage() {
  const { produtos, loading } = useProdutos();

  if (loading) return <p className="text-gray-600">Carregando produtos...</p>;

  return (
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
  );
}
