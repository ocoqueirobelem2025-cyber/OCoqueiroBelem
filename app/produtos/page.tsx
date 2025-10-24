"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, ShoppingCart, CheckCircle2, Leaf } from "lucide-react";
import { products, categorias, type Product } from "@/lib/products";

interface CartItem {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  imagem: string;
  quantidade: number;
}

export default function ProdutosPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Todos");
  const [recentlyAdded, setRecentlyAdded] = useState<number | null>(null);

  // carregar carrinho
  useEffect(() => {
    const saved = localStorage.getItem("carrinho");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  // salvar carrinho
  useEffect(() => {
    if (cart.length > 0)
      localStorage.setItem("carrinho", JSON.stringify(cart));
    else localStorage.removeItem("carrinho");
  }, [cart]);

  const categoriasComTodos = ["Todos", ...categorias];

  const produtosFiltrados = useMemo(() => {
    if (categoriaSelecionada === "Todos") return products;
    return products.filter((p) => p.categoria === categoriaSelecionada);
  }, [categoriaSelecionada]);

  const adicionarAoCarrinho = (produto: Product) => {
    setCart((prev) => {
      const existente = prev.find((i) => i.id === produto.id);
      if (existente) {
        return prev.map((i) =>
          i.id === produto.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      } else {
        return [
          ...prev,
          {
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco,
            imagem: produto.imagem,
            quantidade: 1,
          },
        ];
      }
    });
    setRecentlyAdded(produto.id);
    setTimeout(() => setRecentlyAdded(null), 1800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-white">
      {/* Cabeçalho */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-900 transition-colors"
          >
            <Home size={18} />
            Início
          </Link>

          <h1 className="font-bold text-emerald-900 text-lg sm:text-xl flex items-center gap-2">
            <Leaf size={20} className="text-emerald-600" />
            Cardápio Natural
          </h1>

          <Link href="/pedidos" className="relative text-emerald-700">
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 grid place-items-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Filtro de categorias */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-3">
          {categoriasComTodos.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSelecionada(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                categoriaSelecionada === cat
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-white text-emerald-800 border-emerald-200 hover:border-emerald-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Vitrine */}
      <main className="container mx-auto px-4 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtosFiltrados.map((p) => (
          <div
            key={p.id}
            className={`bg-white rounded-2xl border border-emerald-100 shadow-sm flex flex-col overflow-hidden transition-all duration-300 ${
              recentlyAdded === p.id
                ? "animate-pop border-emerald-300 shadow-emerald-200"
                : "hover:shadow-md hover:-translate-y-1"
            }`}
          >
            <div className="relative w-full h-48 bg-emerald-50">
              <Image
                src={p.imagem}
                alt={p.nome}
                fill
                className="object-contain p-3"
                sizes="(max-width:768px) 100vw, (max-width:1280px) 33vw, 400px"
              />
            </div>
            <div className="flex flex-col flex-1 p-5">
              <h2 className="text-emerald-900 font-semibold text-lg mb-1">
                {p.nome}
              </h2>
              <p className="text-sm text-black flex-1">{p.descricao}</p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-emerald-800">
                  R$ {p.preco.toFixed(2)}
                </span>
                <button
                  onClick={() => adicionarAoCarrinho(p)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                    recentlyAdded === p.id
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1"
                      : "bg-emerald-600 text-white hover:bg-emerald-700 shadow"
                  }`}
                >
                  {recentlyAdded === p.id ? (
                    <>
                      <CheckCircle2 size={16} /> Adicionado
                    </>
                  ) : (
                    "Adicionar"
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* animação customizada */}
      <style jsx global>{`
        @keyframes pop {
          0% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(16, 185, 129, 0);
          }
          40% {
            transform: scale(1.05);
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 0 rgba(16, 185, 129, 0);
          }
        }
        .animate-pop {
          animation: pop 0.35s ease-out;
        }
      `}</style>
    </div>
  );
}
