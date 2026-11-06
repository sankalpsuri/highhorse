"use server"

import { getSupabaseServer } from "@/lib/supabase/server"
import { CONTACT_EMAIL } from "@/lib/constants"

interface LandingFormPayload {
  name: string
  email: string
  phone: string
  problem: string
  want: string
  source: string
}

export async function submitLandingForm(
  data: LandingFormPayload
): Promise<{ success: boolean; error?: string }> {
  if (!data.name.trim() || !data.email.trim()) {
    return { success: false, error: "Name and email are required." }
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email.trim())) {
    return { success: false, error: "Please enter a valid email address." }
  }

  let supabase
  try {
    supabase = getSupabaseServer()
  } catch {
    console.error("[landing] Supabase client init failed")
    return {
      success: false,
      error: `Server configuration error. Please email ${CONTACT_EMAIL} directly.`,
    }
  }

  try {
    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim() || null,
      company: data.source,
      goals: "landing-page enquiry",
      offering: data.problem.trim() || null,
      outcome: data.want.trim() || null,
    })

    if (error) {
      console.error("[landing] Supabase insert failed:", JSON.stringify(error))
      return {
        success: false,
        error: `Failed to save. Please email ${CONTACT_EMAIL} directly.`,
      }
    }

    return { success: true }
  } catch (err) {
    console.error("[landing] Unexpected:", err instanceof Error ? err.message : String(err))
    return {
      success: false,
      error: `Something went wrong. Please email ${CONTACT_EMAIL} directly.`,
    }
  }
}
