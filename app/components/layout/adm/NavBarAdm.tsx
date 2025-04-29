// components/admin/Sidebar.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/adm", label: "Dashboard" },
    { href: "/adm/cadastrar", label: "Cadastro de Produtos" },
    { href: "/adm/config", label: "Configurações" },
  ];

  return (
    <aside className="h-screen w-60 bg-red-700 text-white p-5 flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Admin</h1>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 rounded ${
              pathname === link.href ? "bg-red-800" : "hover:bg-red-600"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
