"use client";
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import FormCadastroProduto from "../../components/ui/FormsCadPdt";
import ModalProduto from "../../components/ui/ModalProduto";
import TabelaProdutos from "../../components/Produtos/ProductTable/TabelaProdutos";

export default function ProdutosPage() {
  const { produtos, loading } = useProducts();
  const [modalAberto, setModalAberto] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null); // 👈 Novo estado

  const abrirModalNovo = () => {
    setProdutoSelecionado(null); // resetar para novo produto
    setModalAberto(true);
  };

  const abrirModalEditar = (produto: any) => {
    setProdutoSelecionado({ ...produto, id: produto._id }); // Garante que o ID seja passado corretamente
    setModalAberto(true);
  };

  if (loading) return <p className="text-gray-600">Carregando produtos...</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <button
          onClick={abrirModalNovo}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Novo Produto
        </button>
      </div>

      <TabelaProdutos produtos={produtos} onEditar={abrirModalEditar} />

      <ModalProduto isOpen={modalAberto} onClose={() => setModalAberto(false)}>
        <FormCadastroProduto
          fecharModal={() => setModalAberto(false)}
          produto={produtoSelecionado} // 👈 passar produto como prop
          modo={produtoSelecionado ? "editar" : "cadastrar"} // Define o modo
        />
      </ModalProduto>
    </div>
  );
}
