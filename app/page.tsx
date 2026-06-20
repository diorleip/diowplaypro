"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!user || !pass) {
      alert("Preencha usuário e senha");
      return;
    }

    try {
      setLoading(true);

      const req = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
          password: pass,
        }),
      });

      const data = await req.json();

      if (data.error) {
        alert(data.error);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      alert("Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/bg.jpg"
          alt="Background"
          className="h-full w-full object-cover opacity-25 blur-[2px]"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/70 via-[#020617]/85 to-black" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1D4ED822,transparent_60%)]" />
      </div>

      <div className="absolute left-1/2 top-[-120px] h-[350px] w-[350px] -translate-x-1/2 rounded-full bg-blue-700/20 blur-[140px]" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-blue-700/20 bg-white/5 p-8 shadow-[0_0_60px_rgba(29,78,216,0.25)] backdrop-blur-xl">
        <div className="mb-8 flex flex-col items-center">
          <img
            src="/logo.png"
            alt="Diow Play"
            className="mb-4 w-40 drop-shadow-[0_0_25px_rgba(29,78,216,0.8)]"
          />

          <h1 className="text-3xl font-bold text-white">
            Gerador{" "}
            <span className="text-[#1D4ED8]">
              Diow Play
            </span>
          </h1>

          <p className="mt-2 text-sm text-zinc-400">
            Faça login para acessar o painel
          </p>
        </div>

        <div className="space-y-4">
          <input
            autoFocus
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
            className="w-full rounded-2xl border border-blue-700/20 bg-black/40 px-4 py-3 text-white outline-none transition-all focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/30"
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Senha"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="w-full rounded-2xl border border-blue-700/20 bg-black/40 px-4 py-3 pr-12 text-white outline-none transition-all focus:border-[#1D4ED8] focus:ring-2 focus:ring-[#1D4ED8]/30"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1D4ED8]"
            >
              {showPass ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] py-3 font-semibold text-white transition-all hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(29,78,216,0.6)]"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>

        <a
          href="/cadastro"
          className="mt-4 flex items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 py-3 text-sm text-blue-300 transition-all hover:bg-blue-500/20"
        >
          Criar Conta
        </a>

        <a
          href="https://t.me/+uslLfs3-3mM4ODAx"
          target="_blank"
          className="mt-4 flex items-center justify-center rounded-2xl border border-blue-700/20 bg-blue-700/10 py-3 text-sm text-blue-300 transition-all hover:bg-blue-700/20"
        >
          Siga nosso Canal
        </a>
        </div>
    </main>
  );
}