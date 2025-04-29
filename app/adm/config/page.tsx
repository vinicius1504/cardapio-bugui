import Sidebar from "@/adm/layout/adm/NavBarAdm";
import FormConfig from "@/adm/layout/adm/FormConfig";

export default function ConfigPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <FormConfig />
      </main>
    </div>
  );
}
