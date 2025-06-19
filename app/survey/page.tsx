"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  ArrowRight,
  ImagePlusIcon as PrevIcon,
  CheckCircle,
  AlertCircle,
  GraduationCap,
  Briefcase,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { supabase, type SurveyResponse } from "@/lib/supabase"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [showSurveyOptions, setShowSurveyOptions] = useState(false)

  // Survey answers state
  const [answers, setAnswers] = useState({
    // Personal Information
    namaSiswa: "",
    email: "",
    kelas: "",
    noTelepon: "",
    // Existing survey questions
    rencanaSetelahLulus: "",
    tujuanKarir: "",
    faktorUtama: "",
    informasiBimbingan: "",
    dukunganDibutuhkan: "",
    kesiapanMenghadapi: "",
    harapanMasaDepan: "",
  })

  const handleAnswerChange = (question: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }))

    // Show survey options when user selects their post-graduation plan
    if (question === "rencanaSetelahLulus" && value) {
      setShowSurveyOptions(true)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      // Prepare data for Supabase
      const surveyData: Omit<SurveyResponse, "id" | "created_at" | "updated_at"> = {
        nama_siswa: answers.namaSiswa,
        email: answers.email,
        kelas: answers.kelas,
        no_telepon: answers.noTelepon,
        rencana_setelah_lulus: answers.rencanaSetelahLulus,
        tujuan_karir: answers.tujuanKarir,
        faktor_utama: answers.faktorUtama,
        informasi_bimbingan: answers.informasiBimbingan,
        dukungan_dibutuhkan: answers.dukunganDibutuhkan,
        kesiapan_menghadapi: answers.kesiapanMenghadapi,
        harapan_masa_depan: answers.harapanMasaDepan,
      }

      // Insert data into Supabase
      const { data, error } = await supabase.from("survey_responses").insert([surveyData]).select()

      if (error) {
        throw error
      }

      console.log("Survey submitted successfully:", data)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Error submitting survey:", error)
      setSubmitError(
        error instanceof Error ? error.message : "Terjadi kesalahan saat mengirim survei. Silakan coba lagi.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Survey options based on post-graduation plan
  const getSurveyRecommendations = () => {
    const plan = answers.rencanaSetelahLulus

    if (plan === "perguruan-tinggi") {
      return {
        primary: {
          title: "Survei Lanjut Studi",
          description: "Survei khusus untuk rencana melanjutkan ke perguruan tinggi",
          link: "/continue-study-survey",
          icon: GraduationCap,
          color: "bg-orange-600 hover:bg-orange-700",
        },
        secondary: {
          title: "Survei Pengembangan Diri",
          description: "Survei untuk pengembangan keterampilan umum",
          link: "/self-development-survey",
          icon: Briefcase,
          color: "bg-cyan-600 hover:bg-cyan-700",
        },
      }
    } else if (plan === "bekerja" || plan === "wirausaha") {
      return {
        primary: {
          title: "Survei Pengembangan Diri",
          description: "Survei khusus untuk persiapan dunia kerja dan keterampilan",
          link: "/self-development-survey",
          icon: Briefcase,
          color: "bg-cyan-600 hover:bg-cyan-700",
        },
        secondary: {
          title: "Survei Lanjut Studi",
          description: "Survei untuk rencana pendidikan tinggi",
          link: "/continue-study-survey",
          icon: GraduationCap,
          color: "bg-orange-600 hover:bg-orange-700",
        },
      }
    } else {
      return {
        primary: {
          title: "Survei Lanjut Studi",
          description: "Survei untuk rencana pendidikan tinggi",
          link: "/continue-study-survey",
          icon: GraduationCap,
          color: "bg-orange-600 hover:bg-orange-700",
        },
        secondary: {
          title: "Survei Pengembangan Diri",
          description: "Survei untuk pengembangan keterampilan",
          link: "/self-development-survey",
          icon: Briefcase,
          color: "bg-cyan-600 hover:bg-cyan-700",
        },
      }
    }
  }

  if (isSubmitted) {
    const recommendations = getSurveyRecommendations()

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-b-3xl shadow-lg">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Image src="/images/ico_maber.png" alt="MaBer" width={32} height={32} className="rounded-lg" />
              <div>
                <h1 className="text-lg font-bold">MaBer</h1>
                <p className="text-blue-100 text-sm">Survei Selesai</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <Card className="text-center">
            <CardContent className="p-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Terima Kasih!</h2>
              <p className="text-gray-600 mb-6">
                Survei umum Anda telah berhasil dikirim. Berdasarkan rencana Anda setelah lulus, kami merekomendasikan
                survei tambahan berikut:
              </p>
            </CardContent>
          </Card>

          {/* Recommended Survey */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <recommendations.primary.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Direkomendasikan untuk Anda</h3>
                  <p className="text-sm text-blue-700">{recommendations.primary.title}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{recommendations.primary.description}</p>
              <Link href={recommendations.primary.link}>
                <Button className={`w-full ${recommendations.primary.color}`}>
                  Isi {recommendations.primary.title}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Alternative Survey */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                  <recommendations.secondary.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Survei Tambahan</h3>
                  <p className="text-sm text-gray-600">{recommendations.secondary.title}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">{recommendations.secondary.description}</p>
              <Link href={recommendations.secondary.link}>
                <Button variant="outline" className="w-full">
                  Isi {recommendations.secondary.title}
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* General Options */}
          <div className="space-y-3">
            <Link href="/results">
              <Button variant="outline" className="w-full">
                Lihat Hasil Survei Umum
              </Button>
            </Link>
            <Link href="/">
              <Button variant="ghost" className="w-full">
                Kembali ke Beranda
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Image src="/images/ico_maber.png" alt="MaBer" width={32} height={32} className="rounded-lg" />
            <div>
              <h1 className="text-lg font-bold">MaBer</h1>
              <p className="text-blue-100 text-sm">Survei Umum</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-red-600 text-white px-4 py-2">
        <h2 className="font-semibold">{currentStep === 0 ? "Data Pribadi" : `Survei Umum (${currentStep})`}</h2>
      </div>

      {/* Survey Content */}
      <div className="p-4">
        {/* Error Alert */}
        {submitError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}

        {/* Survey Options Card - Show after first question is answered */}
        {showSurveyOptions && currentStep === 1 && (
          <Card className="mb-4 border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Rekomendasi Survei Tambahan</h3>
              <p className="text-sm text-blue-700 mb-3">
                Berdasarkan rencana Anda, kami merekomendasikan survei khusus untuk mendapatkan bimbingan yang lebih
                tepat:
              </p>
              <div className="space-y-2">
                {answers.rencanaSetelahLulus === "perguruan-tinggi" && (
                  <div className="flex items-center gap-2 text-sm">
                    <GraduationCap className="w-4 h-4 text-orange-600" />
                    <span className="text-gray-700">Survei Lanjut Studi (Direkomendasikan)</span>
                  </div>
                )}
                {(answers.rencanaSetelahLulus === "bekerja" || answers.rencanaSetelahLulus === "wirausaha") && (
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-cyan-600" />
                    <span className="text-gray-700">Survei Pengembangan Diri (Direkomendasikan)</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-blue-600 mt-2">
                Selesaikan survei umum ini terlebih dahulu, kemudian lanjutkan dengan survei yang direkomendasikan.
              </p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6">
            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Informasi Pribadi</h2>
                  <p className="text-sm text-gray-600">Silakan lengkapi data diri Anda terlebih dahulu</p>
                </div>

                {/* Nama Siswa */}
                <div>
                  <Label htmlFor="nama-siswa" className="text-base font-medium text-gray-800">
                    Nama Siswa: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="nama-siswa"
                    value={answers.namaSiswa}
                    onChange={(e) => handleAnswerChange("namaSiswa", e.target.value)}
                    placeholder="Your answer"
                    className="mt-2"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-base font-medium text-gray-800">
                    Email: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={answers.email}
                    onChange={(e) => handleAnswerChange("email", e.target.value)}
                    placeholder="Your answer"
                    className="mt-2"
                    required
                  />
                </div>

                {/* Kelas */}
                <div>
                  <Label htmlFor="kelas" className="text-base font-medium text-gray-800">
                    Kelas: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="kelas"
                    value={answers.kelas}
                    onChange={(e) => handleAnswerChange("kelas", e.target.value)}
                    placeholder="Your answer"
                    className="mt-2"
                    required
                  />
                </div>

                {/* No. Telepon */}
                <div>
                  <Label htmlFor="no-telepon" className="text-base font-medium text-gray-800">
                    No. Telepon: <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="no-telepon"
                    type="tel"
                    value={answers.noTelepon}
                    onChange={(e) => handleAnswerChange("noTelepon", e.target.value)}
                    placeholder="Your answer"
                    className="mt-2"
                    required
                  />
                </div>
              </div>
            )}

            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Survei Umum</h2>
                  <p className="text-sm text-gray-600">Pertanyaan umum tentang rencana masa depan Anda</p>
                </div>

                {/* Question 1 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Apa rencana Anda setelah lulus SMA?</h3>
                  <RadioGroup
                    value={answers.rencanaSetelahLulus}
                    onValueChange={(value) => handleAnswerChange("rencanaSetelahLulus", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="perguruan-tinggi" id="r1-1" />
                      <Label htmlFor="r1-1">a. Melanjutkan ke Perguruan Tinggi / Vokasi / Politeknik / Akademi</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bekerja" id="r1-2" />
                      <Label htmlFor="r1-2">b. Langsung bekerja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="wirausaha" id="r1-3" />
                      <Label htmlFor="r1-3">c. Berwirausaha/membuka bisnis</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lainnya" id="r1-4" />
                      <Label htmlFor="r1-4">d. Lainnya</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 2 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Apakah Anda sudah memiliki tujuan karir atau bidang yang ingin Anda tekuni?
                  </h3>
                  <RadioGroup
                    value={answers.tujuanKarir}
                    onValueChange={(value) => handleAnswerChange("tujuanKarir", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ya-jelas" id="r2-1" />
                      <Label htmlFor="r2-1">a. Ya, sudah jelas</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="masih-belum-pasti" id="r2-2" />
                      <Label htmlFor="r2-2">b. Masih belum pasti</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="belum-memikirkannya" id="r2-3" />
                      <Label htmlFor="r2-3">c. Belum memikirkannya</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 3 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Apa faktor utama yang mempengaruhi rencana Anda setelah lulus?
                  </h3>
                  <RadioGroup
                    value={answers.faktorUtama}
                    onValueChange={(value) => handleAnswerChange("faktorUtama", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="minat-pribadi" id="r3-1" />
                      <Label htmlFor="r3-1">a. Minat pribadi</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="saran-orangtua" id="r3-2" />
                      <Label htmlFor="r3-2">b. Saran orang tua/keluarga</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="peluang-karir" id="r3-3" />
                      <Label htmlFor="r3-3">c. Peluang karir yang menjanjikan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kondisi-finansial" id="r3-4" />
                      <Label htmlFor="r3-4">d. Kondisi finansial</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lainnya" id="r3-5" />
                      <Label htmlFor="r3-5">e. Lainnya</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 4 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Apakah Anda merasa sudah mendapatkan cukup informasi dan bimbingan tentang pilihan setelah lulus
                    SMA?
                  </h3>
                  <RadioGroup
                    value={answers.informasiBimbingan}
                    onValueChange={(value) => handleAnswerChange("informasiBimbingan", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ya-cukup" id="r4-1" />
                      <Label htmlFor="r4-1">a. Ya, cukup</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kurang" id="r4-2" />
                      <Label htmlFor="r4-2">b. Kurang</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tidak-sama-sekali" id="r4-3" />
                      <Label htmlFor="r4-3">c. Tidak sama sekali</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Survei Umum (Lanjutan)</h2>
                  <p className="text-sm text-gray-600">Pertanyaan terakhir tentang persiapan masa depan</p>
                </div>

                {/* Question 5 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Apa bentuk dukungan yang Anda butuhkan untuk mempersiapkan diri setelah lulus?
                  </h3>
                  <RadioGroup
                    value={answers.dukunganDibutuhkan}
                    onValueChange={(value) => handleAnswerChange("dukunganDibutuhkan", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bimbingan-karir" id="r5-1" />
                      <Label htmlFor="r5-1">a. Bimbingan karir</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="informasi-perguruan-tinggi" id="r5-2" />
                      <Label htmlFor="r5-2">b. Informasi tentang perguruan tinggi atau pelatihan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bantuan-finansial" id="r5-3" />
                      <Label htmlFor="r5-3">c. Bantuan finansial</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pelatihan-keterampilan" id="r5-4" />
                      <Label htmlFor="r5-4">d. Pelatihan keterampilan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="lainnya" id="r5-5" />
                      <Label htmlFor="r5-5">e. Lainnya</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 6 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Apakah Anda merasa siap menghadapi kehidupan setelah lulus SMA?
                  </h3>
                  <RadioGroup
                    value={answers.kesiapanMenghadapi}
                    onValueChange={(value) => handleAnswerChange("kesiapanMenghadapi", value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sangat-siap" id="r6-1" />
                      <Label htmlFor="r6-1">a. Sangat siap</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cukup-siap" id="r6-2" />
                      <Label htmlFor="r6-2">b. Cukup siap</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kurang-siap" id="r6-3" />
                      <Label htmlFor="r6-3">c. Kurang siap</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tidak-siap-sama-sekali" id="r6-4" />
                      <Label htmlFor="r6-4">d. Tidak siap sama sekali</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Question 7 */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Apa harapan terbesar Anda untuk masa depan?</h3>
                  <p className="text-sm text-gray-600 mb-2">(Jawaban terbuka)</p>
                  <Textarea
                    value={answers.harapanMasaDepan}
                    onChange={(e) => handleAnswerChange("harapanMasaDepan", e.target.value)}
                    placeholder="Tuliskan harapan terbesar Anda untuk masa depan..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <Button variant="outline" onClick={prevStep} className="flex items-center gap-2">
              <PrevIcon className="w-4 h-4" />
              Sebelumnya
            </Button>
          )}

          <div className="ml-auto">
            {currentStep < 2 ? (
              <Button
                onClick={nextStep}
                className="flex items-center gap-2"
                disabled={
                  currentStep === 0 && (!answers.namaSiswa || !answers.email || !answers.kelas || !answers.noTelepon)
                }
              >
                Selanjutnya
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                {isSubmitting ? "Mengirim..." : "Kirim Survei Umum"}
              </Button>
            )}
          </div>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {[0, 1, 2].map((step) => (
            <div
              key={step}
              className={`w-3 h-3 rounded-full ${step === currentStep ? "bg-blue-600" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-6"></div>
    </div>
  )
}
