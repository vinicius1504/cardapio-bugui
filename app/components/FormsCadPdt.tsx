"use client";
import React from "react";

interface FormCadastroProdutoProps {
  fecharModal: () => void; // Add fecharModal prop
}

export default function FormCadastroProduto({
  fecharModal,
}: FormCadastroProdutoProps) {
  const [form, setForm] = React.useState({
    nome: "",
    descricao: "",
    preco: "",
    imagem: "",
    categoria: "",
    ativo: true,
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Produto cadastrado com sucesso!");
      setForm({
        nome: "",
        descricao: "",
        preco: "",
        imagem: "",
        categoria: "",
        ativo: true,
      });
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
        <input
          type="checkbox"
          name="ativo"
          checked={form.ativo}
          onChange={handleChange}
          id="ativo"
        />
        <label htmlFor="ativo">Produto ativo</label>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={fecharModal} // Use fecharModal to close the modal
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
