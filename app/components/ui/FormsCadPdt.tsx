"use client";
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useAlert } from "@/hooks/useAlert";
import Alert from "./alerts";

interface FormCadastroProdutoProps {
  fecharModal: () => void;
  produto?: any;
  modo: "editar" | "cadastrar";
}

export default function FormCadastroProduto({
  fecharModal,
  produto,
  modo,
}: FormCadastroProdutoProps) {
  const { showSuccess, showError, alertState, closeAlert } = useAlert();
  const { createProduto, updateProduto } = useProducts();
  const [form, setForm] = useState({
    id: null, // Adicionado para armazenar o ID do produto
    nome: "",
    descricao: "",
    preco: "",
    categoria: "",
    imagem: "",
    ativo: true,
  });

  useEffect(() => {
    if (produto) {
      setForm({
        id: produto.id ?? null, // Preenche o ID do produto, se existir
        nome: produto.nome ?? "",
        descricao: produto.descricao ?? "",
        preco: produto.preco ?? "",
        categoria: produto.categoria ?? "",
        imagem: produto.imagem ?? "",
        ativo: produto.ativo ?? true,
      });
    }
  }, [produto]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
  
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "preco"
          ? formatarPreco(value)
          : type === "checkbox"
          ? checked
          : value,
    }));
  };
  
  const formatarPreco = (valor: string) => {
    const valorNumerico = parseFloat(valor.replace(/[^\d]/g, "")) / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorNumerico);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const produtoData = {
      ...form,
      preco: form.preco, // Mantendo o preço como string
    };
  
    try {
      if (modo === "editar" && form.id) {
        await updateProduto(form.id, produtoData);
        showSuccess("Produto atualizado com sucesso!");
      } else {
        await createProduto(produtoData);
        showSuccess("Produto cadastrado com sucesso!");
      }
      fecharModal();
    } catch (error) {
      showError("Erro ao salvar o produto.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 w-full max-w-2xl">
      <h2 className="text-lg font-bold">
        {modo === "editar" ? "Editar Produto" : "Cadastrar Produto"}
      </h2>
      <div>
        <label className="block text-sm font-medium mb-1">Nome</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="w-full border border-black p-2 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descrição</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="w-full border border-black p-2 rounded"
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Preço</label>
          <input
            type="text"
            name="preco"
            value={form.preco}
            onChange={handleChange}
            className="w-full border border-black p-2 rounded"
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Categoria</label>
          <input
            type="text"
            name="categoria"
            value={form.categoria}
            onChange={handleChange}
            className="w-full border border-black p-2 rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">URL da imagem</label>
        <input
          type="text"
          name="imagem"
          value={form.imagem}
          onChange={handleChange}
          className="w-full border border-black p-2 rounded"
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm">Status:</label>
        <div
          onClick={() => setForm((prev) => ({ ...prev, ativo: !prev.ativo }))}
          className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
            form.ativo ? "bg-green-500" : "bg-gray-400"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
              form.ativo ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
        <span className="text-sm">{form.ativo ? "Ativado" : "Desativado"}</span>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={fecharModal}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Salvar
        </button>
      </div>
      <Alert
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        confirmText={alertState.confirmText}
        cancelText={alertState.cancelText}
        showCancel={alertState.showCancel}
        onConfirm={alertState.onConfirm}
      />
    </form>
  );
}
