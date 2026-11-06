"use server"

import { getSupabaseServer } from "@/lib/supabase/server"
import { CONTACT_EMAIL } from "@/lib/constants"

interface AuditPayload {
  email: string
  websiteUrl: string
}

export async function submitAuditRequest(
  data: AuditPayload
): Promise<{ success: boolean; error?: string }> {
  if (!data.email.trim() || !data.websiteUrl.trim()) {
    return { success: false, error: "Email and website URL are required." }
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
      email: data.email.trim(),
      website_url: data.websiteUrl.trim(),
    })

    if (error) {
      console.error("[audit] Supabase insert failed:", JSON.stringify({ message: error.message, code: error.code, details: error.details, hint: error.hint }))
      return {
        success: false,
        error: `Failed to save your request. Please try again or email ${CONTACT_EMAIL}.`,
      }
    }

    return { success: true }
  } catch (err) {
    console.error("[audit] Unexpected error:", err instanceof Error ? err.stack ?? err.message : String(err))
    return {
      success: false,
      error: `Failed to save your request. Please try again or email ${CONTACT_EMAIL}.`,
    }
  }
}
