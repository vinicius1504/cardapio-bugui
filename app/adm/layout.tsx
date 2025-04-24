// app/admin/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="min-h-screen flex">
        <aside className="w-60 bg-red-700 text-white"> {/* Sidebar aqui */} </aside>
        <main className="flex-1 bg-gray-50 p-6">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-bold">Área Administrativa</h1>
          </header>
          {children}
        </main>
      </div>
    );
  }
  