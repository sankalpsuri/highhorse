"use server"

import { getSupabaseServer } from "@/lib/supabase/server"

const FRIENDLY_ERROR =
  "Something went wrong. Please try again or email contact@highhorse.in."

export interface LandingLeadPayload {
  landing_page: "landing" | "seo-landing"
  form_location: string
  name: string
  email: string
  phone: string
  problem?: string
  message?: string
  website_url?: string
  honeypot?: string
  page_url?: string
  referrer?: string
  user_agent?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

export interface LandingLeadResult {
  success: boolean
  error?: string
  fieldErrors?: Record<string, string>
}

export async function submitLandingLead(
  data: LandingLeadPayload
): Promise<LandingLeadResult> {
  if (data.honeypot) {
    return { success: true }
  }

  const fieldErrors: Record<string, string> = {}

  const name = (data.name || "").trim()
  const email = (data.email || "").trim()
  const phone = (data.phone || "").trim()
  const problem = (data.problem || "").trim()
  const message = (data.message || "").trim()
  const websiteUrl = (data.website_url || "").trim()

  if (!name) fieldErrors.name = "Name is required."
  else if (name.length > 200) fieldErrors.name = "Name is too long (max 200)."

  if (!email) fieldErrors.email = "Email is required."
  else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    fieldErrors.email = "Please enter a valid email."
  else if (email.length > 320) fieldErrors.email = "Email is too long."

  if (!phone) fieldErrors.phone = "Phone number is required."
  else {
    const digits = phone.replace(/\D/g, "")
    if (digits.length < 7 || digits.length > 15)
      fieldErrors.phone = "Please enter a valid phone number (7–15 digits)."
    else if (phone.length > 50) fieldErrors.phone = "Phone is too long."
  }

  if (problem.length > 2000)
    fieldErrors.problem = "Too long (max 2000 characters)."
  if (message.length > 5000)
    fieldErrors.message = "Too long (max 5000 characters)."
  if (websiteUrl.length > 500)
    fieldErrors.website_url = "URL is too long (max 500)."

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors }
  }

  let supabase
  try {
    supabase = getSupabaseServer()
  } catch {
    console.error(
      "[landing-leads] Supabase client init failed — check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY"
    )
    return { success: false, error: FRIENDLY_ERROR }
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from("landing_leads").insert({
      landing_page: data.landing_page,
      form_location: data.form_location,
      name,
      email,
      phone: phone || null,
      problem: problem || null,
      message: message || null,
      website_url: websiteUrl || null,
      page_url: (data.page_url || "").slice(0, 2000) || null,
      referrer: (data.referrer || "").slice(0, 2000) || null,
      user_agent: (data.user_agent || "").slice(0, 500) || null,
      utm_source: (data.utm_source || "").slice(0, 200) || null,
      utm_medium: (data.utm_medium || "").slice(0, 200) || null,
      utm_campaign: (data.utm_campaign || "").slice(0, 200) || null,
      utm_term: (data.utm_term || "").slice(0, 200) || null,
      utm_content: (data.utm_content || "").slice(0, 200) || null,
    })

    if (error) {
      console.error(
        "[landing-leads] Supabase insert error:",
        JSON.stringify(error)
      )
      return { success: false, error: FRIENDLY_ERROR }
    }

    return { success: true }
  } catch (err) {
    console.error(
      "[landing-leads] Unexpected:",
      err instanceof Error ? err.message : String(err)
    )
    return { success: false, error: FRIENDLY_ERROR }
  }
}
