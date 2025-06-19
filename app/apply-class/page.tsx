"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitPengajuanKelas, type PengajuanKelas } from "@/lib/supabase-pengajuan-kelas"

export default function ApplyClassPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    namaSiswa: "Hanung Gagas Radya", // Pre-filled
    email: "",
    kelas: "XI IPS", // Pre-filled
    noTelepon: "",
    mataPelajaran: "",
    jadwalPreferensi: "",
    catatanTambahan: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Validate required fields
      if (!formData.email.trim()) {
        throw new Error("Email harus diisi")
      }
      if (!formData.noTelepon.trim()) {
        throw new Error("Nomor telepon harus diisi")
      }
      if (!formData.mataPelajaran.trim()) {
        throw new Error("Mata pelajaran harus diisi")
      }
      if (!formData.jadwalPreferensi.trim()) {
        throw new Error("Jadwal preferensi harus diisi")
      }

      // Prepare data for Supabase
      const pengajuanData: Omit<
        PengajuanKelas,
        "id" | "created_at" | "updated_at" | "status" | "admin_notes" | "approved_at" | "approved_by"
      > = {
        nama_siswa: formData.namaSiswa.trim(),
        email: formData.email.trim(),
        kelas: formData.kelas.trim(),
        no_telepon: formData.noTelepon.trim(),
        mata_pelajaran: formData.mataPelajaran.trim(),
        jadwal_preferensi: formData.jadwalPreferensi.trim(),
        catatan_tambahan: formData.catatanTambahan.trim() || undefined,
        jenis_kelas: "lanjut-studi",
      }

      console.log("Submitting class application:", pengajuanData)

      const result = await submitPengajuanKelas(pengajuanData)
      console.log("Class application submitted successfully:", result)

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error in handleSubmit:", error)

      let errorMessage = "Terjadi kesalahan saat mengirim pengajuan. Silakan coba lagi."

      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === "string") {
        errorMessage = error
      } else if (error && typeof error === "object") {
        const errorObj = error as any
        if (errorObj.message) {
          errorMessage = errorObj.message
        } else if (errorObj.error) {
          errorMessage = errorObj.error
        } else {
          errorMessage = JSON.stringify(error)
        }
      }

      setSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.namaSiswa.trim() &&
      formData.email.trim() &&
      formData.kelas.trim() &&
      formData.noTelepon.trim() &&
      formData.mataPelajaran.trim() &&
      formData.jadwalPreferensi.trim()
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-black text-white p-4">
          <div className="flex items-center gap-3">
            <Link href="/continue-study">
              <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Pengajuan Berhasil</h1>
          </div>
        </div>

        <div className="p-4 flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Pengajuan Berhasil Dikirim!</h2>
              <p className="text-gray-600 mb-6">
                Pengajuan kelas Anda telah berhasil dikirim. Tim kami akan meninjau pengajuan Anda dan memberikan
                konfirmasi dalam 1-2 hari kerja.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-blue-800 mb-2">Detail Pengajuan:</h3>
                <div className="text-left text-sm text-blue-700 space-y-1">
                  <p>
                    <span className="font-medium">Mata Pelajaran:</span> {formData.mataPelajaran}
                  </p>
                  <p>
                    <span className="font-medium">Jadwal:</span> {formData.jadwalPreferensi}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span> Menunggu Persetujuan
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <Link href="/apply-class-status">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Cek Status Pengajuan</Button>
                </Link>
                <Link href="/continue-study">
                  <Button variant="outline" className="w-full">
                    Kembali ke Lanjut Studi
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white p-4">
        <div className="flex items-center gap-3">
          <Link href="/continue-study">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Ajukan Kelas</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Error Alert */}
        {submitError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        {/* Info Card */}
        <Card className="bg-cyan-50 border-cyan-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-cyan-800 mb-2">Pengajuan Kelas Bimbingan</h3>
            <p className="text-sm text-cyan-700">
              Ajukan kelas bimbingan sesuai kebutuhan Anda. Tim kami akan meninjau dan memberikan konfirmasi dalam 1-2
              hari kerja.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-cyan-600" />
              Form Pengajuan Kelas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 border-b pb-2">Informasi Pribadi</h3>

              <div>
                <Label htmlFor="nama-siswa">
                  Nama Siswa <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nama-siswa"
                  value={formData.namaSiswa}
                  onChange={(e) => handleInputChange("namaSiswa", e.target.value)}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div>
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Masukkan email Anda"
                  required
                />
              </div>

              <div>
                <Label htmlFor="kelas">
                  Kelas <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="kelas"
                  value={formData.kelas}
                  onChange={(e) => handleInputChange("kelas", e.target.value)}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div>
                <Label htmlFor="no-telepon">
                  No. Telepon <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="no-telepon"
                  type="tel"
                  value={formData.noTelepon}
                  onChange={(e) => handleInputChange("noTelepon", e.target.value)}
                  placeholder="Masukkan nomor telepon"
                  required
                />
              </div>
            </div>

            {/* Class Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 border-b pb-2">Informasi Kelas</h3>

              <div>
                <Label htmlFor="subject">
                  Mata Pelajaran <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="subject"
                  value={formData.mataPelajaran}
                  onChange={(e) => handleInputChange("mataPelajaran", e.target.value)}
                  placeholder="Contoh: Matematika, Fisika, Kimia, Bahasa Inggris, dll"
                  required
                />
              </div>

              <div>
                <Label htmlFor="schedule">
                  Jadwal Preferensi <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="schedule"
                  value={formData.jadwalPreferensi}
                  onChange={(e) => handleInputChange("jadwalPreferensi", e.target.value)}
                  placeholder="Contoh: Senin-Rabu 16:00-18:00, Sabtu 09:00-11:00"
                  required
                />
              </div>

              <div>
                <Label htmlFor="notes">Catatan Tambahan</Label>
                <Textarea
                  id="notes"
                  value={formData.catatanTambahan}
                  onChange={(e) => handleInputChange("catatanTambahan", e.target.value)}
                  placeholder="Jelaskan kebutuhan khusus, target yang ingin dicapai, atau informasi tambahan lainnya"
                  rows={4}
                />
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-800 mb-2">📋 Informasi Penting:</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Pengajuan akan ditinjau dalam 1-2 hari kerja</li>
                <li>• Anda akan dihubungi melalui email atau telepon untuk konfirmasi</li>
                <li>• Jadwal dapat disesuaikan berdasarkan ketersediaan pengajar</li>
                <li>• Biaya kelas akan diinformasikan setelah pengajuan disetujui</li>
              </ul>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid()}
              className="w-full bg-cyan-600 hover:bg-cyan-700 py-3"
            >
              {isSubmitting ? "Mengirim Pengajuan..." : "Ajukan Kelas"}
            </Button>

            {!isFormValid() && (
              <p className="text-sm text-gray-500 text-center">
                Silakan lengkapi semua field yang wajib diisi (bertanda *)
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom padding */}
      <div className="h-6"></div>
    </div>
  )
}
