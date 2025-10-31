// utils/googleSheets.ts
// Integração entre o Front e a API interna

// Envia a atualização do produto para a API interna
export async function atualizarDisponibilidade(produtoId: number, disponivel: boolean) {
  try {
    const res = await fetch("/api/estoque", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ produtoId, disponivel }),
    });

    const data = await res.json();
    console.log("📤 Atualização enviada:", data);
    return data;
  } catch (error) {
    console.error("❌ Erro ao atualizar disponibilidade:", error);
    return { success: false, error };
  }
}

// Atualiza o estoque entre telas (em tempo real)
export function broadcastEstoque(novoEstoque: Record<number, boolean>) {
  if (typeof window !== "undefined") {
    localStorage.setItem("estoque_coqueiro", JSON.stringify(novoEstoque));
    window.dispatchEvent(new Event("estoqueAtualizado"));
  }
}

// Retorna o estoque salvo localmente (usado na vitrine)
export function getEstoqueLocal(): Record<number, boolean> {
  if (typeof window === "undefined") return {};
  const saved = localStorage.getItem("estoque_coqueiro");
  return saved ? JSON.parse(saved) : {};
}
