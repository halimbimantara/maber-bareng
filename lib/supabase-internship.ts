import { supabase } from "./supabase"

export interface Internship {
  id: number
  title: string
  company: string
  duration: string
  location: string
  type: "Full-time" | "Part-time" | "Remote" | "Hybrid"
  requirements: string
  description: string
  is_active: boolean
  max_participants: number
  current_participants: number
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface DaftarMagang {
  id: number
  internship_id: number
  nama: string
  no_wa: string
  kelas: string
  status: "pending" | "approved" | "rejected" | "completed"
  tanggal_daftar: string
  catatan?: string
  created_at: string
  updated_at: string
}

export interface InternshipRegistration {
  internship_id: number
  nama: string
  no_wa: string
  kelas: string
  catatan?: string
}

// Get all active internships
export async function getInternships(): Promise<Internship[]> {
  try {
    const { data, error } = await supabase
      .from("internship")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching internships:", error)
      throw new Error("Failed to fetch internships")
    }

    return data || []
  } catch (error) {
    console.error("Error in getInternships:", error)
    throw error
  }
}

// Get internship by ID
export async function getInternshipById(id: number): Promise<Internship | null> {
  try {
    const { data, error } = await supabase.from("internship").select("*").eq("id", id).eq("is_active", true).single()

    if (error) {
      console.error("Error fetching internship:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error in getInternshipById:", error)
    return null
  }
}

// Register for internship
export async function registerInternship(
  registration: InternshipRegistration,
): Promise<{ success: boolean; message: string; data?: DaftarMagang }> {
  try {
    // Check if internship exists and is active
    const internship = await getInternshipById(registration.internship_id)
    if (!internship) {
      return { success: false, message: "Magang tidak ditemukan atau tidak aktif" }
    }

    // Check if internship is full
    if (internship.current_participants >= internship.max_participants) {
      return { success: false, message: "Magang sudah penuh, tidak dapat mendaftar" }
    }

    // Check if user already registered for this internship
    const { data: existingRegistration } = await supabase
      .from("daftar_magang")
      .select("id")
      .eq("internship_id", registration.internship_id)
      .eq("no_wa", registration.no_wa)
      .single()

    if (existingRegistration) {
      return { success: false, message: "Anda sudah terdaftar untuk magang ini" }
    }

    // Insert registration
    const { data, error } = await supabase.from("daftar_magang").insert([registration]).select().single()

    if (error) {
      console.error("Error registering internship:", error)
      return { success: false, message: "Gagal mendaftar magang. Silakan coba lagi." }
    }

    // Update current participants count
    await supabase
      .from("internship")
      .update({ current_participants: internship.current_participants + 1 })
      .eq("id", registration.internship_id)

    return {
      success: true,
      message: "Berhasil mendaftar magang! Kami akan menghubungi Anda segera.",
      data,
    }
  } catch (error) {
    console.error("Error in registerInternship:", error)
    return { success: false, message: "Terjadi kesalahan sistem. Silakan coba lagi." }
  }
}

// Get registrations by internship ID
export async function getRegistrationsByInternshipId(internshipId: number): Promise<DaftarMagang[]> {
  try {
    const { data, error } = await supabase
      .from("daftar_magang")
      .select("*")
      .eq("internship_id", internshipId)
      .order("tanggal_daftar", { ascending: false })

    if (error) {
      console.error("Error fetching registrations:", error)
      throw new Error("Failed to fetch registrations")
    }

    return data || []
  } catch (error) {
    console.error("Error in getRegistrationsByInternshipId:", error)
    throw error
  }
}

// Get all registrations
export async function getAllRegistrations(): Promise<DaftarMagang[]> {
  try {
    const { data, error } = await supabase
      .from("daftar_magang")
      .select(`
        *,
        internship:internship_id (
          title,
          company
        )
      `)
      .order("tanggal_daftar", { ascending: false })

    if (error) {
      console.error("Error fetching all registrations:", error)
      throw new Error("Failed to fetch registrations")
    }

    return data || []
  } catch (error) {
    console.error("Error in getAllRegistrations:", error)
    throw error
  }
}

// Helper functions
export function getTypeColor(type: string): string {
  switch (type) {
    case "Full-time":
      return "bg-blue-100 text-blue-800"
    case "Part-time":
      return "bg-green-100 text-green-800"
    case "Remote":
      return "bg-purple-100 text-purple-800"
    case "Hybrid":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800"
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "rejected":
      return "bg-red-100 text-red-800"
    case "completed":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
