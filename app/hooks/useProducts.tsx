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
    const res = await fetch("http://localhost:5000/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoProduto),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      setProdutos((prev) => [...prev, data]); // Atualiza o estado com o novo produto
      return data;
    } else {
      throw new Error(data.message || "Erro ao criar produto");
    }
  };
  
  const updateProduto = async (id: string, produtoAtualizado: ProdutoT) => {
    const res = await fetch(`http://localhost:5000/api/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(produtoAtualizado),
    });
  
    const data = await res.json();
  
    if (res.ok) {
      setProdutos((prev) =>
        prev.map((p) => (p._id === id ? { ...p, ...data } : p))
      );
      return data;
    } else {
      throw new Error(data.message || "Erro ao atualizar produto");
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
