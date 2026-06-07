"use client";

import { useState } from "react";

export default function CadastroPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function cadastrar() {
    if (!username || !password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);

      const req = await fetch("/api/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await req.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      alert("Cadastro enviado com sucesso! Aguarde aprovação do administrador.");

      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050B18] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#0F172A] border border-[#1E293B] rounded-2xl p-8 shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold">
            <span className="text-white">Diow</span>
            <span className="text-[#0066FF]"> Play</span>
          </h1>

          <p className="text-gray-400 mt-3 text-center">
            Solicite seu acesso ao painel
          </p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-12 px-4 rounded-lg bg-[#111827] border border-[#1F2937] text-white outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-lg bg-[#111827] border border-[#1F2937] text-white outline-none"
          />

          <button
            onClick={cadastrar}
            disabled={loading}
            className="w-full h-12 rounded-lg bg-[#0066FF] text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? "Criando..." : "Criar Conta"}
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Feito por Diow 🚀 © 2026 DiowPlay. Todos os direitos reservados.
        </p>
      </div>
    </main>
  );
}