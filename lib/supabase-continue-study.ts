import { supabase } from "./supabase"

// Types for continue study survey data
export interface ContinueStudySurveyResponse {
  id?: string
  created_at?: string
  nama_siswa: string
  email: string
  kelas: string
  no_telepon: string
  jenis_pendidikan_tinggi?: string
  bidang_studi?: string
  sudah_memilih_pt?: string
  tantangan_terbesar?: string
  updated_at?: string
}

export const submitContinueStudySurvey = async (
  data: Omit<ContinueStudySurveyResponse, "id" | "created_at" | "updated_at">,
) => {
  try {
    const { data: result, error } = await supabase.from("continue_study_survey_responses").insert([data]).select()

    if (error) {
      console.error("Supabase error:", error)

      // Handle different types of errors
      if (error.code === "42P01" || (error.message && error.message.includes("does not exist"))) {
        throw new Error("Database tabel belum dibuat. Silakan hubungi administrator untuk setup database.")
      }

      if (error.code === "23505") {
        throw new Error("Data sudah pernah dikirim sebelumnya.")
      }

      // Generic error handling
      const errorMessage = error.message || error.details || "Terjadi kesalahan pada database"
      throw new Error(`Database error: ${errorMessage}`)
    }

    return result
  } catch (error) {
    console.error("Error submitting survey:", error)

    // Re-throw the error if it's already a custom error
    if (error instanceof Error) {
      throw error
    }

    // Handle unknown error types
    throw new Error("Terjadi kesalahan yang tidak diketahui saat mengirim survei")
  }
}

export const getContinueStudySurveyResults = async () => {
  try {
    const { data, error } = await supabase
      .from("continue_study_survey_responses")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)

      // Handle table not exists error
      if (error.code === "42P01" || (error.message && error.message.includes("does not exist"))) {
        console.warn("Continue study survey table does not exist yet")
        return []
      }

      // Generic error handling
      const errorMessage = error.message || error.details || "Terjadi kesalahan pada database"
      throw new Error(`Database error: ${errorMessage}`)
    }

    return data || []
  } catch (error) {
    console.error("Error fetching survey results:", error)

    // Re-throw the error if it's already a custom error
    if (error instanceof Error) {
      throw error
    }

    // Handle unknown error types
    throw new Error("Terjadi kesalahan yang tidak diketahui saat mengambil data survei")
  }
}
