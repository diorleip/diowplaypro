"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    // LOGIN MASTER
    if (
      user === "diowplay" &&
      password === "123456"
    ) {
      localStorage.setItem("diow_user", user);

      document.cookie =
        "diow_user=diowplay; path=/";

      router.push("/dashboard");
      return;
    }

    alert("Login inválido");
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-black to-blue-900/20" />

      {/* GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full" />

      {/* CARD */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-3xl
          border
          border-cyan-500/20
          bg-white/5
          backdrop-blur-xl
          p-8
          shadow-[0_0_40px_rgba(0,255,255,0.15)]
        "
      >
        <div className="flex flex-col items-center mb-8">
          <img
            src="/logo.png"
            alt="Diow Play"
            className="w-24 h-24 object-contain drop-shadow-[0_0_20px_cyan]"
          />

          <h1 className="text-3xl font-bold text-cyan-300 mt-4">
            DiowPlay Pro
          </h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <input
            type="text"
            placeholder="Usuário"
            value={user}
            onChange={(e) =>
              setUser(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              bg-black/40
              border
              border-cyan-500/20
              p-4
              text-white
              outline-none
            "
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              bg-black/40
              border
              border-cyan-500/20
              p-4
              text-white
              outline-none
            "
          />

          <button
            type="submit"
            className="
              w-full
              rounded-2xl
              bg-cyan-500
              hover:bg-cyan-400
              transition-all
              py-4
              text-black
              font-bold
            "
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}