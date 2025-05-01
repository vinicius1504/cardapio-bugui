"use client";
import { useCep } from "@/hooks/useCep";
import { useState, useEffect } from "react";

export default function ConfiguracoesPage() {
  const [cep, setCep] = useState("");
  const { endereco, setEndereco, buscarCep } = useCep();

  const [form, setForm] = useState({
    nomeEmpresa: "",
    logo: "",
    horario: "",
    telefone: "",
    corPrimaria: "#c62828",
    corSecundaria: "#f5f5f5",
    corTexto: "#333333",
    corDestaque: "#ff9800",
  });

  useEffect(() => {
    if (cep.length === 8 || cep.length === 9) {
      buscarCep(cep);
    }
  }, [cep]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Configuração salva:", { ...form, ...endereco });
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6 text-red-700">Configurações da Empresa</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Nome da empresa</label>
          <input name="nomeEmpresa" value={form.nomeEmpresa} onChange={handleChange} className="w-full p-2 border rounded" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Telefone</label>
            <input name="telefone" value={form.telefone} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Horário de funcionamento</label>
            <input name="horario" value={form.horario} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Logo (URL)</label>
          <input name="logo" value={form.logo} onChange={handleChange} type="url" className="w-full p-2 border rounded" />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">CEP</label>
            <input
              value={cep}
              onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium">Rua</label>
            <input
              value={endereco.rua}
              onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium">Cidade</label>
            <input
              value={endereco.cidade}
              onChange={(e) => setEndereco({ ...endereco, cidade: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <h2 className="text-lg font-bold mt-6">Cores da Marca</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-1">Primária 🔴</label>
            <input type="color" name="corPrimaria" value={form.corPrimaria} onChange={handleChange} className="w-full h-10 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Secundária ⚪</label>
            <input type="color" name="corSecundaria" value={form.corSecundaria} onChange={handleChange} className="w-full h-10 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Texto 🖋️</label>
            <input type="color" name="corTexto" value={form.corTexto} onChange={handleChange} className="w-full h-10 rounded" />
          </div>
          <div>
            <label className="block text-sm mb-1">Destaque 🔘</label>
            <input type="color" name="corDestaque" value={form.corDestaque} onChange={handleChange} className="w-full h-10 rounded" />
          </div>
        </div>

        <button type="submit" className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Salvar Configurações
        </button>
      </form>
    </div>
  );
}
