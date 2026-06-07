"use client";

import { useRouter } from "next/navigation";

export default function TopNav() {

  const router =
    useRouter();

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "14px",
        flexWrap: "wrap",
        marginBottom: "26px"
      }}
    >

      {/* ESQUERDA */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap"
        }}
      >

        {/* VOLTAR */}
        <button
          onClick={() =>
            router.back()
          }
          style={{
            background:
              "#111827",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "14px",
            padding: "12px 18px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          ← Voltar
        </button>

        {/* DASHBOARD */}
        <button
          onClick={() =>
            router.push(
              "/dashboard"
            )
          }
          style={{
            background:
              "linear-gradient(90deg,#2563eb,#22d3ee)",
            border: "none",
            borderRadius: "14px",
            padding: "12px 18px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          🏠 Dashboard
        </button>

      </div>

      {/* DIREITA */}
      <div
        style={{
          color: "#22d3ee",
          fontWeight: "bold",
          fontSize: "14px"
        }}
      >
        gerador.diowplay
      </div>

    </div>
  );

}