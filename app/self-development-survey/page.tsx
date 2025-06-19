"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeft, CheckCircle, AlertCircle, User } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { submitSelfDevelopmentSurvey, type SelfDevelopmentSurveyResponse } from "@/lib/supabase-self-development"

export default function SelfDevelopmentSurveyPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [dataAutoFilled, setDataAutoFilled] = useState(false)

  // Survey answers state
  const [answers, setAnswers] = useState({
    // Personal Information
    namaSiswa: "",
    email: "",
    kelas: "",
    noTelepon: "",
    // Survey questions
    jenisPekerjaanDiminati: "",
    keterampilanSertifikasi: "",
    tantanganTerbesarKerja: "",
    bidangKeahlianNonTeknis: "",
  })

  // Auto-fill personal data on component mount
  useEffect(() => {
    const personalData = localStorage.getItem("personalData")
    if (personalData) {
      try {
        const data = JSON.parse(personalData)
        setAnswers((prev) => ({
          ...prev,
          namaSiswa: data.namaSiswa || "",
          email: data.email || "",
          kelas: data.kelas || "",
          noTelepon: data.noTelepon || "",
        }))
        setDataAutoFilled(true)
      } catch (error) {
        console.error("Error parsing personal data:", error)
      }
    }
  }, [])

  const handleAnswerChange = (question: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Validate required fields
      if (!answers.namaSiswa.trim()) {
        throw new Error("Nama siswa harus diisi")
      }
      if (!answers.email.trim()) {
        throw new Error("Email harus diisi")
      }
      if (!answers.kelas.trim()) {
        throw new Error("Kelas harus diisi")
      }
      if (!answers.noTelepon.trim()) {
        throw new Error("Nomor telepon harus diisi")
      }

      // Prepare data for Supabase
      const surveyData: Omit<SelfDevelopmentSurveyResponse, "id" | "created_at" | "updated_at"> = {
        nama_siswa: answers.namaSiswa.trim(),
        email: answers.email.trim(),
        kelas: answers.kelas.trim(),
        no_telepon: answers.noTelepon.trim(),
        jenis_pekerjaan_diminati: answers.jenisPekerjaanDiminati,
        keterampilan_sertifikasi: answers.keterampilanSertifikasi,
        tantangan_terbesar_kerja: answers.tantanganTerbesarKerja,
        bidang_keahlian_non_teknis: answers.bidangKeahlianNonTeknis,
      }

      console.log("Submitting survey data:", surveyData)

      const result = await submitSelfDevelopmentSurvey(surveyData)
      console.log("Survey submitted successfully:", result)

      setIsSubmitted(true)
    } catch (error) {
      console.error("Error in handleSubmit:", error)

      let errorMessage = "Terjadi kesalahan saat mengirim survei. Silakan coba lagi."

      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === "string") {
        errorMessage = error
      } else if (error && typeof error === "object") {
        // Handle object errors
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
      answers.namaSiswa.trim() &&
      answers.email.trim() &&
      answers.kelas.trim() &&
      answers.noTelepon.trim() &&
      answers.jenisPekerjaanDiminati &&
      answers.keterampilanSertifikasi &&
      answers.tantanganTerbesarKerja &&
      answers.bidangKeahlianNonTeknis
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-black text-white p-4">
          <div className="flex items-center gap-3">
            <Link href="/self-development">
              <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Survei Selesai</h1>
          </div>
        </div>

        <div className="p-4 flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Terima Kasih!</h2>
              <p className="text-gray-600 mb-6">
                Survei Pengembangan Diri Anda telah berhasil dikirim. Informasi ini akan membantu kami memberikan
                program pengembangan yang lebih sesuai dengan kebutuhan Anda.
              </p>
              <div className="space-y-3">
                <Link href="/self-development-results">
                  <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Lihat Hasil Survei</Button>
                </Link>
                <Link href="/self-development">
                  <Button variant="outline" className="w-full">
                    Kembali ke Pengembangan Diri
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
      {/* Header */}
      <div className="bg-black text-white p-4">
        <div className="flex items-center gap-3">
          <Link href="/self-development">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <p className="text-yellow-400 text-sm font-medium">Survei Pengembangan Diri</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="font-medium">Rencana Karir & Keterampilan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-cyan-600 text-white px-4 py-2">
        <h2 className="font-semibold">Survei Pengembangan Diri</h2>
      </div>

      {/* Survey Content */}
      <div className="p-4">
        {/* Auto-fill Success Alert */}
        {dataAutoFilled && (
          <Alert className="mb-4 border-green-200 bg-green-50">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Data pribadi berhasil diisi otomatis dari profil Anda!
            </AlertDescription>
          </Alert>
        )}

        {/* Error Alert */}
        {submitError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Personal Information Section */}
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <User className="w-5 h-5 text-cyan-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Informasi Pribadi</h2>
                    {dataAutoFilled && <CheckCircle className="w-5 h-5 text-green-600" />}
                  </div>
                  <p className="text-sm text-gray-600">
                    {dataAutoFilled
                      ? "Data pribadi telah diisi otomatis. Anda dapat mengubahnya jika diperlukan."
                      : "Silakan lengkapi data diri Anda terlebih dahulu"}
                  </p>
                </div>

                <div>
                  <Label htmlFor="nama-siswa" className="text-base font-medium text-gray-800">
                    Nama Siswa: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nama-siswa"
                    value={answers.namaSiswa}
                    onChange={(e) => handleAnswerChange("namaSiswa", e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className={`mt-2 ${dataAutoFilled ? "bg-green-50 border-green-200" : ""}`}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-medium text-gray-800">
                    Email: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={answers.email}
                    onChange={(e) => handleAnswerChange("email", e.target.value)}
                    placeholder="Masukkan email"
                    className={`mt-2 ${dataAutoFilled ? "bg-green-50 border-green-200" : ""}`}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="kelas" className="text-base font-medium text-gray-800">
                    Kelas: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="kelas"
                    value={answers.kelas}
                    onChange={(e) => handleAnswerChange("kelas", e.target.value)}
                    placeholder="Contoh: XII IPA 1"
                    className={`mt-2 ${dataAutoFilled ? "bg-green-50 border-green-200" : ""}`}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="no-telepon" className="text-base font-medium text-gray-800">
                    No. Telepon: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="no-telepon"
                    type="tel"
                    value={answers.noTelepon}
                    onChange={(e) => handleAnswerChange("noTelepon", e.target.value)}
                    placeholder="Masukkan nomor telepon"
                    className={`mt-2 ${dataAutoFilled ? "bg-green-50 border-green-200" : ""}`}
                    required
                  />
                </div>
              </div>

              <hr className="my-6" />

              {/* Survey Questions */}
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Survei Pengembangan Diri</h2>
                  <p className="text-sm text-gray-600">
                    Bantu kami memahami minat karir dan kebutuhan pengembangan keterampilan Anda
                  </p>
                </div>

                {/* Question 1 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Jenis pekerjaan apa yang Anda minati?</h3>
                  <RadioGroup
                    value={answers.jenisPekerjaanDiminati}
                    onValueChange={(value) => handleAnswerChange("jenisPekerjaanDiminati", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pekerjaan-kantoran" id="q1-1" />
                      <Label htmlFor="q1-1">a. Pekerjaan kantoran</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pekerjaan-lapangan" id="q1-2" />
                      <Label htmlFor="q1-2">b. Pekerjaan lapangan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wirausaha-bisnis" id="q1-3" />
                      <Label htmlFor="q1-3">c. Wirausaha/bisnis</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lainnya" id="q1-4" />
                      <Label htmlFor="q1-4">d. Lainnya (sebutkan)</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 2 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Apakah Anda sudah memiliki keterampilan atau sertifikasi yang mendukung rencana kerja Anda?
                  </h3>
                  <RadioGroup
                    value={answers.keterampilanSertifikasi}
                    onValueChange={(value) => handleAnswerChange("keterampilanSertifikasi", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ya-sudah" id="q2-1" />
                      <Label htmlFor="q2-1">a. Ya, sudah</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="belum-tetapi-sedang-dipersiapkan" id="q2-2" />
                      <Label htmlFor="q2-2">b. Belum, tetapi sedang dipersiapkan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="belum-sama-sekali" id="q2-3" />
                      <Label htmlFor="q2-3">c. Belum sama sekali</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 3 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Apa tantangan terbesar yang menurut Anda akan Anda hadapi dalam mencari pekerjaan?
                  </h3>
                  <RadioGroup
                    value={answers.tantanganTerbesarKerja}
                    onValueChange={(value) => handleAnswerChange("tantanganTerbesarKerja", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kurangnya-pengalaman" id="q3-1" />
                      <Label htmlFor="q3-1">a. Kurangnya pengalaman</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="persaingan-yang-tinggi" id="q3-2" />
                      <Label htmlFor="q3-2">b. Persaingan yang tinggi</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kurangnya-informasi-lowongan-kerja" id="q3-3" />
                      <Label htmlFor="q3-3">c. Kurangnya informasi tentang lowongan kerja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lainnya" id="q3-4" />
                      <Label htmlFor="q3-4">d. Lainnya</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 4 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Bidang keahlian apa yang ingin ada pelajari (Bukan Teknis)?
                  </h3>
                  <RadioGroup
                    value={answers.bidangKeahlianNonTeknis}
                    onValueChange={(value) => handleAnswerChange("bidangKeahlianNonTeknis", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="public-speaking-customer-care" id="q4-1" />
                      <Label htmlFor="q4-1">a. Public speaking / Customer care</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="komputer" id="q4-2" />
                      <Label htmlFor="q4-2">b. Komputer</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="desain-grafis-editing" id="q4-3" />
                      <Label htmlFor="q4-3">c. Desain grafis / editing</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bahasa-inggris" id="q4-4" />
                      <Label htmlFor="q4-4">d. Bahasa Inggris</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="mt-6">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !isFormValid()}
            className="w-full bg-cyan-600 hover:bg-cyan-700 py-3"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Survei Pengembangan Diri"}
          </Button>

          {!isFormValid() && (
            <p className="text-sm text-gray-500 mt-2 text-center">Silakan lengkapi semua field yang wajib diisi</p>
          )}
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-6"></div>
    </div>
  )
}
