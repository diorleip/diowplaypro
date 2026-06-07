"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string;
  status: string;
  createdAt: string;
}

export default function UsuariosPage() {
  const router = useRouter();

  const [usuarios, setUsuarios] =
    useState<User[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function verificarPermissao() {
    try {
      const req = await fetch("/api/me");

      const data = await req.json();

      if (
        !data?.role ||
        data.role !== "ADMIN"
      ) {
        router.push("/dashboard");
        return;
      }

      carregarUsuarios();
    } catch {
      router.push("/dashboard");
    } finally {
      setLoading(false);
    }
  }

  async function carregarUsuarios() {
    const req = await fetch(
      "/api/usuarios/listar"
    );

    const data = await req.json();

    setUsuarios(data);
  }

  async function aprovar(id: string) {
    await fetch("/api/usuarios/aprovar", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({ id }),
    });

    carregarUsuarios();
  }

  async function bloquear(id: string) {
    await fetch("/api/usuarios/bloquear", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({ id }),
    });

    carregarUsuarios();
  }

  async function excluir(id: string) {
    if (
      !confirm(
        "Deseja excluir este usuário?"
      )
    ) {
      return;
    }

    await fetch("/api/usuarios/excluir", {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({ id }),
    });

    carregarUsuarios();
  }

  function copiarLink() {
    navigator.clipboard.writeText(
      `${window.location.origin}/cadastro`
    );

    alert("Link copiado!");
  }

  useEffect(() => {
    verificarPermissao();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020817] flex items-center justify-center text-white">
        Carregando...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#020817] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Usuários
            </h1>

            <p className="text-zinc-400 mt-2">
              Gerencie os acessos do painel
            </p>
          </div>

          <button
            onClick={() =>
              router.push("/dashboard")
            }
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black"
          >
            Voltar ao Dashboard
          </button>
        </div>

        <div className="mb-6 rounded-2xl border border-cyan-500/20 bg-[#0B1228] p-5">
          <p className="text-sm text-zinc-400 mb-2">
            Link de cadastro
          </p>

          <div className="flex gap-3">
            <input
              readOnly
              value="Clique no botão para copiar"
              className="flex-1 rounded-xl bg-[#020817] border border-white/10 p-3 text-white"
            />

            <button
              onClick={copiarLink}
              className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold"
            >
              Copiar
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1228]">
          <table className="w-full">
            <thead className="bg-[#111827]">
              <tr>
                <th className="p-4 text-left">
                  Usuário
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Cadastro
                </th>

                <th className="p-4 text-left">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-white/10"
                >
                  <td className="p-4">
                    {user.username}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        user.status === "ATIVO"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString(
                      "pt-BR"
                    )}
                  </td>

                  <td className="p-4 flex gap-2">
                    <button
                      onClick={() =>
                        aprovar(user.id)
                      }
                      className="rounded-lg bg-green-600 px-3 py-2 text-sm"
                    >
                      Aprovar
                    </button>

                    <button
                      onClick={() =>
                        bloquear(user.id)
                      }
                      className="rounded-lg bg-yellow-600 px-3 py-2 text-sm"
                    >
                      Bloquear
                    </button>

                    <button
                      onClick={() =>
                        excluir(user.id)
                      }
                      className="rounded-lg bg-red-600 px-3 py-2 text-sm"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}