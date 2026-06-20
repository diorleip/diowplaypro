"use client";

export default function EsportesPage() {

  const emBreve = () => {
    alert("🚧 Em breve!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050505",
        padding: 30,
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 30,
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: 34,
            fontWeight: 900,
            margin: 0,
          }}
        >
          🏆 Central de Esportes
        </h1>

        <button
          onClick={() =>
            (window.location.href = "/dashboard")
          }
          style={{
            background: "#10b981",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "12px 20px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          ← Dashboard
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 20,
        }}
      >

        {/* FUTEBOL */}
        <div
          onClick={() =>
            (window.location.href =
              "/dashboard/esportes/banner")
          }
          style={{
            background:
              "linear-gradient(135deg,#0ea5e9,#1d4ed8)",
            borderRadius: 16,
            padding: 20,
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 50 }}>⚽</div>

          <h2
            style={{
              color: "#fff",
              fontSize: 22,
              marginTop: 8,
            }}
          >
            Futebol
          </h2>

          <p
            style={{
              color: "#dbeafe",
              fontSize: 13,
            }}
          >
            Gerador de banners
          </p>
        </div>

        {/* NBA */}
        <div
          onClick={emBreve}
          style={{
            background:
              "linear-gradient(135deg,#ea580c,#c2410c)",
            borderRadius: 16,
            padding: 20,
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 50 }}>🏀</div>

          <h2
            style={{
              color: "#fff",
              fontSize: 22,
              marginTop: 8,
            }}
          >
            NBA
          </h2>

          <p
            style={{
              color: "#fed7aa",
              fontSize: 13,
            }}
          >
            Em breve
          </p>
        </div>

        {/* FORMULA 1 */}
        <div
          onClick={emBreve}
          style={{
            background:
              "linear-gradient(135deg,#dc2626,#991b1b)",
            borderRadius: 16,
            padding: 20,
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 50 }}>🏎️</div>

          <h2
            style={{
              color: "#fff",
              fontSize: 22,
              marginTop: 8,
            }}
          >
            Fórmula 1
          </h2>

          <p
            style={{
              color: "#fecaca",
              fontSize: 13,
            }}
          >
            Em breve
          </p>
        </div>

        {/* UFC */}
        <div
          onClick={emBreve}
          style={{
            background:
              "linear-gradient(135deg,#7c3aed,#4c1d95)",
            borderRadius: 16,
            padding: 20,
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 50 }}>🥊</div>

          <h2
            style={{
              color: "#fff",
              fontSize: 22,
              marginTop: 8,
            }}
          >
            UFC
          </h2>

          <p
            style={{
              color: "#ddd6fe",
              fontSize: 13,
            }}
          >
            Em breve
          </p>
        </div>

        {/* DEMAIS */}
        <div
          onClick={emBreve}
          style={{
            background:
              "linear-gradient(135deg,#475569,#1e293b)",
            borderRadius: 16,
            padding: 20,
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 50 }}>🎯</div>

          <h2
            style={{
              color: "#fff",
              fontSize: 22,
              marginTop: 8,
            }}
          >
            Demais Esportes
          </h2>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: 13,
            }}
          >
            Em breve
          </p>
        </div>

      </div>
    </div>
  );
}