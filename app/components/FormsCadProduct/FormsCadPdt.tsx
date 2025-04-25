"use client";
import React from "react";
import { useProducts } from "../../hooks/useProducts";
// import { ProdutoT } from "@/@types/Produto";

interface FormCadastroProdutoProps {
  fecharModal: () => void;
}

export default function FormCadastroProduto({
  fecharModal,
}: FormCadastroProdutoProps) {
  const { createProduto } = useProducts();

  const [form, setForm] = React.useState({
    nome: "",
    descricao: "",
    preco: "",
    imagem: "",
    categoria: "",
    ativo: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProduto(form);
      alert("Produto cadastrado com sucesso!");
      fecharModal(); // Fecha o modal após salvar
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Erro ao cadastrar produto.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label>Descrição</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label>Preço</label>
        <input
          type="number"
          name="preco"
          value={form.preco}
          onChange={handleChange}
          step="0.01"
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label>Categoria</label>
        <input
          type="text"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label>URL da imagem</label>
        <input
          type="url"
          name="imagem"
          value={form.imagem}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="flex items-center gap-2">
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
          <span className="text-sm">
            {form.ativo ? "Ativado" : "Desativado"}
          </span>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={fecharModal}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="ml-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Salvar
        </button>
      </div>
    </form>
  );
}
