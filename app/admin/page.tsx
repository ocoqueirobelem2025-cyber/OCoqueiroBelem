'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package, CheckCircle, XCircle, RefreshCw, Save, Droplets, Home, LogOut } from 'lucide-react';

// Tipos
interface Produto {
  id: number;
  nome: string;
  categoria: string;
  preco: number;
  imagem: string;
}

interface EstoqueState {
  [key: number]: boolean;
}

// Produtos do Coqueiro Belém
const produtos: Produto[] = [
  { id: 1, nome: "Água de Coco Natural 300ml", categoria: "Água de Coco", preco: 5.00, imagem: "/img/agua-300ml.jpg" },
  { id: 2, nome: "Água de Coco Natural 500ml", categoria: "Água de Coco", preco: 8.00, imagem: "/img/agua-500ml.jpg" },
  { id: 3, nome: "Água de Coco Natural 1L", categoria: "Água de Coco", preco: 15.00, imagem: "/img/agua-1l.jpg" },
  { id: 4, nome: "Coco Verde Inteiro", categoria: "Coco Fresco", preco: 6.00, imagem: "/img/coco-inteiro.jpg" },
  { id: 5, nome: "Coco Gelado (unidade)", categoria: "Coco Fresco", preco: 7.00, imagem: "/img/coco-gelado.jpg" },
  { id: 6, nome: "Kit 6 Cocos Verdes", categoria: "Coco Fresco", preco: 35.00, imagem: "/img/kit-6-cocos.jpg" },
  { id: 7, nome: "Polpa de Coco 500g", categoria: "Derivados", preco: 12.00, imagem: "/img/polpa-coco.jpg" },
  { id: 8, nome: "Óleo de Coco 250ml", categoria: "Derivados", preco: 18.00, imagem: "/img/oleo-coco.jpg" },
  { id: 9, nome: "Leite de Coco 200ml", categoria: "Derivados", preco: 10.00, imagem: "/img/leite-coco.jpg" },
  { id: 10, nome: "Chips de Coco 100g", categoria: "Derivados", preco: 8.00, imagem: "/img/chips-coco.jpg" }
];

const STORAGE_KEY = 'coqueiro_belem_estoque';
const AUTH_KEY = 'coqueiro_admin_auth';
const AUTH_TIMESTAMP_KEY = 'coqueiro_admin_timestamp';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 horas

export default function AdminCoqueiroPage() {
  const router = useRouter();
  const [estoque, setEstoque] = useState<EstoqueState>({});
  const [filtroCategoria, setFiltroCategoria] = useState('Todas');
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [mudancasPendentes, setMudancasPendentes] = useState(0);
  const [ultimaSincronizacao, setUltimaSincronizacao] = useState<Date | null>(null);
  const [autenticado, setAutenticado] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Verificar autenticação
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const verificarAuth = () => {
      const auth = localStorage.getItem(AUTH_KEY);
      const timestamp = localStorage.getItem(AUTH_TIMESTAMP_KEY);
      
      if (!auth || !timestamp) {
        router.push('/login');
        return;
      }

      // Verificar se a sessão expirou
      const loginTime = parseInt(timestamp);
      const now = Date.now();
      
      if (now - loginTime > SESSION_DURATION) {
        // Sessão expirada
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(AUTH_TIMESTAMP_KEY);
        router.push('/login');
        return;
      }

      setAutenticado(true);
      setCarregando(false);
    };

    verificarAuth();
  }, [router]);

  // Carregar estoque do localStorage
  useEffect(() => {
    if (!autenticado || typeof window === 'undefined') return;
    
    const estoqueLocal = localStorage.getItem(STORAGE_KEY);
    if (estoqueLocal) {
      try {
        setEstoque(JSON.parse(estoqueLocal));
      } catch (error) {
        console.error('Erro ao carregar estoque:', error);
        inicializarEstoque();
      }
    } else {
      inicializarEstoque();
    }
  }, [autenticado]);

  // Inicializar estoque
  const inicializarEstoque = () => {
    const inicial: EstoqueState = {};
    produtos.forEach(p => inicial[p.id] = true);
    setEstoque(inicial);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inicial));
    }
  };

  // Função de Logout
  const handleLogout = () => {
    if (confirm('Deseja realmente sair?')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(AUTH_TIMESTAMP_KEY);
      }
      router.push('/login');
    }
  };

  // Salvar estoque no localStorage
  const salvarEstoque = (novoEstoque: EstoqueState) => {
    setEstoque(novoEstoque);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novoEstoque));
    }
    setMudancasPendentes(prev => prev + 1);
  };

  // Alternar disponibilidade
  const toggleDisponibilidade = (id: number) => {
    const novoEstoque = { ...estoque, [id]: !estoque[id] };
    salvarEstoque(novoEstoque);
  };

  // Sincronizar (simulado)
  const sincronizar = () => {
    setUltimaSincronizacao(new Date());
    setMudancasPendentes(0);
    alert('✅ Estoque sincronizado com sucesso!');
  };

  // Categorias únicas
  const categorias = ['Todas', ...Array.from(new Set(produtos.map(p => p.categoria)))];

  // Filtrar produtos
  const produtosFiltrados = produtos.filter(p => {
    const matchCategoria = filtroCategoria === 'Todas' || p.categoria === filtroCategoria;
    const disponivel = estoque[p.id] !== false;
    const matchStatus = filtroStatus === 'Todos' || 
                       (filtroStatus === 'Disponíveis' && disponivel) ||
                       (filtroStatus === 'Esgotados' && !disponivel);
    return matchCategoria && matchStatus;
  });

  // Estatísticas
  const totalProdutos = produtos.length;
  const disponiveis = produtos.filter(p => estoque[p.id] !== false).length;
  const esgotados = totalProdutos - disponiveis;

  // Tela de carregamento
  if (carregando) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Droplets className="text-emerald-600 animate-pulse mx-auto mb-4" size={48} />
          <p className="text-emerald-700 font-medium">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!autenticado) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <a href="/" className="flex items-center text-emerald-700 hover:text-emerald-900 transition-colors">
                <Home className="mr-2" size={20} />
                <span className="hidden sm:inline">Site</span>
              </a>
              <h1 className="text-xl font-bold text-emerald-900 flex items-center gap-2">
                <Droplets className="text-emerald-600" size={24} />
                Admin - O Coqueiro Belém
              </h1>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={20} />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-emerald-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 font-medium">Total</p>
                <p className="text-2xl font-bold text-emerald-900">{totalProdutos}</p>
              </div>
              <Package className="text-emerald-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Disponíveis</p>
                <p className="text-2xl font-bold text-green-700">{disponiveis}</p>
              </div>
              <CheckCircle className="text-green-600" size={32} />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Esgotados</p>
                <p className="text-2xl font-bold text-red-700">{esgotados}</p>
              </div>
              <XCircle className="text-red-600" size={32} />
            </div>
          </div>

          <div className={`bg-white p-6 rounded-xl shadow-sm border ${
            mudancasPendentes > 0 ? 'border-blue-200' : 'border-emerald-100'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600 font-medium">Pendentes</p>
                <p className={`text-2xl font-bold ${
                  mudancasPendentes > 0 ? 'text-blue-600' : 'text-emerald-400'
                }`}>
                  {mudancasPendentes}
                </p>
              </div>
              <RefreshCw className={mudancasPendentes > 0 ? 'text-blue-600' : 'text-emerald-400'} size={32} />
            </div>
          </div>
        </div>

        {/* Alerta de Mudanças Pendentes */}
        {mudancasPendentes > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-800 font-semibold">
                  Você tem {mudancasPendentes} mudança(s) não salva(s)
                </p>
                <p className="text-blue-700 text-sm">
                  As alterações estão salvas localmente. Clique em sincronizar para salvar permanentemente.
                </p>
              </div>
              
              <button
                onClick={sincronizar}
                className="px-6 py-3 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg"
              >
                <Save size={18} />
                Sincronizar
              </button>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 border border-emerald-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="flex-1 px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categorias.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
              className="flex-1 px-4 py-2 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="Todos">Todos os Status</option>
              <option value="Disponíveis">Disponíveis</option>
              <option value="Esgotados">Esgotados</option>
            </select>
          </div>
        </div>

        {/* Lista de Produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {produtosFiltrados.map(produto => {
            const disponivel = estoque[produto.id] !== false;
            
            return (
              <div
                key={produto.id}
                className={`bg-white rounded-xl p-4 shadow-sm border transition-all ${
                  disponivel ? 'border-green-200' : 'border-red-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-20 h-20 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Droplets className="text-emerald-600" size={32} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-emerald-900 text-sm">{produto.nome}</h3>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${
                        disponivel 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {disponivel ? (
                          <>
                            <CheckCircle size={12} />
                            OK
                          </>
                        ) : (
                          <>
                            <XCircle size={12} />
                            Esgotado
                          </>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs text-emerald-600 mb-2">{produto.categoria}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-emerald-800">
                        R$ {produto.preco.toFixed(2)}
                      </span>
                      
                      <button
                        onClick={() => toggleDisponibilidade(produto.id)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1 ${
                          disponivel 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {disponivel ? (
                          <>
                            <XCircle size={14} />
                            Esgotar
                          </>
                        ) : (
                          <>
                            <CheckCircle size={14} />
                            Repor
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-emerald-600 space-y-2">
          <div>
            {produtosFiltrados.length} de {totalProdutos} produtos exibidos
          </div>
          
          {ultimaSincronizacao && (
            <div className="text-xs text-emerald-500">
              Última sincronização: {ultimaSincronizacao.toLocaleString('pt-BR')}
            </div>
          )}
          
          <div className="text-xs text-emerald-400">
            Modo offline-first: Alterações salvas localmente
          </div>
        </div>
      </div>
    </div>
  );
}