"use client";

import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function WatchPage({ params }: any) {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [valid, setValid] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (!token) return;

      const { data } = await supabase
        .from("tokens_table")
        .select("*")
        .eq("token", token)
        .single();

      if (data && data.selected_video === params.id) {
        setValid(true);
      }
    };

    check();
  }, [token, params.id]);

  if (!valid) return <div>Access denied</div>;

  return (
    <div>
      <h1>Watching {params.id}</h1>

      {/* Replace this with real video later */}
      <p>This is your selected video</p>
    </div>
  );
}