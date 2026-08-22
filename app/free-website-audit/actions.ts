"use server"

import { getSupabaseServer } from "@/lib/supabase/server"

interface AuditPayload {
  name: string
  email: string
  websiteUrl: string
  phone: string
  notes: string
}

export async function submitAuditRequest(
  data: AuditPayload
): Promise<{ success: boolean; error?: string }> {
  if (!data.name.trim() || !data.email.trim() || !data.websiteUrl.trim()) {
    return { success: false, error: "Name, email, and website URL are required." }
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email.trim())) {
    return { success: false, error: "Please enter a valid email address." }
  }

  let supabase
  try {
    supabase = getSupabaseServer()
  } catch (err) {
    console.error("[audit] Supabase client init failed:", err)
    return {
      success: false,
      error: "Server configuration error. Please contact support.",
    }
  }

  try {
    const { error } = await supabase.from("website_audit_requests").insert({
      full_name: data.name.trim(),
      email: data.email.trim(),
      website_url: data.websiteUrl.trim(),
      phone: data.phone.trim() || null,
      notes: data.notes.trim() || null,
    })

    if (error) {
      console.error("[audit] Supabase insert failed:", error.message, error.code, error.details)
      return {
        success: false,
        error: "Failed to save your request. Please try again or email hello@highhorse.in.",
      }
    }

    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[audit] Unexpected error:", message)
    return {
      success: false,
      error: "Failed to save your request. Please try again or email hello@highhorse.in.",
    }
  }
}
