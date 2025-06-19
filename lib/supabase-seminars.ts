import { supabase } from "./supabase"

// Types for seminar data
export interface Seminar {
  id: string
  created_at: string
  title: string
  description: string
  speaker: string
  date: string
  time_start: string
  time_end: string
  location: string
  max_participants: number
  current_participants: number
  status: "available" | "full" | "cancelled" | "completed"
  category: string
  requirements?: string
  benefits?: string[]
  image_url?: string
  registration_deadline?: string
  updated_at: string
}

export interface SeminarRegistration {
  id?: string
  created_at?: string
  seminar_id: string
  nama_siswa: string
  email: string
  kelas: string
  no_telepon: string
  alasan_mengikuti?: string
  updated_at?: string
}

export const getSeminars = async (category?: string) => {
  try {
    let query = supabase.from("seminars").select("*").order("date", { ascending: true })

    if (category) {
      query = query.eq("category", category)
    }

    const { data, error } = await query

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Database error: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("Error fetching seminars:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui saat mengambil data seminar")
  }
}

export const getSeminarById = async (id: string) => {
  try {
    const { data, error } = await supabase.from("seminars").select("*").eq("id", id).single()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Database error: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error fetching seminar:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui saat mengambil data seminar")
  }
}

export const registerForSeminar = async (
  registrationData: Omit<SeminarRegistration, "id" | "created_at" | "updated_at">,
) => {
  try {
    // First, check if seminar is still available
    const seminar = await getSeminarById(registrationData.seminar_id)

    if (seminar.status === "full") {
      throw new Error("Seminar sudah penuh")
    }

    if (seminar.status === "cancelled") {
      throw new Error("Seminar telah dibatalkan")
    }

    if (seminar.current_participants >= seminar.max_participants) {
      throw new Error("Seminar sudah mencapai kapasitas maksimum")
    }

    // Register for seminar (you would need to create seminar_registrations table)
    // For now, we'll just update the participant count
    const { data, error } = await supabase
      .from("seminars")
      .update({
        current_participants: seminar.current_participants + 1,
        status: seminar.current_participants + 1 >= seminar.max_participants ? "full" : "available",
      })
      .eq("id", registrationData.seminar_id)
      .select()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Database error: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error registering for seminar:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui saat mendaftar seminar")
  }
}
