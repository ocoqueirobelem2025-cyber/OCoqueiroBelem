"use client";
import { AlertTriangle, Lock, CreditCard, Clock } from "lucide-react";

export default function BlockedPage() {
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background com padrão vermelho */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950 to-black" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(220, 38, 38, 0.1) 10px,
            rgba(220, 38, 38, 0.1) 20px
          )`
        }} />
      </div>

      {/* Ícone de alerta animado */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 animate-pulse">
        <div className="relative">
          <div className="absolute inset-0 bg-red-600 blur-2xl opacity-50 rounded-full" />
          <AlertTriangle className="relative text-red-500" size={80} strokeWidth={2} />
        </div>
      </div>

      {/* Conteúdo principal */}
      <section className="relative container mx-auto px-6 sm:px-8 py-32 flex flex-col items-center text-center">
        
        {/* Ícone de cadeado */}
        <div className="relative w-32 h-32 mb-8 mt-16">
          <div className="absolute inset-0 bg-red-600/20 rounded-full animate-ping" />
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-2xl border-4 border-red-500">
            <Lock size={64} className="text-white" />
          </div>
        </div>

        {/* Título principal */}
        <h1 className="text-4xl sm:text-6xl font-black text-red-500 mb-4 tracking-tight drop-shadow-lg">
          SITE BLOQUEADO
        </h1>

        <div className="w-24 h-1 bg-red-600 mb-8 rounded-full" />

        {/* Mensagem */}
        <div className="bg-red-950/50 backdrop-blur-md border-2 border-red-600 rounded-2xl p-8 sm:p-12 max-w-2xl shadow-2xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <CreditCard className="text-red-500" size={32} />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Pagamento Pendente
            </h2>
          </div>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-6">
            O acesso a este site foi <span className="text-red-400 font-bold">temporariamente suspenso</span> devido a pagamento em atraso.
          </p>

          <div className="bg-black/50 rounded-xl p-6 mb-8 border border-red-800">
            <div className="flex items-start gap-3 text-left">
              <Clock className="text-red-400 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="text-gray-200 font-semibold mb-2">
                  Status da Conta:
                </p>
                <p className="text-red-400 font-bold text-xl">
                  PAGAMENTO VENCIDO
                </p>
              </div>
            </div>
          </div>

          <p className="text-gray-400 text-sm mb-8">
            Para reativar o acesso imediatamente, por favor regularize sua situação de pagamento.
          </p>

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg hover:scale-105 transition-all border-2 border-red-500"
            >
              Realizar Pagamento
            </a>
            <a
              href="#"
              className="px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 text-white font-semibold shadow-lg hover:scale-105 transition-all border-2 border-gray-600"
            >
              Suporte Financeiro
            </a>
          </div>
        </div>

        {/* Informações de contato */}
        <div className="mt-12 text-gray-400 text-sm max-w-md">
          <p className="mb-2">
            Em caso de dúvidas ou para regularizar sua situação:
          </p>
          <p className="text-red-400 font-semibold">
            📧 leoo2771@gmail.com
          </p>
          <p className="text-red-400 font-semibold">
            📱 (91) 98269-0087
          </p>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="relative border-t border-red-900/50 py-6 text-center text-gray-500 text-sm">
        <p>© 2025 O Coqueiro Belém - Todos os direitos reservados</p>
      </footer>

      {/* Barra de alerta superior */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-3 px-6 text-center font-bold text-sm sm:text-base shadow-lg z-50 flex items-center justify-center gap-2">
        <AlertTriangle size={20} />
        <span>ACESSO RESTRITO - PAGAMENTO PENDENTE</span>
        <AlertTriangle size={20} />
      </div>
    </main>
  );
}