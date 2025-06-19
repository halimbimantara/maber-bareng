"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Clock, MapPin, Users, RefreshCw, CheckCircle, AlertCircle } from "lucide-react"
import { getSeminars, registerForSeminar, type Seminar } from "@/lib/supabase-seminars"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SeminarPage() {
  const [seminars, setSeminars] = useState<Seminar[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [selectedSeminar, setSelectedSeminar] = useState<Seminar | null>(null)
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
    alasanMengikuti: "",
  })

  useEffect(() => {
    fetchSeminars()
  }, [])

  const fetchSeminars = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const data = await getSeminars("pengembangan-diri")
      setSeminars(data)
    } catch (error) {
      console.error("Error fetching seminars:", error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRegistration = async () => {
    if (!selectedSeminar) return

    setIsRegistering(true)
    setRegistrationError(null)

    try {
      await registerForSeminar({
        seminar_id: selectedSeminar.id,
        nama_siswa: registrationForm.namaSiswa,
        email: registrationForm.email,
        kelas: registrationForm.kelas,
        no_telepon: registrationForm.noTelepon,
        alasan_mengikuti: registrationForm.alasanMengikuti,
      })

      setRegistrationSuccess(true)
      // Refresh seminars to get updated participant count
      await fetchSeminars(true)

      // Reset form
      setRegistrationForm({
        namaSiswa: "Hanung Gagas Radya",
        email: "",
        kelas: "XI IPS",
        noTelepon: "",
        alasanMengikuti: "",
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

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5) // Remove seconds
  }

  const getStatusBadge = (seminar: Seminar) => {
    switch (seminar.status) {
      case "available":
        return <Badge variant="default">Tersedia</Badge>
      case "full":
        return <Badge variant="secondary">Penuh</Badge>
      case "cancelled":
        return <Badge variant="destructive">Dibatalkan</Badge>
      case "completed":
        return <Badge variant="outline">Selesai</Badge>
      default:
        return <Badge variant="outline">{seminar.status}</Badge>
    }
  }

  const isRegistrationOpen = (seminar: Seminar) => {
    if (seminar.status !== "available") return false
    if (seminar.registration_deadline) {
      const deadline = new Date(seminar.registration_deadline)
      const now = new Date()
      return now <= deadline
    }
    return true
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data seminar...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/self-development">
              <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Seminar Pengembangan Diri</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => fetchSeminars(true)}
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
            <h3 className="font-semibold text-blue-800 mb-2">Tentang Seminar Pengembangan Diri</h3>
            <p className="text-sm text-blue-700">
              Ikuti berbagai seminar untuk mengembangkan soft skills dan mempersiapkan diri menghadapi masa depan.
              Seminar dilaksanakan oleh pembicara berpengalaman di bidangnya.
            </p>
          </CardContent>
        </Card>

        {seminars.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Seminar</h3>
              <p className="text-gray-500">Seminar akan segera tersedia. Silakan cek kembali nanti.</p>
            </CardContent>
          </Card>
        ) : (
          seminars.map((seminar) => (
            <Card key={seminar.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{seminar.title}</CardTitle>
                  {getStatusBadge(seminar)}
                </div>
                <p className="text-sm text-gray-600">{seminar.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{formatDate(seminar.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>
                      {formatTime(seminar.time_start)} - {formatTime(seminar.time_end)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>{seminar.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>
                      {seminar.current_participants}/{seminar.max_participants} peserta
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min((seminar.current_participants / seminar.max_participants) * 100, 100)}%`,
                    }}
                  ></div>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-sm text-gray-600">
                    Pembicara: <span className="font-medium">{seminar.speaker}</span>
                  </p>
                  {seminar.registration_deadline && (
                    <p className="text-xs text-gray-500 mt-1">
                      Batas pendaftaran: {formatDate(seminar.registration_deadline)}
                    </p>
                  )}
                </div>

                {/* Benefits */}
                {seminar.benefits && seminar.benefits.length > 0 && (
                  <div className="pt-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">Manfaat:</p>
                    <div className="flex flex-wrap gap-1">
                      {seminar.benefits.slice(0, 2).map((benefit, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                      {seminar.benefits.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{seminar.benefits.length - 2} lainnya
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      disabled={!isRegistrationOpen(seminar)}
                      variant={seminar.status === "full" ? "secondary" : "default"}
                      onClick={() => {
                        setSelectedSeminar(seminar)
                        setRegistrationSuccess(false)
                        setRegistrationError(null)
                      }}
                    >
                      {seminar.status === "full"
                        ? "Seminar Penuh"
                        : seminar.status === "cancelled"
                          ? "Seminar Dibatalkan"
                          : seminar.status === "completed"
                            ? "Seminar Selesai"
                            : !isRegistrationOpen(seminar)
                              ? "Pendaftaran Ditutup"
                              : "Daftar Seminar"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Daftar Seminar</DialogTitle>
                    </DialogHeader>

                    {registrationSuccess ? (
                      <div className="text-center py-4">
                        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Pendaftaran Berhasil!</h3>
                        <p className="text-gray-600 mb-4">
                          Anda telah berhasil mendaftar untuk seminar "{selectedSeminar?.title}".
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
                        {selectedSeminar && (
                          <div className="bg-gray-50 p-3 rounded-lg">
                            <h4 className="font-medium text-gray-800">{selectedSeminar.title}</h4>
                            <p className="text-sm text-gray-600">
                              {formatDate(selectedSeminar.date)} • {formatTime(selectedSeminar.time_start)} -{" "}
                              {formatTime(selectedSeminar.time_end)}
                            </p>
                            <p className="text-sm text-gray-600">{selectedSeminar.location}</p>
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
                              onChange={(e) => setRegistrationForm((prev) => ({ ...prev, namaSiswa: e.target.value }))}
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
                              onChange={(e) => setRegistrationForm((prev) => ({ ...prev, noTelepon: e.target.value }))}
                              placeholder="Masukkan nomor telepon"
                              required
                            />
                          </div>

                          <div>
                            <Label htmlFor="alasan">Alasan Mengikuti (Opsional)</Label>
                            <Textarea
                              id="alasan"
                              value={registrationForm.alasanMengikuti}
                              onChange={(e) =>
                                setRegistrationForm((prev) => ({ ...prev, alasanMengikuti: e.target.value }))
                              }
                              placeholder="Mengapa Anda ingin mengikuti seminar ini?"
                              rows={3}
                            />
                          </div>
                        </div>

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
          ))
        )}
      </div>
    </div>
  )
}
