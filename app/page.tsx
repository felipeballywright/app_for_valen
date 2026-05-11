"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter(); // moved here
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!token) {
      setStatus("no-token");
      return;
    }

    const fetchToken = async () => {
      const { data } = await supabase
        .from("tokens_table")
        .select("*")
        .eq("token", token)
        .single();

      if (!data) {
        setStatus("invalid");
        return;
      }

      if (data.used) {
        router.push("/used");
        return;
      }

      setStatus("valid");
    };

    fetchToken();
  }, [token, router]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "no-token") return <div>No token provided</div>;
  if (status === "invalid") return <div>Invalid token</div>;

  const videos = Array.from({ length: 10 }, (_, i) => ({
  id: `video${i + 1}`,
  name: `Artista ${i + 1}`,
}));

return (
  <div
    style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)",
      color: "white",
      padding: "20px",
      fontFamily: "sans-serif",
    }}
  >
    {/* HEADER */}
    <div style={{ textAlign: "center", marginBottom: "30px" }}>
      <h1 style={{ color: "#ffb300", fontSize: "42px", margin: 0 }}>
        SEX
      </h1>

      <h2 style={{ fontSize: "22px", fontWeight: 400 }}>
        Deslizá para ver contenido exclusivo
      </h2>

      <div style={{ marginTop: "20px", fontSize: "14px", opacity: 0.8 }}>
        <strong>⚠️ Una elección, una oportunidad.</strong>
        <br />
        Podés elegir un solo video y reproducirlo una única vez.
      </div>
    </div>

    {/* VIDEO LIST */}
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {videos.map((video) => (
        <div
          key={video.id}
          onClick={async () => {
            await fetch("/api/select-video", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                token,
                videoId: video.id,
              }),
            });

            window.location.href = `/watch/${video.id}?token=${token}`;
          }}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            cursor: "pointer",
          }}
        >
          {/* IMAGE PLACEHOLDER */}
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "50%",
              background: "#555",
              marginRight: "15px",
            }}
          />

          {/* TEXT */}
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: "bold", fontSize: "18px" }}>
              {video.name}
            </div>
            <div style={{ fontSize: "12px", opacity: 0.7 }}>
              Video exclusivo
            </div>
          </div>

          {/* PLAY BUTTON */}
          <div
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
            }}
          >
            ▶
          </div>
        </div>
      ))}
    </div>
  </div>
);
}
``