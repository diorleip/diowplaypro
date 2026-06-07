"use client";

export default function BannerEsportesPage() {
  const logo =
    typeof window !== "undefined"
      ? localStorage.getItem("diow_logo") || ""
      : "";

  return (
    <div className="min-h-screen bg-[#050505] p-6">
      <div className="flex justify-center">
        <div
          style={{
            width: 948,
            height: 1659,
            backgroundImage: "url('/modelos/modelo01.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            transform: "scale(0.45)",
            transformOrigin: "top center",
          }}
        >
          {logo && (
            <img
              src={logo}
              alt="Logo"
              style={{
                position: "absolute",
                top: 40,
                left: "50%",
                transform: "translateX(-50%)",
                width: 180,
                objectFit: "contain",
              }}
            />
          )}

          <div
            style={{
              position: "absolute",
              top: 220,
              left: 0,
              right: 0,
              textAlign: "center",
              color: "#ffffff",
              fontSize: 68,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            JOGOS
          </div>

          <div
            style={{
              position: "absolute",
              top: 300,
              left: 0,
              right: 0,
              textAlign: "center",
              color: "#3b82f6",
              fontSize: 68,
              fontWeight: 900,
              letterSpacing: 2,
            }}
          >
            DE HOJE
          </div>

          <div
  style={{
    position: "absolute",
    top: 3500,
    left: 60,
    right: 60,
    display: "flex",
    flexDirection: "column",
    gap: 15,
  }}
>
  {[1, 2, 3, 4].map((item) => (
    <div
      key={item}
      style={{
        background: "rgba(0,0,0,0.45)",
        borderRadius: 24,
        padding: "20px 30px",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "#60a5fa",
          fontSize: 18,
          fontWeight: 800,
          marginBottom: 12,
        }}
      >
        BRASILEIRÃO SÉRIE A
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            background: "#fff",
            borderRadius: "50%",
          }}
        />

        <div
          style={{
            flex: 1,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 800,
            }}
          >
            FLAMENGO
          </div>

          <div
            style={{
              fontSize: 28,
              fontWeight: 900,
              margin: "8px 0",
            }}
          >
            X
          </div>

          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
            }}
          >
            PALMEIRAS
          </div>
        </div>

        <div
          style={{
            width: 120,
            height: 120,
            background: "#fff",
            borderRadius: "50%",
          }}
        />
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 15,
        }}
      >
        <span
          style={{
            background: "#2563eb",
            padding: "6px 18px",
            borderRadius: 12,
            fontSize: 16,
            fontWeight: 800,
          }}
        >
          🕒 16:00
        </span>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          fontSize: 18,
          color: "#d1d5db",
          fontWeight: 700,
        }}
      >
        📺 Globo • Premiere
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
    </div>
  );
}