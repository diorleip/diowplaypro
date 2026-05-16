"use client";

import { useEffect, useState } from "react";

export default function Configuracao() {

  const [contato, setContato] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [trocas, setTrocas] = useState(0);

  useEffect(() => {

    const contatoSalvo = localStorage.getItem("diow_contato");
    const logoSalva = localStorage.getItem("diow_logo");
    const trocasSalvas = localStorage.getItem("diow_trocas_logo");

    if (contatoSalvo) setContato(contatoSalvo);
    if (logoSalva) setLogo(logoSalva);
    if (trocasSalvas) setTrocas(Number(trocasSalvas));

  }, []);

  function salvarContato() {
    localStorage.setItem("diow_contato", contato);
    alert("Contato salvo.");
  }

  function carregarLogo(e: any) {

    if (trocas >= 3) {
      alert("Limite de 3 trocas atingido.");
      return;
    }

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {

      const result = reader.result as string;

      setLogo(result);

      localStorage.setItem("diow_logo", result);

      const novasTrocas = trocas + 1;

      setTrocas(novasTrocas);

      localStorage.setItem(
        "diow_trocas_logo",
        String(novasTrocas)
      );

    };

    reader.readAsDataURL(file);
  }

  function removerLogo() {
    setLogo(null);
    localStorage.removeItem("diow_logo");
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "45px",
        fontFamily: "Arial"
      }}
    >

      {/* TOPO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px"
        }}
      >

        <h1
          style={{
            fontSize: "58px",
            fontWeight: "bold"
          }}
        >
          Configuração ⚙️
        </h1>

        <a
          href="/dashboard"
          style={{
            background: "#111827",
            padding: "14px 24px",
            borderRadius: "14px",
            color: "white",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          ← Voltar Dashboard
        </a>

      </div>

      <p
        style={{
          color: "#94a3b8",
          fontSize: "20px",
          marginBottom: "50px"
        }}
      >
        Configure sua logomarca e contato 🚀
      </p>

      {/* CARD */}
      <div
        style={{
          background: "#0f172a",
          borderRadius: "30px",
          padding: "45px",
          border: "1px solid rgba(59,130,246,0.12)",
          maxWidth: "950px"
        }}
      >

        {/* TÍTULO */}
        <h2
          style={{
            fontSize: "36px",
            fontWeight: "bold",
            marginBottom: "25px"
          }}
        >
          🖼️ Configurar Logomarca
        </h2>

        {/* BOTÃO */}
        <label
          style={{
            display: "block",
            background:
              "linear-gradient(90deg,#2563eb,#3b82f6)",
            padding: "20px",
            borderRadius: "16px",
            textAlign: "center",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "20px"
          }}
        >
          Selecionar Arquivo PNG

          <input
            type="file"
            accept=".png"
            style={{
              display: "none"
            }}
            onChange={carregarLogo}
          />
        </label>

        {/* REMOVER */}
        <button
          onClick={removerLogo}
          style={{
            width: "100%",
            background: "#dc2626",
            padding: "18px",
            borderRadius: "16px",
            border: "none",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            marginBottom: "25px"
          }}
        >
          Remover Logo
        </button>

        {/* INFO */}
        <div
          style={{
            color: "#94a3b8",
            lineHeight: "34px",
            fontSize: "17px",
            marginBottom: "30px"
          }}
        >

          <p>
            <strong>Formato:</strong> Apenas arquivos PNG.
          </p>

          <p>
            <strong>Recomendação:</strong> 1024x1024 pixels.
          </p>

          <p>
            <strong>Importante:</strong> mínimo 20% visível.
          </p>

        </div>

        {/* REMOVER FUNDO */}
        <a
          href="https://www.remove.bg/pt-br/upload"
          target="_blank"
          style={{
            display: "block",
            background: "#111827",
            padding: "18px",
            borderRadius: "16px",
            textAlign: "center",
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            marginBottom: "22px"
          }}
        >
          ✨ Remover Fundo da Logo
        </a>

        {/* ALERTA */}
        <div
          style={{
            background: "rgba(234,179,8,0.08)",
            padding: "20px",
            borderRadius: "18px",
            marginBottom: "45px"
          }}
        >

          <p
            style={{
              color: "#facc15",
              fontWeight: "bold",
              marginBottom: "10px"
            }}
          >
            ⚠️ IMPORTANTE
          </p>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "30px"
            }}
          >
            Você pode alterar a logomarca até
            3 vezes a cada 30 dias.
          </p>

        </div>

        {/* CONTATO */}
        <h2
          style={{
            fontSize: "34px",
            fontWeight: "bold",
            marginBottom: "25px"
          }}
        >
          📱 Contato dos Banners
        </h2>

        {/* INPUT */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "25px"
          }}
        >

          <input
            type="text"
            placeholder="(00) 0000 - 0000"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            style={{
              flex: 1,
              padding: "20px",
              borderRadius: "16px",
              background: "#111827",
              color: "white",
              border: "none",
              fontSize: "18px"
            }}
          />

          <button
            onClick={salvarContato}
            style={{
              background:
                "linear-gradient(90deg,#2563eb,#3b82f6)",
              padding: "0 35px",
              borderRadius: "16px",
              border: "none",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            ENTER
          </button>

        </div>

        {/* PREVIEW */}
        <div
          style={{
            background: "#111827",
            borderRadius: "22px",
            padding: "25px"
          }}
        >

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              marginBottom: "20px"
            }}
          >

            {logo ? (
              <img
                src={logo}
                alt="logo"
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain"
                }}
              />
            ) : (
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "18px",
                  background: "#1e293b"
                }}
              />
            )}

            <div>

              <h3
                style={{
                  fontSize: "28px",
                  fontWeight: "bold"
                }}
              >
                DIOWPLAY 🚀
              </h3>

              <p
                style={{
                  color: "#94a3b8"
                }}
              >
                Preview do banner
              </p>

            </div>

          </div>

          <p
            style={{
              color: "#94a3b8"
            }}
          >
            {contato || "Nenhum contato cadastrado"}
          </p>

        </div>

      </div>

    </main>
  );
}