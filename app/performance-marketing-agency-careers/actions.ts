"use server"

import { getSupabaseServer } from "@/lib/supabase/server"
import { CONTACT_EMAIL } from "@/lib/constants"

const ACCEPTED_EXTENSIONS = [".pdf", ".doc", ".docx"]
const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

export async function submitCareerApplication(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const name = (formData.get("name") as string)?.trim()
  const countryCode = formData.get("countryCode") as string
  const phone = (formData.get("phone") as string)?.trim()
  const employmentType = formData.get("employmentType") as string
  const experience = (formData.get("experience") as string)?.trim()
  const jobRole = formData.get("jobRole") as string
  const resume = formData.get("resume") as File | null
  const uniqueValue = (formData.get("uniqueValue") as string)?.trim()

  if (!name || !phone || !employmentType || !experience || !jobRole) {
    return { success: false, error: "Please fill in all required fields." }
  }

  if (!resume || resume.size === 0) {
    return { success: false, error: "Please attach your resume." }
  }

  const ext = "." + resume.name.split(".").pop()?.toLowerCase()
  if (!ACCEPTED_EXTENSIONS.includes(ext) && !ACCEPTED_MIME_TYPES.includes(resume.type)) {
    return {
      success: false,
      error: "Only PDF and Word files (.pdf, .doc, .docx) are accepted.",
    }
  }

  if (resume.size > MAX_FILE_SIZE) {
    return { success: false, error: "Resume file must be under 10 MB." }
  }

  let supabase
  try {
    supabase = getSupabaseServer()
  } catch (err) {
    console.error("[careers] Supabase client init failed:", err)
    return {
      success: false,
      error: "Server configuration error. Please contact support.",
    }
  }

  try {
    const timestamp = Date.now()
    const safeName = resume.name.replace(/[^a-zA-Z0-9._-]/g, "_")
    const storagePath = `${timestamp}_${safeName}`

    const fileBuffer = Buffer.from(await resume.arrayBuffer())
    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(storagePath, fileBuffer, {
        contentType: resume.type,
        upsert: false,
      })

    if (uploadError) {
      console.error("[careers] Resume upload failed:", JSON.stringify({ message: uploadError.message, name: uploadError.name }))
      return {
        success: false,
        error: `Failed to upload resume. Please try again or email ${CONTACT_EMAIL}.`,
      }
    }

    const { error: insertError } = await supabase
      .from("career_applications")
      .insert({
        full_name: name,
        phone_country_code: countryCode,
        phone_number: phone,
        employment_type: employmentType,
        experience,
        job_looking_for: jobRole,
        resume_path: storagePath,
        unique_value: uniqueValue || null,
      })

    if (insertError) {
      console.error("[careers] DB insert failed:", JSON.stringify({ message: insertError.message, code: insertError.code, details: insertError.details, hint: insertError.hint }))
      await supabase.storage.from("resumes").remove([storagePath])
      return {
        success: false,
        error: `Failed to save application. Please try again or email ${CONTACT_EMAIL}.`,
      }
    }

    return { success: true }
  } catch (err) {
    console.error("[careers] Unexpected error:", err instanceof Error ? err.stack ?? err.message : String(err))
    return {
      success: false,
      error: `Failed to save your application. Please try again or email ${CONTACT_EMAIL}.`,
    }
  }
}
