import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our survey data
export interface SurveyResponse {
  id?: string
  created_at?: string
  nama_siswa: string
  email: string
  kelas: string
  no_telepon: string
  rencana_setelah_lulus?: string
  tujuan_karir?: string
  faktor_utama?: string
  informasi_bimbingan?: string
  dukungan_dibutuhkan?: string
  kesiapan_menghadapi?: string
  harapan_masa_depan?: string
  updated_at?: string
}
