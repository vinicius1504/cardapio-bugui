// app/checkout/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useCarrinho } from "@/components/Shoppingcart/CarrinhoContext";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowBigLeftDash } from "lucide-react";

export default function CheckoutPage() {
  const { itens, total, limpar } = useCarrinho();
  const router = useRouter();
  const [pagamento, setPagamento] = useState("cartao");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState({ rua: "", cidade: "" });

  const buscarCep = async (cep: string) => {
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      if (!res.ok) throw new Error("Erro ao buscar CEP");
      const data = await res.json();
      setEndereco({
        rua: data.logradouro || "",
        cidade: data.localidade || "",
      });
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  useEffect(() => {
    if (cep.length === 8 || cep.length === 9) {
      buscarCep(cep);
    }
  }, [cep]);

  return (
    <div className="max-w-6xl mx-auto p-6 text-gray-800 bg-white">
      <button
        onClick={() => router.back()}
        className="mb-4 text-red-600 hover:underline text-sm flex items-center gap-2"
      >
        <ArrowBigLeftDash /> Voltar
      </button>

      <h1 className="text-2xl font-bold mb-6 text-red-700 ">Finalizar Pedido</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Formulário */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold mb-4">Informações de Entrega</h2>
          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Nome completo"
          />
          <div className="flex gap-2 mb-3">
            <input
              className="w-1/2 border p-2 rounded"
              placeholder="Telefone"
            />
            <input className="w-1/2 border p-2 rounded" placeholder="Email" />
          </div>
          <input
            className="w-full border p-2 mb-3 rounded"
            placeholder="Endereço"
            value={endereco.rua}
            onChange={(e) => setEndereco({ ...endereco, rua: e.target.value })}
          />
          <div className="flex gap-2 mb-3">
            <input
              className="w-1/2 border p-2 rounded"
              placeholder="Cidade"
              value={endereco.cidade}
              onChange={(e) =>
                setEndereco({ ...endereco, cidade: e.target.value })
              }
            />
            <input
              className="w-1/2 border p-2 rounded"
              placeholder="CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
            />
          </div>

          <div className="flex gap-2 mb-3">
            {["cartao", "pix", "dinheiro"].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setPagamento(tipo)}
                className={`flex-1 p-2 border rounded capitalize ${
                  pagamento === tipo
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-red-600 border-red-300"
                }`}
              >
                {tipo}
              </button>
            ))}
          </div>

          <textarea
            className="w-full border p-2 rounded"
            placeholder="Observações"
            rows={3}
          />

          <button
            onClick={() => {
              alert("Pedido confirmado!");
              limpar();
              router.push("/");
            }}
            className="w-full bg-green-700 text-white py-3 mt-6 rounded font-semibold"
          >
            Finalizar Pedido
          </button>
        </div>

        {/* Resumo do Pedido */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="font-semibold mb-4">Resumo do Pedido</h2>
          {itens.length === 0 ? (
            <p className="text-gray-500">Carrinho vazio.</p>
          ) : (
            <ul className="space-y-4 text-sm">
              {itens.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.imagem || "/placeholder.webp"} // Use a fallback image if item.imagem is empty
                      alt={item.nome}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <div>
                      <p className="font-medium">{item.nome}</p>
                      <p className="text-gray-500 text-xs">
                        {item.quantidade}x {item.preco}
                      </p>
                    </div>
                  </div>
                  <span className="font-semibold text-red-700">
                    R${" "}
                    {Number(item.preco.replace("R$ ", "").replace(",", ".")) *
                      (item.quantidade ?? 0)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <div className="border-t pt-4 mt-4 text-base font-semibold">
            Total: <span className="text-red-700">R$ {total().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
