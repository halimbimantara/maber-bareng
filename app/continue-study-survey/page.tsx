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
import { submitContinueStudySurvey, type ContinueStudySurveyResponse } from "@/lib/supabase-continue-study"

export default function ContinueStudySurveyPage() {
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
    jenisPendidikanTinggi: "",
    bidangStudi: "",
    sudahMemilihPT: "",
    tantanganTerbesar: "",
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
      const surveyData: Omit<ContinueStudySurveyResponse, "id" | "created_at" | "updated_at"> = {
        nama_siswa: answers.namaSiswa.trim(),
        email: answers.email.trim(),
        kelas: answers.kelas.trim(),
        no_telepon: answers.noTelepon.trim(),
        jenis_pendidikan_tinggi: answers.jenisPendidikanTinggi,
        bidang_studi: answers.bidangStudi,
        sudah_memilih_pt: answers.sudahMemilihPT,
        tantangan_terbesar: answers.tantanganTerbesar,
      }

      console.log("Submitting survey data:", surveyData)

      const result = await submitContinueStudySurvey(surveyData)
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
      answers.jenisPendidikanTinggi &&
      answers.bidangStudi &&
      answers.sudahMemilihPT &&
      answers.tantanganTerbesar
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
            <h1 className="text-lg font-semibold">Survei Selesai</h1>
          </div>
        </div>

        <div className="p-4 flex items-center justify-center min-h-[60vh]">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Terima Kasih!</h2>
              <p className="text-gray-600 mb-6">
                Survei Lanjut Studi Anda telah berhasil dikirim. Informasi ini akan membantu kami memberikan rekomendasi
                yang lebih tepat untuk rencana studi Anda.
              </p>
              <div className="space-y-3">
                <Link href="/continue-study-results">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Lihat Hasil Survei</Button>
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
      {/* Header */}
      <div className="bg-black text-white p-4">
        <div className="flex items-center gap-3">
          <Link href="/continue-study">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <p className="text-yellow-400 text-sm font-medium">Survei Lanjut Studi</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="font-medium">Rencana Pendidikan Tinggi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-orange-600 text-white px-4 py-2">
        <h2 className="font-semibold">Survei Lanjut Studi</h2>
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
                    <User className="w-5 h-5 text-blue-600" />
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
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Survei Lanjut Studi</h2>
                  <p className="text-sm text-gray-600">Bantu kami memahami rencana pendidikan tinggi Anda</p>
                </div>

                {/* Question 1 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Jenis pendidikan tinggi apa yang Anda minati?</h3>
                  <RadioGroup
                    value={answers.jenisPendidikanTinggi}
                    onValueChange={(value) => handleAnswerChange("jenisPendidikanTinggi", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="universitas" id="q1-1" />
                      <Label htmlFor="q1-1">a. Universitas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sekolah-vokasi-politeknik" id="q1-2" />
                      <Label htmlFor="q1-2">b. Sekolah vokasi/politeknik</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="akademi" id="q1-3" />
                      <Label htmlFor="q1-3">c. Akademi</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lainnya" id="q1-4" />
                      <Label htmlFor="q1-4">d. Lainnya</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 2 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Bidang studi apa yang ingin Anda pelajari di perguruan tinggi?
                  </h3>
                  <RadioGroup
                    value={answers.bidangStudi}
                    onValueChange={(value) => handleAnswerChange("bidangStudi", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sains-dan-teknologi" id="q2-1" />
                      <Label htmlFor="q2-1">a. Sains dan Teknologi</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sosial-dan-humaniora" id="q2-2" />
                      <Label htmlFor="q2-2">b. Sosial dan Humaniora</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bisnis-dan-ekonomi" id="q2-3" />
                      <Label htmlFor="q2-3">c. Bisnis dan Ekonomi</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kesehatan" id="q2-4" />
                      <Label htmlFor="q2-4">d. Kesehatan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="seni-dan-desain" id="q2-5" />
                      <Label htmlFor="q2-5">e. Seni dan Desain</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lainnya" id="q2-6" />
                      <Label htmlFor="q2-6">f. Lainnya</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 3 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Apakah Anda sudah memilih perguruan tinggi atau program studi tertentu?
                  </h3>
                  <RadioGroup
                    value={answers.sudahMemilihPT}
                    onValueChange={(value) => handleAnswerChange("sudahMemilihPT", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ya-sudah" id="q3-1" />
                      <Label htmlFor="q3-1">a. Ya, sudah</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="belum-masih-mencari-informasi" id="q3-2" />
                      <Label htmlFor="q3-2">b. Belum, masih mencari informasi</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="belum-memikirkannya" id="q3-3" />
                      <Label htmlFor="q3-3">c. Belum memikirkannya</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 4 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Apa tantangan terbesar yang Anda hadapi dalam mempersiapkan diri untuk melanjutkan pendidikan?
                  </h3>
                  <RadioGroup
                    value={answers.tantanganTerbesar}
                    onValueChange={(value) => handleAnswerChange("tantanganTerbesar", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="biaya-pendidikan" id="q4-1" />
                      <Label htmlFor="q4-1">a. Biaya pendidikan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="persaingan-masuk-perguruan-tinggi" id="q4-2" />
                      <Label htmlFor="q4-2">b. Persaingan masuk perguruan tinggi</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kurangnya-informasi-program-studi" id="q4-3" />
                      <Label htmlFor="q4-3">c. Kurangnya informasi tentang program studi</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lainnya" id="q4-4" />
                      <Label htmlFor="q4-4">d. Lainnya</Label>
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
            className="w-full bg-orange-600 hover:bg-orange-700 py-3"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Survei Lanjut Studi"}
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
