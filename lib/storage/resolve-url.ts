import { supabaseClient } from "@/lib/supabase/client";

// Every image-rendering component should call this rather than
// constructing Supabase storage URLs manually.
export function resolveStorageUrl(key: string): string {
  const client = supabaseClient;
  if (!client) {
    throw new Error("Supabase is not configured — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return client.storage.from("media").getPublicUrl(key).data.publicUrl;
}
