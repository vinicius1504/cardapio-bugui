// components/admin/FormConfig.tsx

"use client";

import { useState } from "react";

export default function FormConfig() {
  const [form, setForm] = useState({
    primaryColor: "#c62828",
    secondaryColor: "#e0e0e0",
    nomeEmpresa: "",
    telefone: "",
    endereco: "",
    horario: "",
    logoUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Configuração salva:", form);
    alert("Configurações salvas com sucesso!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-8">
      <h2 className="text-2xl font-bold mb-6">Configurações</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Cor Primária</label>
          <input
            type="color"
            name="primaryColor"
            value={form.primaryColor}
            onChange={handleChange}
            className="w-full h-10"
          />
        </div>

        <div>
          <label className="block mb-1">Cor Secundária</label>
          <input
            type="color"
            name="secondaryColor"
            value={form.secondaryColor}
            onChange={handleChange}
            className="w-full h-10"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">Nome da Empresa</label>
        <input
          type="text"
          name="nomeEmpresa"
          value={form.nomeEmpresa}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block mb-1">Telefone</label>
        <input
          type="text"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block mb-1">Endereço</label>
        <input
          type="text"
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block mb-1">Horário de Atendimento</label>
        <input
          type="text"
          name="horario"
          value={form.horario}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block mb-1">Logo (URL)</label>
        <input
          type="url"
          name="logoUrl"
          value={form.logoUrl}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />
      </div>

      <button
        type="submit"
        className="bg-red-700 text-white px-6 py-2 rounded hover:bg-red-800 mt-4"
      >
        Salvar Configurações
      </button>
    </form>
  );
}
