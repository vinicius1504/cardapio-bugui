import React from "react";
import { Edit, Trash } from "lucide-react";

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
  onEditar: (produto: Produto) => void;
}

const TabelaProdutos: React.FC<TabelaProdutosProps> = ({ produtos, onEditar }) => {
  return (
    <div className="p-4 overflow-y-scroll max-h-[calc(100vh-250px)]">
      <h2 className="text-xl font-bold mb-4">Lista de Produtos</h2>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Categoria</th>
            <th className="p-3 text-left">Preço</th>
            <th className="p-3 text-left">Ativo</th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p, i) => (
            <tr key={i} className="border-b hover:bg-gray-100">
              <td className="p-3">{p.nome}</td>
              <td className="p-3">{p.categoria}</td>
              <td className="p-3">{p.preco}</td>
              <td className="p-3">{p.ativo ? "Sim" : "Não"}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => onEditar(p)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit className="w-5 h-5" />
                </button> 
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
    
  );
};

export default TabelaProdutos;
