"use server"

import { getSupabaseServer } from "@/lib/supabase/server"

interface ContactPayload {
  goals: string[]
  company: string
  website: string
  offering: string
  region: string
  spend: string
  timeline: string
  outcome: string
  name: string
  role: string
  email: string
  phone: string
}

export async function submitContactForm(
  data: ContactPayload
): Promise<{ success: boolean; error?: string }> {
  if (!data.name.trim() || !data.email.trim() || !data.company.trim()) {
    return { success: false, error: "Name, email, and company are required." }
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email.trim())) {
    return { success: false, error: "Please enter a valid email address." }
  }

  if (data.goals.length === 0) {
    return { success: false, error: "Please select at least one goal." }
  }

  let supabase
  try {
    supabase = getSupabaseServer()
  } catch (err) {
    console.error("[contact] Supabase client init failed:", err)
    return {
      success: false,
      error: "Server configuration error. Please contact support.",
    }
  }

  try {
    const { error } = await supabase.from("contact_submissions").insert({
      goals: data.goals.join(", "),
      company: data.company.trim(),
      website: data.website.trim() || null,
      offering: data.offering.trim() || null,
      region: data.region || null,
      spend: data.spend || null,
      timeline: data.timeline || null,
      outcome: data.outcome.trim() || null,
      name: data.name.trim(),
      role: data.role.trim() || null,
      email: data.email.trim(),
      phone: data.phone.trim() || null,
    })

    if (error) {
      console.error("[contact] Supabase insert failed:", error.message, error.code, error.details)
      return {
        success: false,
        error: "Failed to save your submission. Please try again or email hello@highhorse.in.",
      }
    }

    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[contact] Unexpected error:", message)
    return {
      success: false,
      error: "Failed to save your submission. Please try again or email hello@highhorse.in.",
    }
  }
}
