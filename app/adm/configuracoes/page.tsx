"use client";
import { useState, useEffect } from "react";
import { useConfig } from "@/hooks/useConfig";
import { useCep } from "@/hooks/useCep";
import { useAlert } from "@/hooks/useAlert";
import Alert from "@/components/ui/alerts";
// import { ConfigT } from "@/.@types/Config"; // Ajuste o caminho conforme necessário

export default function ConfiguracoesPage() {
  const { config, saveConfig } = useConfig();
  const { showSuccess, showError, alertState, closeAlert } = useAlert();
  const { endereco, buscarCep } = useCep();

  const [form, setForm] = useState({
    nome: "",
    logo: "",
    rua: "",
    cidade: "",
    cep: "",
    telefone: "",
    horario: "",
    corPrimaria: "#b91c1c",
    corSecundaria: "#f5f5f5",
    corDestaque: "#f59e0b",
    corTexto: "#1f2937",
  });

  useEffect(() => {
    if (config) {
      setForm({ ...form, ...config });
    }
  }, [config]);

  useEffect(() => {
    if (form.cep.length === 8 || form.cep.length === 9) {
      buscarCep(form.cep);
    }
  }, [form.cep]);

  useEffect(() => {
    if (endereco.rua) {
      setForm((prev) => ({
        ...prev,
        rua: endereco.rua,
        cidade: endereco.cidade,
      }));
    }
  }, [endereco]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await saveConfig(form);
      showSuccess("Configurações salvas com sucesso!");
    } catch {
      showError("Erro ao salvar configurações.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-red-700">Configurações da Empresa</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome da empresa"
            className="p-2 border rounded w-full"
          />
          <input
            name="logo"
            value={form.logo}
            onChange={handleChange}
            placeholder="URL do logo"
            className="p-2 border rounded w-full"
          />
          <input
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            placeholder="Telefone"
            className="p-2 border rounded w-full"
          />
          <input
            name="horario"
            value={form.horario}
            onChange={handleChange}
            placeholder="Horário de funcionamento"
            className="p-2 border rounded w-full"
          />
          <input
            name="cep"
            value={form.cep}
            onChange={handleChange}
            placeholder="CEP"
            className="p-2 border rounded w-full"
          />
          <input
            name="cidade"
            value={form.cidade}
            onChange={handleChange}
            placeholder="Cidade"
            className="p-2 border rounded w-full"
          />
          <input
            name="rua"
            value={form.rua}
            onChange={handleChange}
            placeholder="Rua"
            className="p-2 border rounded w-full"
          />
        </div>

        <h2 className="text-lg font-semibold mt-6">Cores do Tema</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm">Primária</label>
            <input
              type="color"
              name="corPrimaria"
              value={form.corPrimaria}
              onChange={handleChange}
              className="w-full h-10"
            />
          </div>
          <div>
            <label className="text-sm">Secundária</label>
            <input
              type="color"
              name="corSecundaria"
              value={form.corSecundaria}
              onChange={handleChange}
              className="w-full h-10"
            />
          </div>
          <div>
            <label className="text-sm">Destaque</label>
            <input
              type="color"
              name="corDestaque"
              value={form.corDestaque}
              onChange={handleChange}
              className="w-full h-10"
            />
          </div>
          <div>
            <label className="text-sm">Texto</label>
            <input
              type="color"
              name="corTexto"
              value={form.corTexto}
              onChange={handleChange}
              className="w-full h-10"
            />
          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
          >
            Salvar Configurações
          </button>
        </div>
      </form>

      {/* ALERTA VISUAL */}
      <Alert
        isOpen={alertState.isOpen}
        onClose={closeAlert}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
      />
    </div>
  );
}
