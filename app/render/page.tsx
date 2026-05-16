"use client";

import {
  useEffect,
  useState
} from "react";

import TopNav from "../components/TopNav";

export default function RenderPage() {

  const [titulo,
    setTitulo] =
    useState("");

  const [imagem,
    setImagem] =
    useState("");

  const [sinopse,
    setSinopse] =
    useState("");

  useEffect(() => {

    setTitulo(
      localStorage.getItem(
        "banner_titulo"
      ) || ""
    );

    setImagem(
      localStorage.getItem(
        "banner_imagem"
      ) || ""
    );

    setSinopse(
      localStorage.getItem(
        "banner_sinopse"
      ) || ""
    );

  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        padding: "30px",
        color: "white",
        fontFamily: "Arial"
      }}
    >

      {/* NAV */}
      <TopNav />

      {/* TITULO */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "30px"
        }}
      >

        <div
          style={{
            color: "#22d3ee",
            fontSize: "42px",
            fontWeight: "bold",
            marginBottom: "10px"
          }}
        >
          Banner Gerado
        </div>

      </div>

      {/* BANNER */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          background: "#071226",
          borderRadius: "24px",
          overflow: "hidden",
          border:
            "1px solid rgba(255,255,255,0.08)"
        }}
      >

        {/* IMAGEM */}
        {imagem && (

          <img
            src={
              imagem.startsWith("http")
                ? imagem
                : `https://image.tmdb.org/t/p/original${imagem}`
            }
            alt={titulo}
            style={{
              width: "100%",
              height: "500px",
              objectFit: "cover"
            }}
          />

        )}

        {/* TEXTO */}
        <div
          style={{
            padding: "30px"
          }}
        >

          <div
            style={{
              color: "#22d3ee",
              fontSize: "36px",
              fontWeight: "bold",
              marginBottom: "20px"
            }}
          >
            {titulo}
          </div>

          <div
            style={{
              color: "#cbd5e1",
              fontSize: "16px",
              lineHeight: "30px"
            }}
          >
            {sinopse}
          </div>

        </div>

      </div>

    </main>
  );

}