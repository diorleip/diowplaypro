"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

interface Usuario {
  id: string;
  username: string;
  status: string;
  role: string;
  createdAt: string;
}

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [processando, setProcessando] = useState<string | null>(null);

  async function carregarUsuarios() {
    try {
      setLoading(true);

      const response = await fetch("/api/usuarios/listar", {
        cache: "no-store",
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        setUsuarios(data.usuarios || []);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar usuários");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function aprovar(id: string) {
    try {
      setProcessando(id);

      await fetch("/api/usuarios/aprovar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      await carregarUsuarios();
    } catch {
      alert("Erro ao aprovar usuário");
    } finally {
      setProcessando(null);
    }
  }

  async function bloquear(id: string) {
    try {
      setProcessando(id);

      await fetch("/api/usuarios/bloquear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      await carregarUsuarios();
    } catch {
      alert("Erro ao bloquear usuário");
    } finally {
      setProcessando(null);
    }
  }

  async function excluir(id: string) {
    if (!confirm("Deseja realmente excluir este usuário?")) {
      return;
    }

    try {
      setProcessando(id);

      await fetch("/api/usuarios/excluir", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      await carregarUsuarios();
    } catch {
      alert("Erro ao excluir usuário");
    } finally {
      setProcessando(null);
    }
  }

  const usuariosFiltrados = useMemo(() => {
    return usuarios.filter((u) =>
      u.username.toLowerCase().includes(busca.toLowerCase())
    );
  }, [usuarios, busca]);

  const totalUsuarios = usuarios.length;

  const totalAdmins = usuarios.filter(
    (u) => u.role === "ADMIN"
  ).length;

  const totalUsers = usuarios.filter(
    (u) => u.role === "USER"
  ).length;

  const totalPendentes = usuarios.filter(
    (u) => u.status === "PENDENTE"
  ).length;

  return (
    <div className="min-h-screen bg-[#030712] text-white p-6">
      <div className="max-w-7xl mx-auto">

  <Link
    href="/dashboard"
    className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl bg-[#0B1220] border border-blue-500/20 hover:border-blue-500/60 hover:bg-[#101827] transition-all"
  >
    ← Voltar ao Dashboard
  </Link>

  <div className="mb-8">
    <h1 className="text-4xl font-bold">
      Usuários
    </h1>

          <p className="text-gray-400 mt-2">
            Gerencie os usuários da plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

          <div className="bg-[#0B1220] border border-blue-500/20 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Total de Usuários
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {totalUsuarios}
            </h2>
          </div>

          <div className="bg-[#0B1220] border border-blue-500/20 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Administradores
            </p>

            <h2 className="text-3xl font-bold text-blue-400 mt-2">
              {totalAdmins}
            </h2>
          </div>

          <div className="bg-[#0B1220] border border-blue-500/20 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Usuários
            </p>

            <h2 className="text-3xl font-bold text-green-400 mt-2">
              {totalUsers}
            </h2>
          </div>

          <div className="bg-[#0B1220] border border-blue-500/20 rounded-2xl p-5">
            <p className="text-gray-400 text-sm">
              Pendentes
            </p>

            <h2 className="text-3xl font-bold text-yellow-400 mt-2">
              {totalPendentes}
            </h2>
          </div>

        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar usuário..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full bg-[#0B1220] border border-blue-500/20 rounded-xl px-4 py-3 outline-none"
          />
        </div>

        <div className="bg-[#0B1220] border border-blue-500/20 rounded-2xl overflow-hidden">

          {loading ? (
            <div className="p-10 text-center">
              Carregando usuários...
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-[#111827]">
                  <tr>
                    <th className="text-left p-4">Usuário</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Perfil</th>
                    <th className="text-left p-4">Criado em</th>
                    <th className="text-center p-4">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {usuariosFiltrados.map((usuario) => {
                    const adminPrincipal =
                      usuario.username === "diowplay";

                    return (
                      <tr
                        key={usuario.id}
                        className="border-t border-gray-800"
                      >
                        <td className="p-4 font-medium">
                          {usuario.username}
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold
                            ${
                              usuario.status === "ATIVO"
                                ? "bg-green-600"
                                : usuario.status === "PENDENTE"
                                ? "bg-yellow-600"
                                : "bg-red-600"
                            }`}
                          >
                            {usuario.status}
                          </span>
                        </td>

                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold
                            ${
                              usuario.role === "ADMIN"
                                ? "bg-blue-600"
                                : usuario.role === "REVENDA"
                                ? "bg-purple-600"
                                : "bg-gray-600"
                            }`}
                          >
                            {usuario.role}
                          </span>
                        </td>

                        <td className="p-4">
                          {new Date(
                            usuario.createdAt
                          ).toLocaleDateString("pt-BR")}
                        </td>

                        <td className="p-4">
                          <div className="flex gap-2 justify-center flex-wrap">

                            {usuario.status !== "ATIVO" && (
                              <button
                                onClick={() =>
                                  aprovar(usuario.id)
                                }
                                disabled={
                                  processando === usuario.id
                                }
                                className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-lg text-sm"
                              >
                                Aprovar
                              </button>
                            )}

                            {!adminPrincipal && (
                              <>
                                <button
                                  onClick={() =>
                                    bloquear(usuario.id)
                                  }
                                  disabled={
                                    processando === usuario.id
                                  }
                                  className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded-lg text-sm"
                                >
                                  Bloquear
                                </button>

                                <button
                                  onClick={() =>
                                    excluir(usuario.id)
                                  }
                                  disabled={
                                    processando === usuario.id
                                  }
                                  className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg text-sm"
                                >
                                  Excluir
                                </button>
                              </>
                            )}

                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}