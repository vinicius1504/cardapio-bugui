// app/admin/page.tsx
"use client";
import { useState } from "react";
import NavBarAdm from "../components/NavBarAdm";
import FormCad from "../components/FormsCadPdt";

export default function AdminPage() {
  const [section, setSection] = useState("dashboard");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <NavBarAdm />

      {/* Conteúdo */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        {section === "dashboard" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            {/* cards de estatísticas */}
          </div>
        )}

        {section === "produtos" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Produtos</h2>
            {/* listagem de produtos */}
          </div>
        )}

        {section === "Adicionar Produtos" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Novo Produto</h2>
            {/* formulário de cadastro */}
            <FormCad />
          
          </div>
        )}
      </main>
    </div>
  );
}
