import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { token, videoId } = await req.json();

  if (!token || !videoId) {
    return NextResponse.json({ error: "Missing data" }, { status: 400 });
  }

  // Get token
  const { data, error } = await supabase
    .from("tokens_table")
    .select("*")
    .eq("token", token)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  if (data.used) {
    return NextResponse.json({ error: "Already used" }, { status: 400 });
  }

  // Mark as used
  const { error: updateError } = await supabase
    .from("tokens_table")
    .update({
      used: true,
      selected_video: videoId,
    })
    .eq("token", token);

  if (updateError) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
