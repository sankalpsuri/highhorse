import { resolveStorageUrl } from "@/lib/storage/resolve-url";

// TEMPORARY: safe to delete once Supabase Storage image resolution is confirmed working.
export default function TestStoragePage() {
  const url = resolveStorageUrl("case-studies/test-image/cover.png");

  return <img src={url} alt="storage test image" />;
}
