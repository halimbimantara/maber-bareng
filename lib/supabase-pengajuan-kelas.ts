import { supabase } from "./supabase"

// Types for class application data
export interface PengajuanKelas {
  id?: string
  created_at?: string
  nama_siswa: string
  email: string
  kelas: string
  no_telepon: string
  mata_pelajaran: string
  jadwal_preferensi: string
  catatan_tambahan?: string
  jenis_kelas: "lanjut-studi" | "pengembangan-diri"
  jenis_keterampilan?: string
  pengalaman_sebelumnya?: string
  tujuan_pembelajaran?: string
  status?: "pending" | "approved" | "rejected" | "completed"
  admin_notes?: string
  approved_at?: string
  approved_by?: string
  updated_at?: string
}

export const submitPengajuanKelas = async (
  data: Omit<
    PengajuanKelas,
    "id" | "created_at" | "updated_at" | "status" | "admin_notes" | "approved_at" | "approved_by"
  >,
) => {
  try {
    const { data: result, error } = await supabase
      .from("pengajuan_kelas")
      .insert([{ ...data, status: "pending" }])
      .select()

    if (error) {
      console.error("Supabase error:", error)

      // Handle different types of errors
      if (error.code === "42P01" || (error.message && error.message.includes("does not exist"))) {
        throw new Error("Database tabel belum dibuat. Silakan hubungi administrator untuk setup database.")
      }

      if (error.code === "23505") {
        throw new Error("Pengajuan dengan data yang sama sudah pernah dikirim sebelumnya.")
      }

      // Generic error handling
      const errorMessage = error.message || error.details || "Terjadi kesalahan pada database"
      throw new Error(`Database error: ${errorMessage}`)
    }

    return result
  } catch (error) {
    console.error("Error submitting class application:", error)

    // Re-throw the error if it's already a custom error
    if (error instanceof Error) {
      throw error
    }

    // Handle unknown error types
    throw new Error("Terjadi kesalahan yang tidak diketahui saat mengirim pengajuan kelas")
  }
}

export const getPengajuanKelas = async (email?: string) => {
  try {
    let query = supabase.from("pengajuan_kelas").select("*").order("created_at", { ascending: false })

    if (email) {
      query = query.eq("email", email)
    }

    const { data, error } = await query

    if (error) {
      console.error("Supabase error:", error)

      // Handle table not exists error
      if (error.code === "42P01" || (error.message && error.message.includes("does not exist"))) {
        console.warn("Pengajuan kelas table does not exist yet")
        return []
      }

      // Generic error handling
      const errorMessage = error.message || error.details || "Terjadi kesalahan pada database"
      throw new Error(`Database error: ${errorMessage}`)
    }

    return data || []
  } catch (error) {
    console.error("Error fetching class applications:", error)

    // Re-throw the error if it's already a custom error
    if (error instanceof Error) {
      throw error
    }

    // Handle unknown error types
    throw new Error("Terjadi kesalahan yang tidak diketahui saat mengambil data pengajuan kelas")
  }
}

export const updatePengajuanKelasStatus = async (
  id: string,
  status: "approved" | "rejected" | "completed",
  adminNotes?: string,
  approvedBy?: string,
) => {
  try {
    const updateData: any = {
      status,
      admin_notes: adminNotes,
      updated_at: new Date().toISOString(),
    }

    if (status === "approved") {
      updateData.approved_at = new Date().toISOString()
      updateData.approved_by = approvedBy
    }

    const { data, error } = await supabase.from("pengajuan_kelas").update(updateData).eq("id", id).select()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Database error: ${error.message}`)
    }

    return data
  } catch (error) {
    console.error("Error updating class application status:", error)
    if (error instanceof Error) {
      throw error
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui saat mengupdate status pengajuan")
  }
}
