import { supabase } from "./supabase"

// Types for tryout data
export interface Tryout {
  id: string
  created_at: string
  title: string
  description: string
  subject_areas: string[]
  total_questions: number
  duration_minutes: number
  difficulty_level: "easy" | "medium" | "hard"
  start_date: string
  end_date: string
  is_active: boolean
  max_participants?: number
  current_participants: number
  passing_score?: number
  instructions?: string
  benefits?: string[]
  requirements?: string
  link_tryout?: string // Add this line
  updated_at: string
}

export interface TryoutParticipation {
  id?: string
  created_at?: string
  tryout_id: string
  nama_siswa: string
  email: string
  kelas: string
  no_telepon: string
  score?: number
  completed_at?: string
  answers?: any[]
  updated_at?: string
}

export const getTryouts = async (activeOnly = true) => {
  try {
    let query = supabase.from("tryout").select("*").order("created_at", { ascending: false })

    if (activeOnly) {
      query = query.eq("is_active", true)
    }

    const { data, error } = await query

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Database error: ${error.message}`)
    }

    return data || []
  } catch (error) {
    console.error("Error fetching tryouts:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui saat mengambil data try out")
  }
}

export const getTryoutById = async (id: string) => {
  try {
    const { data, error } = await supabase.from("tryout").select("*").eq("id", id).single()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Database error: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error fetching tryout:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui saat mengambil data try out")
  }
}

export const registerForTryout = async (
  registrationData: Omit<TryoutParticipation, "id" | "created_at" | "updated_at">,
) => {
  try {
    // First, check if tryout is still available
    const tryout = await getTryoutById(registrationData.tryout_id)

    if (!tryout.is_active) {
      throw new Error("Try out sudah tidak aktif")
    }

    const currentDate = new Date()
    const startDate = new Date(tryout.start_date)
    const endDate = new Date(tryout.end_date)

    if (currentDate < startDate) {
      throw new Error("Try out belum dimulai")
    }

    if (currentDate > endDate) {
      throw new Error("Try out sudah berakhir")
    }

    if (tryout.max_participants && tryout.current_participants >= tryout.max_participants) {
      throw new Error("Try out sudah mencapai kapasitas maksimum")
    }

    // Register for tryout (you would need to create tryout_participations table)
    // For now, we'll just update the participant count
    const { data, error } = await supabase
      .from("tryout")
      .update({
        current_participants: tryout.current_participants + 1,
      })
      .eq("id", registrationData.tryout_id)
      .select()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Database error: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error registering for tryout:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui saat mendaftar try out")
  }
}

export const isRegistrationOpen = (tryout: Tryout): boolean => {
  if (!tryout.is_active) return false

  const currentDate = new Date()
  const startDate = new Date(tryout.start_date)
  const endDate = new Date(tryout.end_date)

  return currentDate >= startDate && currentDate <= endDate
}

export const getDifficultyLabel = (level: string): string => {
  switch (level) {
    case "easy":
      return "Mudah"
    case "medium":
      return "Sedang"
    case "hard":
      return "Sulit"
    default:
      return level
  }
}

export const getDifficultyColor = (level: string): string => {
  switch (level) {
    case "easy":
      return "text-green-600 bg-green-50 border-green-200"
    case "medium":
      return "text-yellow-600 bg-yellow-50 border-yellow-200"
    case "hard":
      return "text-red-600 bg-red-50 border-red-200"
    default:
      return "text-gray-600 bg-gray-50 border-gray-200"
  }
}

export const hasValidLink = (tryout: Tryout): boolean => {
  return !!(tryout.link_tryout && tryout.link_tryout.trim().length > 0)
}

export const openTryoutLink = (link: string) => {
  if (link) {
    window.open(link, "_blank", "noopener,noreferrer")
  }
}
