"use client";

import { useEffect, useState } from "react";
import BackButton from "@/app/components/BackButton";
import toast from "react-hot-toast";

interface Indicado {
  id: string;
  username: string;
  status: string;
  role: string;
  createdAt: string;
}

export default function IndicacaoPage() {
  const [username, setUsername] = useState("");
  const [ranking, setRanking] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [ativos, setAtivos] = useState(0);
  const [pendentes, setPendentes] = useState(0);
  const [indicados, setIndicados] = useState<Indicado[]>([]);
  const [link, setLink] = useState("");

  useEffect(() => {
    carregar();
  }, []);

  useEffect(() => {
    if (username) {
      setLink(`${window.location.origin}/cadastro?ref=${username}`);
    }
  }, [username]);

  async function carregar() {
    try {
      const meReq = await fetch("/api/me");
      const me = await meReq.json();
      setUsername(me.username);

      const req = await fetch("/api/indicacao/listar");
      const data = await req.json();

      setTotal(data.total || 0);
      setAtivos(data.ativos || 0);
      setPendentes(data.pendentes || 0);
      setIndicados(data.indicados || []);

      const rankingReq = await fetch("/api/indicacao/ranking");
      const rankingData = await rankingReq.json();
      setRanking(rankingData);
    } catch (error) {
      console.error(error);
    }
  }
function copiarLink() {
  navigator.clipboard.writeText(link);
  toast.success("Link copiado com sucesso!");
}

function compartilharWhatsapp() {
  const texto = encodeURIComponent(
    `🚀 Cadastre-se na Diow Play pelo meu link:\n\n${link}`
  );
  window.open(`https://wa.me/?text=${texto}`, "_blank");
  toast("Abrindo WhatsApp...");
}

function compartilharTelegram() {
  const texto = encodeURIComponent(
    `🚀 Cadastre-se na Diow Play pelo meu link:\n\n${link}`
  );
  window.open(
    `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${texto}`,
    "_blank"
  );
  toast("Abrindo Telegram...");
}
  return (
    <div className="min-h-screen bg-[#030712] text-white p-6">
      <div className="max-w-7xl mx-auto">

        <BackButton />

        <div className="mb-8">
          <h1 className="text-4xl font-bold">Link de Indicação</h1>
          <p className="text-gray-400 mt-2">
            Compartilhe seu link e acompanhe seus indicados.
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#0B1220] border border-blue-500/20 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">👥 Total de Indicados</p>
            <h2 className="text-3xl font-bold mt-2">{total}</h2>
          </div>
          <div className="bg-[#0B1220] border border-blue-500/20 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">⏳ Pendentes</p>
            <h2 className="text-3xl font-bold text-yellow-400 mt-2">{pendentes}</h2>
          </div>
          <div className="bg-[#0B1220] border border-blue-500/20 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">✅ Ativos</p>
            <h2 className="text-3xl font-bold text-green-400 mt-2">{ativos}</h2>
          </div>
        </div>

        {/* Link de indicação */}
        <div className="bg-[#0B1220] border border-blue-500/20 rounded-2xl p-6 mb-6">
          <p className="text-gray-400 mb-2">Seu link de indicação</p>
          <div className="bg-[#111827] rounded-xl p-4 break-all">{link}</div>
          <div className="flex gap-3 mt-6 flex-wrap">
            <button onClick={copiarLink} className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl">
              Copiar Link
            </button>
            <button onClick={compartilharWhatsapp} className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl">
              Compartilhar WhatsApp
            </button>
            <button onClick={compartilharTelegram} className="bg-cyan-600 hover:bg-cyan-700 px-5 py-3 rounded-xl">
              Compartilhar Telegram
            </button>
          </div>
        </div>

        {/* Tabela de indicados */}
        <div className="bg-[#0B1220] border border-blue-500/20 rounded-2xl overflow-hidden mb-6">
          <div className="p-5 border-b border-blue-500/10">
            <h2 className="text-xl font-semibold">Usuários Indicados</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#111827]">
                <tr>
                  <th className="text-left p-4">👤 Usuário</th>
                  <th className="text-left p-4">📌 Status</th>
                  <th className="text-left p-4">🛡️ Perfil</th>
                  <th className="text-left p-4">📅 Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {indicados.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center p-8 text-gray-400">
                      Nenhum indicado encontrado
                    </td>
                  </tr>
                )}
                {indicados.map((usuario) => (
                  <tr key={usuario.id} className="border-t border-gray-800">
                    <td className="p-4">{usuario.username}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          usuario.status === "ATIVO" ? "bg-green-600" : "bg-yellow-600"
                        }`}
                      >
                        {usuario.status}
                      </span>
                    </td>
                    <td className="p-4">{usuario.role}</td>
                    <td className="p-4">{new Date(usuario.createdAt).toLocaleDateString("pt-BR")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Ranking de indicações */}
        <div className="bg-[#0B1220] border border-blue-500/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">🏆 Ranking de Indicações</h2>
          <div className="space-y-3">
            {ranking.length === 0 && <p className="text-gray-400">Nenhuma indicação encontrada.</p>}
            {ranking.map((item, index) => (
              <div key={item.username} className="flex justify-between items-center bg-[#111827] rounded-xl p-4">
                <span>#{index + 1} - {item.username}</span>
                <span className="font-bold text-cyan-400">{item.total} indicações</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}