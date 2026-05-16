"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (!user || !pass) {
      alert("Preencha usuário e senha");
      return;
    }

    localStorage.setItem("diow_user", user);
    document.cookie = `diow_user=${user}; path=/`;

    router.push("/dashboard");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/bg.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-25 blur-[2px]"
        />

        {/* Gradiente escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-[#020617]/85 to-black" />

        {/* Glow azul */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#00d9ff22,transparent_60%)]" />
      </div>

      {/* Efeito Neon */}
      <div className="absolute top-[-120px] left-1/2 h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[140px]" />

      {/* Card Login */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-cyan-400/20 bg-white/5 p-8 shadow-[0_0_60px_rgba(0,217,255,0.15)] backdrop-blur-xl">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Diow Play"
            className="mb-4 w-40 drop-shadow-[0_0_25px_rgba(0,217,255,0.8)]"
          />

          <h1 className="text-3xl font-bold text-white">
            Gerador{" "}
            <span className="text-cyan-400">Diow Play</span>
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Faça login para acessar o painel
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full rounded-2xl border border-cyan-400/20 bg-black/40 px-4 py-3 text-white outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          />

          <input
            type="password"
            placeholder="Senha"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full rounded-2xl border border-cyan-400/20 bg-black/40 px-4 py-3 text-white outline-none transition-all focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(0,217,255,0.6)]"
          >
            Entrar
          </button>
        </div>

        {/* Telegram */}
        <a
          href="https://t.me/+uslLfs3-3mM4ODAx"
          target="_blank"
          className="mt-6 flex items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-500/10 py-3 text-sm text-cyan-300 transition-all hover:bg-cyan-500/20"
        >
          Siga nosso Canal
        </a>

        {/* Footer */}
        <p className="mt-8 text-center text-xs text-zinc-500">
          Feito por Diow 🚀 © 2026 DiowPlay. Todos os direitos reservados.
        </p>
      </div>
    </main>
  );
}