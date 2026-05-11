export default function UsedPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          marginBottom: "20px",
        }}
      >
        ¿Te dejamos con ganas de más?
      </h1>

      {/* LIPS PLACEHOLDER */}
      <div style={{ fontSize: "50px", marginBottom: "20px" }}>
        💋
      </div>

      <p
        style={{
          maxWidth: "300px",
          fontSize: "16px",
          marginBottom: "30px",
          opacity: 0.8,
        }}
      >
        Seguinos en nuestras redes y encontrá más contenido exclusivo
      </p>

      {/* SOCIAL ICONS */}
      <div style={{ display: "flex", gap: "20px" }}>
        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "2px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          🎵
        </div>

        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "2px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          📸
        </div>

        <div
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "2px solid white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          𝕏
        </div>
      </div>
    </div>
  );
}