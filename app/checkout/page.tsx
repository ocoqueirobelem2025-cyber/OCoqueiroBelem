"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Home, ArrowLeft, MapPin, Calendar, ChevronRight } from "lucide-react";

interface Item { id:number; nome:string; preco:number; quantidade:number; }
interface Localizacao { latitude:number; longitude:number; }
type Metodo = "pix" | "dinheiro" | "cartão";

export default function Checkout() {
  const [items,setItems]=useState<Item[]>([]);
  const [regiao,setRegiao]=useState("");
  const [dados,setDados]=useState({nome:"",telefone:"",endereco:"",observacoes:""});
  const [loc,setLoc]=useState<Localizacao|null>(null);
  const [metodo,setMetodo]=useState<Metodo>("pix");
  const [pedido,setPedido]=useState("");
  const [agendar,setAgendar]=useState(false);
  const [dataAgendada,setDataAgendada]=useState("");
  const [horaAgendada,setHoraAgendada]=useState("");
  const [diasSelecionados,setDiasSelecionados]=useState<string[]>([]);
  const diasSemana=["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"];
  const taxas=useMemo(()=>({"Belém":12,"Ananindeua":14,"Outras":20}),[]);
  const taxa=regiao?(taxas as any)[regiao]??0:0;
  const subtotal=items.reduce((t,i)=>t+i.preco*i.quantidade,0);
  const total=subtotal+taxa;
  const chavePix="ocoqueirobelem@exemplo.com";
  const telEmpresa="+5591982690087";

  useEffect(()=>{
    const saved=localStorage.getItem("carrinho");
    setItems(saved?JSON.parse(saved):[]);
    setPedido(String(Math.floor(10000+Math.random()*90000)));
  },[]);

  const geo=()=>navigator.geolocation.getCurrentPosition(pos=>setLoc({latitude:pos.coords.latitude,longitude:pos.coords.longitude}));
  const toggleDia=(d:string)=>setDiasSelecionados(prev=>prev.includes(d)?prev.filter(x=>x!==d):[...prev,d]);

  const enviar=()=>{
    if(!dados.nome||!dados.telefone||!dados.endereco||!regiao){alert("Preencha nome, telefone, endereço e região");return;}
    if(horaAgendada){
      const [h]=horaAgendada.split(":").map(Number);
      if(h<8||h>18){alert("Horário permitido apenas entre 08:00 e 18:00.");return;}
    }
    let msg=`*Pedido — O COQUEIRO BELÉM*%0A*Nº:* #${pedido}%0A*Cliente:* ${dados.nome}%0A*Tel:* ${dados.telefone}%0A*Endereço:* ${dados.endereco}%0A*Região:* ${regiao}%0A`;
    if(agendar){
      if(dataAgendada) msg+=`*Agendado:* ${new Date(dataAgendada).toLocaleDateString()} ${horaAgendada?`às ${horaAgendada}`:""}%0A`;
      if(diasSelecionados.length) msg+=`*Repetir:* ${diasSelecionados.join(", ")}%0A`;
    }
    msg+=`%0A*Itens:*%0A`;
    items.forEach(i=>msg+=`- ${i.nome} x${i.quantidade}: R$ ${(i.preco*i.quantidade).toFixed(2)}%0A`);
    msg+=`%0A*Subtotal:* R$ ${subtotal.toFixed(2)}%0A*Entrega:* R$ ${taxa.toFixed(2)}%0A*Total:* R$ ${total.toFixed(2)}%0A*Pagamento:* ${metodo.toUpperCase()}%0A`;
    if(dados.observacoes) msg+=`*Obs:* ${dados.observacoes}%0A`;
    const link=`https://wa.me/${telEmpresa}?text=${msg}`;
    window.open(link,"_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-teal-50 to-white">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-emerald-100 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/pedidos" className="text-emerald-700 flex items-center gap-2"><ArrowLeft size={18}/> Voltar</Link>
          <h1 className="font-bold text-emerald-900">Finalizar Pedido</h1>
          <Link href="/" className="text-emerald-700 flex items-center gap-2"><Home size={18}/> Início</Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-2xl space-y-8">
        {/* Resumo */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-semibold text-emerald-900 mb-3">Resumo do Pedido</h2>
          <div className="space-y-2 text-emerald-800">
            <div className="flex justify-between"><span>Subtotal</span><span>R$ {subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Entrega</span><span>R$ {taxa.toFixed(2)}</span></div>
            <div className="border-t mt-2 pt-2 flex justify-between font-semibold"><span>Total</span><span className="text-lg text-emerald-700">R$ {total.toFixed(2)}</span></div>
          </div>
        </div>

        {/* Dados */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-emerald-900">Seus Dados</h2>
          <input className="w-full border border-emerald-200 rounded-lg p-3 text-black placeholder-black" placeholder="Nome" value={dados.nome} onChange={e=>setDados({...dados,nome:e.target.value})}/>
          <input className="w-full border border-emerald-200 rounded-lg p-3 text-black placeholder-black" placeholder="Telefone" value={dados.telefone} onChange={e=>setDados({...dados,telefone:e.target.value})}/>
          <input className="w-full border border-emerald-200 rounded-lg p-3 text-black placeholder-black" placeholder="Endereço" value={dados.endereco} onChange={e=>setDados({...dados,endereco:e.target.value})}/>
          <select className="w-full border border-emerald-200 rounded-lg p-3 text-black" value={regiao} onChange={e=>setRegiao(e.target.value)}>
            <option value="">Região de Entrega</option>
            <option>Belém</option><option>Ananindeua</option><option>Outras</option>
          </select>
          <button onClick={geo} className="px-4 py-2 border border-emerald-200 rounded-lg text-black bg-emerald-50 flex items-center gap-2"><MapPin size={18}/> Usar minha localização</button>
          <textarea className="w-full border border-emerald-200 rounded-lg p-3 text-black placeholder-black" rows={3} placeholder="Observações" value={dados.observacoes} onChange={e=>setDados({...dados,observacoes:e.target.value})}/>
        </div>

        {/* Agendamento */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm space-y-3">
          <h2 className="font-semibold text-emerald-900 flex items-center gap-2"><Calendar size={18}/> Agendamento</h2>
          <label className="flex items-center gap-2 text-black">
            <input type="checkbox" checked={agendar} onChange={e=>setAgendar(e.target.checked)}/> Desejo agendar este pedido
          </label>
          {agendar && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input type="date" className="border border-emerald-200 rounded-lg p-3 text-black" value={dataAgendada} onChange={e=>setDataAgendada(e.target.value)}/>
                <input type="time" min="08:00" max="18:00" className="border border-emerald-200 rounded-lg p-3 text-black" value={horaAgendada} onChange={e=>setHoraAgendada(e.target.value)}/>
              </div>
              <p className="text-sm text-black">Ou selecione dias fixos:</p>
              <div className="flex flex-wrap gap-2">
                {diasSemana.map(d=>(
                  <button key={d} onClick={()=>toggleDia(d)} className={`px-3 py-1 rounded-full border text-sm ${diasSelecionados.includes(d)?"bg-emerald-600 text-white border-emerald-600":"border-emerald-200 text-black"}`}>{d}</button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Pagamento */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-semibold text-emerald-900">Forma de Pagamento</h2>
          <div className="grid grid-cols-3 gap-2">
            {(["pix","dinheiro","cartão"] as const).map(m=>(
              <button key={m} onClick={()=>setMetodo(m)} className={`px-3 py-2 rounded-lg border text-sm font-medium ${metodo===m?"bg-emerald-600 text-white border-emerald-600":"border-emerald-200 text-black"}`}>{m.toUpperCase()}</button>
            ))}
          </div>
          {metodo==="pix"&&(
            <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 text-sm text-black">
              <p><strong>Chave PIX:</strong> {chavePix}</p>
              <p>Valor: R$ {total.toFixed(2)}</p>
            </div>
          )}
          <button onClick={enviar} className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 transition-colors">
            Enviar pedido pelo WhatsApp <ChevronRight size={18}/>
          </button>
        </div>
      </main>
    </div>
  );
}
