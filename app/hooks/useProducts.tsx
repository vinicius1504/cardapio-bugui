// hooks/useProducts.ts
import { useEffect, useState } from "react";
import { ProdutoT } from "@/@types/Produto";


export function useProducts() {
  const [produtos, setProdutos] = useState<ProdutoT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProdutos = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/produtos");
      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      setError("Erro ao buscar produtos");
    } finally {
      setLoading(false);
    }
  };

  const createProduto = async (novoProduto: ProdutoT) => {
    try {
      const res = await fetch("http://localhost:5000/api/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoProduto),
      });
      const data = await res.json();
      setProdutos((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError("Erro ao cadastrar produto");
    }
  };

  const updateProduto = async (id: string, produtoAtualizado: ProdutoT) => {
    try {
      const res = await fetch(`http://localhost:5000/api/produtos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(produtoAtualizado),
      });
      const data = await res.json();
      setProdutos((prev) =>
        prev.map((prod) => (prod._id === id ? data : prod))
      );
      return data;
    } catch (err) {
      setError("Erro ao atualizar produto");
    }
  };

  const deleteProduto = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/produtos/${id}`, {
        method: "DELETE",
      });
      setProdutos((prev) => prev.filter((prod) => prod._id !== id));
    } catch (err) {
      setError("Erro ao excluir produto");
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return {
    produtos,
    loading,
    error,
    fetchProdutos,
    createProduto,
    updateProduto,
    deleteProduto,
  };
}
