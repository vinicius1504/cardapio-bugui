"use client";
import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
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

    const res = await fetch("http://localhost:3001/produtos", {
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
    <div className="max-w-2xl mx-auto p-8 bg-white mt-10 rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-red-700">Cadastrar Produto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="preco"
          value={form.preco}
          onChange={handleChange}
          placeholder="Preço (ex: R$ 42,00)"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <input
          name="imagem"
          value={form.imagem}
          onChange={handleChange}
          placeholder="URL da imagem"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          placeholder="Categoria"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="ativo"
            checked={form.ativo}
            onChange={handleChange}
          />
          <span>Produto Ativo</span>
        </label>
        <button
          type="submit"
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
