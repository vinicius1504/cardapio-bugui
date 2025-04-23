import React, { useState } from "react";

export default function NavBarAdm() {
  const [section, setSection] = useState("dashboard");
  return (
    <aside className="w-64 bg-red-800 text-white flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <nav className="flex flex-col gap-2">
        {["dashboard", "products", "add-product", "orders", "settings"].map(
          (s) => (
            <button
              key={s}
              className={`text-left p-2 rounded hover:bg-red-700 ${
                section === s ? "bg-red-700" : ""
              }`}
              onClick={() => setSection(s)}
            >
              {s.replace("-", " ").toUpperCase()}
            </button>
          )
        )}
        

        <button
          onClick={() => alert("Logout")}
          className="mt-auto bg-white text-red-800 p-2 rounded"
        >
          Sair
        </button>
      </nav>
    </aside>
  );
}
