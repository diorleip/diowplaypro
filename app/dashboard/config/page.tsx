// CAMINHO:
// src/app/dashboard/config/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ConfigPage() {
  const router = useRouter();

  const [contact, setContact] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [telegramChatId, setTelegramChatId] =
  useState("");

  // NOVO
  const [removeBackground, setRemoveBackground] = useState(false);

  useEffect(() => {
    const savedContact = localStorage.getItem("diow_contact");
    const savedLogo = localStorage.getItem("diow_logo");
    const savedTelegram =
  localStorage.getItem(
    "diow_telegram_chat_id"
  );

    // NOVO
    const savedRemoveBg = localStorage.getItem(
      "diow_remove_background"
    );

    if (savedContact) {
      setContact(savedContact);
    }
    if (savedTelegram) {
  setTelegramChatId(
    savedTelegram
  );
}

    if (savedLogo) {
      setLogo(savedLogo);
    }

    // NOVO
    if (savedRemoveBg === "true") {
      setRemoveBackground(true);
    }
  }, []);

  function saveConfig() {
    localStorage.setItem("diow_contact", contact);
    localStorage.setItem(
  "diow_telegram_chat_id",
  telegramChatId
);

    // NOVO
    localStorage.setItem(
      "diow_remove_background",
      String(removeBackground)
    );

    alert("Configurações salvas com sucesso!");
  }

  function handleLogoUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result as string;

      localStorage.setItem("diow_logo", base64);

      setLogo(base64);

      alert("Logo salva com sucesso!");
    };

    reader.readAsDataURL(file);
  }

  function removeLogo() {
    localStorage.removeItem("diow_logo");

    setLogo(null);

    alert("Logo removida!");
  }

  return (
    <div className="min-h-screen bg-[#020617] p-10 text-white">

      <div className="max-w-4xl mx-auto">

        {/* TOPO */}
        <div className="flex items-center justify-between mb-10">

          <div>
            <h1 className="text-5xl font-black text-cyan-400">
              Configurações
            </h1>

            <p className="text-white/70 mt-3 text-xl">
              Configure sua logo e contato do servidor.
            </p>
          </div>

          {/* BOTÃO VOLTAR */}
          <button
            onClick={() => router.push("/dashboard")}
            className="px-8 py-4 rounded-2xl border border-cyan-400 text-cyan-400 font-black text-xl hover:bg-cyan-500/10 transition"
          >
            ← VOLTAR
          </button>

        </div>

        {/* CARD */}
        <div className="rounded-[35px] border border-cyan-400/20 bg-white/5 backdrop-blur-xl p-10 shadow-[0_0_50px_rgba(0,217,255,0.15)]">

          {/* LOGO */}
          <div>

            <h2 className="text-3xl font-black text-cyan-400 mb-6">
              Logo do Servidor
            </h2>

            {/* PREVIEW */}
            <div className="w-full rounded-[30px] border border-cyan-400/20 bg-black/40 p-10 flex flex-col items-center justify-center">

              {logo ? (
                <>
                  <img
                    src={logo}
                    alt="Logo"
                    className="max-h-[180px] object-contain drop-shadow-[0_0_30px_#00d9ff]"
                  />

                  <p className="text-green-400 font-bold text-xl mt-6">
                    ✅ Logo cadastrada com sucesso
                  </p>
                </>
              ) : (
                <>
                  <div className="w-[220px] h-[120px] rounded-2xl border-2 border-dashed border-cyan-400/30 flex items-center justify-center text-cyan-400 text-lg">
                    SEM LOGO
                  </div>

                  <p className="text-red-400 font-bold text-xl mt-6">
                    ⚠ Nenhuma logo cadastrada
                  </p>
                </>
              )}

            </div>

            {/* BOTÕES */}
            <div className="flex gap-5 mt-8 flex-wrap">

              <label className="cursor-pointer px-8 py-4 rounded-2xl bg-cyan-500 text-black font-black text-xl hover:scale-105 transition">

                ENVIAR LOGO

                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleLogoUpload}
                />
              </label>

              {logo && (
                <button
                  onClick={removeLogo}
                  className="px-8 py-4 rounded-2xl border border-red-500 text-red-400 font-black text-xl hover:bg-red-500/10 transition"
                >
                  REMOVER LOGO
                </button>
              )}

            </div>

          </div>

          {/* CONTATO */}
          <div className="mt-14">

            <h2 className="text-3xl font-black text-cyan-400 mb-6">
              Contato do Banner
            </h2>

            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Digite o contato..."
              className="w-full h-[75px] rounded-2xl bg-black/40 border border-cyan-400/20 px-6 text-2xl outline-none focus:border-cyan-400"
            />

            <p className="text-white/50 text-lg mt-4">
              O contato aparecerá automaticamente nos banners caso esteja preenchido.
            </p>

          </div>

          {/* TELEGRAM */}
<div className="mt-14">

  <h2 className="text-3xl font-black text-cyan-400 mb-6">
    Telegram
  </h2>

  <input
    type="text"
    value={telegramChatId}
    onChange={(e) =>
      setTelegramChatId(
        e.target.value
      )
    }
    placeholder="-1003928092121"
    className="w-full h-[75px] rounded-2xl bg-black/40 border border-cyan-400/20 px-6 text-2xl outline-none focus:border-cyan-400"
  />

  <p className="text-white/50 text-lg mt-4">
    ID do canal ou grupo que receberá os banners automaticamente.
  </p>

</div>

          {/* REMOVER FUNDO */}
          <div className="mt-14">

            <h2 className="text-3xl font-black text-cyan-400 mb-6">
              Remoção de Fundo
            </h2>

            <div className="rounded-3xl border border-cyan-400/20 bg-black/40 p-8 flex items-center justify-between">

              <div>
                <p className="text-2xl font-bold">
                  Ativar remoção de fundo da logo
                </p>

                <p className="text-white/50 mt-2 text-lg">
                  Remove automaticamente o fundo da logo nos banners e vídeos.
                </p>
              </div>

              <button
                onClick={() =>
                  setRemoveBackground(!removeBackground)
                }
                className={`w-[110px] h-[55px] rounded-full transition relative ${
                  removeBackground
                    ? "bg-cyan-500"
                    : "bg-white/20"
                }`}
              >
                <div
                  className={`absolute top-[5px] w-[45px] h-[45px] rounded-full bg-white transition ${
                    removeBackground
                      ? "left-[60px]"
                      : "left-[5px]"
                  }`}
                />
              </button>

            </div>

          </div>

          {/* STATUS */}
          <div className="mt-14 rounded-3xl bg-black/40 border border-cyan-400/20 p-8">

            <h2 className="text-3xl font-black text-cyan-400 mb-5">
              Status do Sistema
            </h2>

            <div className="space-y-4 text-xl">
              <div className="flex items-center gap-3">
  <span>
    {telegramChatId
      ? "🟢"
      : "🟡"}
  </span>

  <p>
    Telegram configurado para receber banners
  </p>
</div>

              <div className="flex items-center gap-3">
                <span>
                  {logo ? "🟢" : "🔴"}
                </span>

                <p>
                  Logo obrigatória para gerar banners e vídeos
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span>
                  {contact ? "🟢" : "🟡"}
                </span>

                <p>
                  Contato opcional para banners
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span>
                  {removeBackground ? "🟢" : "⚪"}
                </span>

                <p>
                  Remoção automática de fundo da logo
                </p>
              </div>

            </div>

          </div>

          {/* BOTÃO */}
          <button
            onClick={saveConfig}
            className="w-full h-[80px] rounded-3xl bg-cyan-500 text-black text-2xl font-black mt-14 hover:scale-[1.02] transition"
          >
            SALVAR CONFIGURAÇÕES
          </button>

        </div>

      </div>

    </div>
  );
}