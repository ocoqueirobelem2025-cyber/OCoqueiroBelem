"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen text-emerald-50 overflow-hidden">
      {/* Banner de fundo */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/img/banner.png"
          alt="Cocos frescos e garrafas de água de coco"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Gradiente para contraste */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 via-emerald-800/40 to-emerald-900/60" />
      </div>

      {/* Conteúdo principal */}
      <section className="relative container mx-auto px-6 sm:px-8 py-24 flex flex-col items-center text-center">
        {/* Imagem da logo personalizada */}
        <div className="relative w-96 h-56 sm:w-[500px] sm:h-[280px] drop-shadow-[0_0_15px_rgba(0,0,0,0.3)]">
          <Image
            src="/img/logo.png" // 👈 salve sua imagem como /public/img/logo-coqueiro.png
            alt="Logo O Coqueiro Belém"
            fill
            className="object-contain"
            priority
          />
        </div>

        <p className="mt-6 text-base sm:text-lg text-emerald-100 max-w-2xl leading-relaxed px-2">
          Refrescância natural e sabor do Pará! Distribuímos água de coco e derivados
          com qualidade, frescor e amor pela natureza.
        </p>

        <div className="mt-10">
          <Link
            href="/produtos"
            className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Ver Produtos
          </Link>
        </div>
      </section>

      {/* Benefícios */}
      <section className="relative container mx-auto px-6 sm:px-8 pb-20">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-xl">
          <h2 className="text-2xl font-bold text-center text-emerald-900 mb-10">
            Por que escolher O Coqueiro Belém?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "100% Natural",
                desc: "Coco fresco selecionado, sem conservantes.",
                icon: "🥥",
              },
              {
                title: "Entrega Rápida",
                desc: "Levamos o sabor do coco até você, no mesmo dia.",
                icon: "🚚",
              },
              {
                title: "Atacado e Varejo",
                desc: "Abasteça sua loja ou garanta seu estoque pessoal.",
                icon: "💧",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-md border border-emerald-100 text-center hover:shadow-lg hover:scale-[1.02] transition-transform"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-emerald-800 text-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-emerald-700 text-sm sm:text-base">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
