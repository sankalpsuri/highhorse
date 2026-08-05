import { supabaseClient } from "@/lib/supabase/client";

// Every image-rendering component should call this rather than
// constructing Supabase storage URLs manually.
export function resolveStorageUrl(key: string): string {
  return supabaseClient.storage.from("media").getPublicUrl(key).data.publicUrl;
}
