import { supabase } from "./supabase"

export interface BimbinganKelas {
  id: number
  nama_kelas: string
  deskripsi: string
  mata_pelajaran: string[]
  jadwal: string
  durasi_per_sesi: number
  total_sesi: number
  kapasitas_maksimal: number
  peserta_terdaftar: number
  instruktur: string
  tingkat_kesulitan: "pemula" | "menengah" | "lanjut"
  kategori: string
  tanggal_mulai: string
  tanggal_selesai: string
  status: "aktif" | "penuh" | "selesai" | "dibatalkan"
  fasilitas: string[]
  syarat_khusus?: string
  gambar_url?: string
  created_at?: string
  updated_at?: string
}

export async function getBimbinganKelas(): Promise<BimbinganKelas[]> {
  try {
    const { data, error } = await supabase
      .from("bimbingan_kelas")
      .select("*")
      .eq("status", "aktif")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching bimbingan kelas:", error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error in getBimbinganKelas:", error)
    throw error
  }
}

export async function getBimbinganKelasByKategori(kategori: string): Promise<BimbinganKelas[]> {
  try {
    const { data, error } = await supabase
      .from("bimbingan_kelas")
      .select("*")
      .eq("kategori", kategori)
      .eq("status", "aktif")
      .order("tanggal_mulai", { ascending: true })

    if (error) {
      console.error("Error fetching bimbingan kelas by kategori:", error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error in getBimbinganKelasByKategori:", error)
    throw error
  }
}

export async function getBimbinganKelasById(id: number): Promise<BimbinganKelas | null> {
  try {
    const { data, error } = await supabase.from("bimbingan_kelas").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching bimbingan kelas by id:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in getBimbinganKelasById:", error)
    throw error
  }
}

export function getDifficultyColor(level: string): string {
  switch (level) {
    case "pemula":
      return "text-green-600 bg-green-50"
    case "menengah":
      return "text-yellow-600 bg-yellow-50"
    case "lanjut":
      return "text-red-600 bg-red-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "aktif":
      return "text-green-600 bg-green-50"
    case "penuh":
      return "text-orange-600 bg-orange-50"
    case "selesai":
      return "text-gray-600 bg-gray-50"
    case "dibatalkan":
      return "text-red-600 bg-red-50"
    default:
      return "text-gray-600 bg-gray-50"
  }
}
