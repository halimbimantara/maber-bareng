import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export interface KelasPengembanganDiri {
  id: number
  judul: string
  deskripsi: string
  pengisi: string
  bio_pengisi: string
  kategori: string
  durasi_jam: number
  tanggal_mulai: string
  tanggal_selesai: string
  jadwal_hari: string
  jadwal_waktu: string
  max_peserta: number
  peserta_terdaftar: number
  lokasi: string
  fasilitas: string[]
  persyaratan: string[]
  materi: string[]
  tingkat_kesulitan: string
  status: string
  gambar_url: string
  created_at: string
  updated_at: string
}

export async function getKelasPengembanganDiri(): Promise<KelasPengembanganDiri[]> {
  try {
    const { data, error } = await supabase
      .from("kelas_pengembangan_diri")
      .select("*")
      .eq("status", "aktif")
      .order("tanggal_mulai", { ascending: true })

    if (error) {
      console.error("Error fetching kelas pengembangan diri:", error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error in getKelasPengembanganDiri:", error)
    throw error
  }
}

export async function getKelasPengembanganDiriByKategori(kategori: string): Promise<KelasPengembanganDiri[]> {
  try {
    const { data, error } = await supabase
      .from("kelas_pengembangan_diri")
      .select("*")
      .eq("status", "aktif")
      .eq("kategori", kategori)
      .order("tanggal_mulai", { ascending: true })

    if (error) {
      console.error("Error fetching kelas by kategori:", error)
      throw error
    }

    return data || []
  } catch (error) {
    console.error("Error in getKelasPengembanganDiriByKategori:", error)
    throw error
  }
}

export async function getKelasPengembanganDiriById(id: number): Promise<KelasPengembanganDiri | null> {
  try {
    const { data, error } = await supabase.from("kelas_pengembangan_diri").select("*").eq("id", id).single()

    if (error) {
      console.error("Error fetching kelas by id:", error)
      throw error
    }

    return data
  } catch (error) {
    console.error("Error in getKelasPengembanganDiriById:", error)
    throw error
  }
}

// Helper functions
export function getDifficultyColor(tingkat: string): string {
  switch (tingkat.toLowerCase()) {
    case "pemula":
      return "bg-green-100 text-green-800"
    case "menengah":
      return "bg-yellow-100 text-yellow-800"
    case "lanjutan":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function getCategoryColor(kategori: string): string {
  switch (kategori.toLowerCase()) {
    case "kewirausahaan":
      return "bg-purple-100 text-purple-800"
    case "keterampilan teknis":
      return "bg-blue-100 text-blue-800"
    case "hospitality":
      return "bg-orange-100 text-orange-800"
    case "digital marketing":
      return "bg-pink-100 text-pink-800"
    case "soft skills":
      return "bg-indigo-100 text-indigo-800"
    case "keuangan":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export function formatTanggal(tanggal: string): string {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function getAvailabilityStatus(
  current: number,
  max: number,
): {
  status: string
  color: string
  percentage: number
} {
  const percentage = (current / max) * 100

  if (percentage >= 100) {
    return { status: "Penuh", color: "text-red-600", percentage: 100 }
  } else if (percentage >= 80) {
    return { status: "Hampir Penuh", color: "text-orange-600", percentage }
  } else if (percentage >= 50) {
    return { status: "Tersedia", color: "text-yellow-600", percentage }
  } else {
    return { status: "Banyak Tersedia", color: "text-green-600", percentage }
  }
}
