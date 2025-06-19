"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Clock, BookOpen, Target, Users, Calendar, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import {
  getTryouts,
  registerForTryout,
  getDifficultyLabel,
  getDifficultyColor,
  hasValidLink,
  openTryoutLink,
  type Tryout,
} from "@/lib/supabase-tryout"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function TryOutPage() {
  const [tryouts, setTryouts] = useState<Tryout[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedTryout, setSelectedTryout] = useState<Tryout | null>(null)
  const [isRegistering, setIsRegistering] = useState(false)
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [registrationError, setRegistrationError] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Registration form state
  const [registrationForm, setRegistrationForm] = useState({
    namaSiswa: "Hanung Gagas Radya", // Pre-filled
    email: "",
    kelas: "XI IPS", // Pre-filled
    noTelepon: "",
  })

  useEffect(() => {
    fetchTryouts()
  }, [])

  const fetchTryouts = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const data = await getTryouts(true) // Only active tryouts
      setTryouts(data)
    } catch (error) {
      console.error("Error fetching tryouts:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRegistration = async () => {
    if (!selectedTryout) return

    setIsRegistering(true)
    setRegistrationError(null)

    try {
      await registerForTryout({
        tryout_id: selectedTryout.id,
        nama_siswa: registrationForm.namaSiswa,
        email: registrationForm.email,
        kelas: registrationForm.kelas,
        no_telepon: registrationForm.noTelepon,
      })

      setRegistrationSuccess(true)
      // Refresh tryouts to get updated participant count
      await fetchTryouts(true)

      // Reset form
      setRegistrationForm({
        namaSiswa: "Hanung Gagas Radya",
        email: "",
        kelas: "XI IPS",
        noTelepon: "",
      })
    } catch (error) {
      console.error("Error registering:", error)
      setRegistrationError(error instanceof Error ? error.message : "Terjadi kesalahan saat mendaftar")
    } finally {
      setIsRegistering(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60

    if (hours > 0) {
      return `${hours} jam ${remainingMinutes > 0 ? remainingMinutes + " menit" : ""}`
    }
    return `${minutes} menit`
  }

  const getAvailabilityStatus = (tryout: Tryout) => {
    if (!tryout.is_active) return { status: "inactive", label: "Tidak Aktif", color: "bg-gray-500" }

    const currentDate = new Date()
    const startDate = new Date(tryout.start_date)
    const endDate = new Date(tryout.end_date)

    if (currentDate < startDate) {
      return { status: "upcoming", label: "Akan Datang", color: "bg-blue-500" }
    }

    if (currentDate > endDate) {
      // If has link, show as available for direct access
      if (hasValidLink(tryout)) {
        return { status: "link_available", label: "Buka Try Out", color: "bg-purple-500" }
      }
      return { status: "ended", label: "Berakhir", color: "bg-gray-500" }
    }

    if (tryout.max_participants && tryout.current_participants >= tryout.max_participants) {
      // If has link, still allow direct access
      if (hasValidLink(tryout)) {
        return { status: "link_available", label: "Buka Try Out", color: "bg-purple-500" }
      }
      return { status: "full", label: "Penuh", color: "bg-red-500" }
    }

    return { status: "available", label: "Tersedia", color: "bg-green-500" }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data try out...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/continue-study">
              <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Try Out Online</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => fetchTryouts(true)}
            disabled={refreshing}
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Tentang Try Out Online</h3>
            <p className="text-sm text-blue-700">
              Ikuti berbagai try out online untuk mengukur kemampuan dan mempersiapkan diri menghadapi ujian. Dapatkan
              analisis hasil dan rekomendasi belajar yang personal.
            </p>
          </CardContent>
        </Card>

        {tryouts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Try Out</h3>
              <p className="text-gray-500">Try out akan segera tersedia. Silakan cek kembali nanti.</p>
            </CardContent>
          </Card>
        ) : (
          tryouts.map((tryout) => {
            const availability = getAvailabilityStatus(tryout)

            return (
              <Card key={tryout.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{tryout.title}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={`text-white ${availability.color}`}>{availability.label}</Badge>
                      <Badge variant="outline" className={getDifficultyColor(tryout.difficulty_level)}>
                        {getDifficultyLabel(tryout.difficulty_level)}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{tryout.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{formatDuration(tryout.duration_minutes)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-green-600" />
                      <span>{tryout.total_questions} soal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span>
                        {formatDate(tryout.start_date)} - {formatDate(tryout.end_date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-600" />
                      <span>
                        {tryout.current_participants}
                        {tryout.max_participants ? `/${tryout.max_participants}` : ""} peserta
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {tryout.max_participants && (
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((tryout.current_participants / tryout.max_participants) * 100, 100)}%`,
                        }}
                      ></div>
                    </div>
                  )}

                  {/* Subject Areas */}
                  <div className="pt-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Materi:</p>
                    <div className="flex flex-wrap gap-1">
                      {tryout.subject_areas.slice(0, 3).map((subject, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {subject}
                        </Badge>
                      ))}
                      {tryout.subject_areas.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{tryout.subject_areas.length - 3} lainnya
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Benefits */}
                  {tryout.benefits && tryout.benefits.length > 0 && (
                    <div className="pt-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">Keuntungan:</p>
                      <div className="flex flex-wrap gap-1">
                        {tryout.benefits.slice(0, 2).map((benefit, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                        {tryout.benefits.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{tryout.benefits.length - 2} lainnya
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {hasValidLink(tryout) && (
                    <div className="pt-2">
                      <div className="bg-purple-50 p-2 rounded-lg flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <p className="text-sm text-purple-800">Try out tersedia secara online</p>
                      </div>
                    </div>
                  )}

                  {/* Passing Score */}
                  {tryout.passing_score && (
                    <div className="bg-yellow-50 p-2 rounded-lg">
                      <p className="text-sm text-yellow-800">
                        <Target className="w-4 h-4 inline mr-1" />
                        Nilai minimum kelulusan: {tryout.passing_score}
                      </p>
                    </div>
                  )}

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full"
                        disabled={availability.status === "inactive" || availability.status === "ended"}
                        variant={
                          availability.status === "available" || availability.status === "link_available"
                            ? "default"
                            : "secondary"
                        }
                        onClick={() => {
                          // If it's a link_available status, open the link directly
                          if (availability.status === "link_available" && hasValidLink(tryout)) {
                            openTryoutLink(tryout.link_tryout!)
                            return
                          }

                          // Otherwise, open registration dialog
                          setSelectedTryout(tryout)
                          setRegistrationSuccess(false)
                          setRegistrationError(null)
                        }}
                      >
                        {availability.status === "upcoming"
                          ? "Belum Dimulai"
                          : availability.status === "ended"
                            ? "Try Out Berakhir"
                            : availability.status === "full"
                              ? "Try Out Penuh"
                              : availability.status === "inactive"
                                ? "Tidak Aktif"
                                : availability.status === "link_available"
                                  ? "Buka Try Out"
                                  : "Daftar Try Out"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Daftar Try Out</DialogTitle>
                      </DialogHeader>

                      {registrationSuccess ? (
                        <div className="text-center py-4">
                          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-800 mb-2">Pendaftaran Berhasil!</h3>
                          <p className="text-gray-600 mb-4">
                            Anda telah berhasil mendaftar untuk try out "{selectedTryout?.title}".
                          </p>
                          <Button
                            onClick={() => {
                              setIsDialogOpen(false)
                              setRegistrationSuccess(false)
                            }}
                            className="w-full"
                          >
                            Tutup
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {selectedTryout && (
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <h4 className="font-medium text-gray-800">{selectedTryout.title}</h4>
                              <p className="text-sm text-gray-600">
                                {selectedTryout.total_questions} soal •{" "}
                                {formatDuration(selectedTryout.duration_minutes)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {formatDate(selectedTryout.start_date)} - {formatDate(selectedTryout.end_date)}
                              </p>
                            </div>
                          )}

                          {registrationError && (
                            <Alert variant="destructive">
                              <AlertCircle className="h-4 w-4" />
                              <AlertDescription>{registrationError}</AlertDescription>
                            </Alert>
                          )}

                          <div className="space-y-3">
                            <div>
                              <Label htmlFor="nama">Nama Siswa</Label>
                              <Input
                                id="nama"
                                value={registrationForm.namaSiswa}
                                onChange={(e) =>
                                  setRegistrationForm((prev) => ({ ...prev, namaSiswa: e.target.value }))
                                }
                                disabled
                              />
                            </div>

                            <div>
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={registrationForm.email}
                                onChange={(e) => setRegistrationForm((prev) => ({ ...prev, email: e.target.value }))}
                                placeholder="Masukkan email Anda"
                                required
                              />
                            </div>

                            <div>
                              <Label htmlFor="kelas">Kelas</Label>
                              <Input
                                id="kelas"
                                value={registrationForm.kelas}
                                onChange={(e) => setRegistrationForm((prev) => ({ ...prev, kelas: e.target.value }))}
                                disabled
                              />
                            </div>

                            <div>
                              <Label htmlFor="telepon">No. Telepon</Label>
                              <Input
                                id="telepon"
                                type="tel"
                                value={registrationForm.noTelepon}
                                onChange={(e) =>
                                  setRegistrationForm((prev) => ({ ...prev, noTelepon: e.target.value }))
                                }
                                placeholder="Masukkan nomor telepon"
                                required
                              />
                            </div>
                          </div>

                          {selectedTryout?.instructions && (
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-blue-800 mb-1">Petunjuk:</p>
                              <p className="text-sm text-blue-700">{selectedTryout.instructions}</p>
                            </div>
                          )}

                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setIsDialogOpen(false)}
                              className="flex-1"
                              disabled={isRegistering}
                            >
                              Batal
                            </Button>
                            <Button
                              onClick={handleRegistration}
                              disabled={
                                isRegistering ||
                                !registrationForm.email ||
                                !registrationForm.noTelepon ||
                                !registrationForm.namaSiswa
                              }
                              className="flex-1"
                            >
                              {isRegistering ? "Mendaftar..." : "Daftar"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
