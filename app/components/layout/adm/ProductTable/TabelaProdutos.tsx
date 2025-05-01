import React from "react";

// <div className="p-4 overflow-y-scroll max-h-[calc(100vh-250px)]">

interface Produto {
  nome: string;
  categoria: string;
  preco: number | string;
  ativo: boolean;
  imagem: string;
  descricao: string;
}

interface TabelaProdutosProps {
  produtos: Produto[];
  onEditar?: (produto: Produto) => void;
}

export default function TabelaProdutos({ produtos, onEditar }: TabelaProdutosProps) {
  return (
    <div className="p-4 overflow-y-scroll max-h-[calc(100vh-250px)] mt-15">
      <table className="min-w-full text-sm text-left">
        <thead className="text-xs uppercase bg-gray-100 text-gray-500">
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Categoria</th>
            <th className="px-4 py-2">Preço</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {produtos.map((p, i) => (
            <tr
              key={i}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="px-4 py-2 font-semibold">{p.nome}</td>
              <td className="px-4 py-2">{p.categoria}</td>
              <td className="px-4 py-2">{p.preco}</td>
              <td className="px-4 py-2">
                <span
                  className={`text-sm font-medium px-2 py-1 rounded-full ${
                    p.ativo ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                  }`}
                >
                  {p.ativo ? "Ativo" : "Inativo"}
                </span>
              </td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => onEditar?.(p)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}