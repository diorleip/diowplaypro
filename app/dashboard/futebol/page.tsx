const jogos = [
  {
    casa: "Flamengo",
    fora: "Palmeiras",
    horario: "19:30"
  },
  {
    casa: "Corinthians",
    fora: "São Paulo",
    horario: "21:00"
  },
  {
    casa: "Barcelona",
    fora: "Real Madrid",
    horario: "17:00"
  }
];

const cores = [
  "linear-gradient(135deg,#2563eb,#020617)",
  "linear-gradient(135deg,#dc2626,#020617)",
  "linear-gradient(135deg,#16a34a,#020617)",
  "linear-gradient(135deg,#eab308,#020617)",
  "linear-gradient(135deg,#111827,#000000)"
];

export default function Futebol() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >

      {/* TOPO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "15px"
        }}
      >

        <h1
          style={{
            fontSize: "60px",
            fontWeight: "bold"
          }}
        >
          Futebol ⚽
        </h1>

        <a
          href="/dashboard"
          style={{
            background: "#111827",
            padding: "14px 24px",
            borderRadius: "14px",
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
            border: "1px solid rgba(59,130,246,0.15)",
            boxShadow: "0 0 20px rgba(37,99,235,0.08)"
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
        Gere banners automáticos profissionais 🚀
      </p>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "30px"
        }}
      >

        {jogos.map((jogo, index) => (
          <div
            key={index}
            style={{
              background: "#0f172a",
              borderRadius: "30px",
              padding: "30px",
              border: "1px solid rgba(59,130,246,0.15)",
              position: "relative",
              overflow: "hidden"
            }}
          >

            {/* GLOW */}
            <div
              style={{
                position: "absolute",
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: "rgba(37,99,235,0.12)",
                filter: "blur(80px)",
                top: "-60px",
                right: "-60px"
              }}
            />

            {/* TIMES */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "35px",
                position: "relative",
                zIndex: 2
              }}
            >

              {/* CASA */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >

                <div
                  style={{
                    width: "85px",
                    height: "85px",
                    borderRadius: "50%",
                    background: "#1e293b",
                    marginBottom: "12px"
                  }}
                />

                <span
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  {jogo.casa}
                </span>

              </div>

              {/* VS */}
              <span
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  color: "#3b82f6"
                }}
              >
                VS
              </span>

              {/* FORA */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >

                <div
                  style={{
                    width: "85px",
                    height: "85px",
                    borderRadius: "50%",
                    background: "#1e293b",
                    marginBottom: "12px"
                  }}
                />

                <span
                  style={{
                    fontWeight: "bold"
                  }}
                >
                  {jogo.fora}
                </span>

              </div>

            </div>

            {/* HORÁRIO */}
            <p
              style={{
                textAlign: "center",
                color: "#94a3b8",
                marginBottom: "25px",
                position: "relative",
                zIndex: 2
              }}
            >
              Hoje • {jogo.horario}
            </p>

            {/* GERAR */}
            <a
              href="/dashboard/futebol/banner"
              style={{
                display: "block",
                textAlign: "center",
                background:
                  "linear-gradient(90deg,#2563eb,#3b82f6)",
                padding: "16px",
                borderRadius: "14px",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                marginBottom: "22px",
                position: "relative",
                zIndex: 2,
                boxShadow: "0 0 20px rgba(37,99,235,0.25)"
              }}
            >
              GERAR BANNER
            </a>

            {/* MINIATURAS */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "22px",
                position: "relative",
                zIndex: 2
              }}
            >

              {cores.map((cor, i) => (
                <div
                  key={i}
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "14px",
                    background: cor,
                    border: "2px solid rgba(255,255,255,0.08)",
                    cursor: "pointer",
                    boxShadow: "0 0 12px rgba(37,99,235,0.12)"
                  }}
                />
              ))}

            </div>

            {/* MODELOS */}
            <a
              href="/dashboard/futebol/modelos"
              style={{
                display: "block",
                textAlign: "center",
                background: "#111827",
                padding: "15px",
                borderRadius: "14px",
                color: "white",
                textDecoration: "none",
                fontWeight: "bold",
                border: "1px solid rgba(59,130,246,0.12)",
                position: "relative",
                zIndex: 2
              }}
            >
              ESCOLHER MODELO
            </a>

          </div>
        ))}

      </div>

    </main>
  );
}