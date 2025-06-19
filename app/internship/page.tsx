"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  ArrowLeft,
  Building,
  Clock,
  MapPin,
  GraduationCap,
  Users,
  Calendar,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import {
  getInternships,
  registerInternship,
  getTypeColor,
  formatDate,
  type Internship,
  type InternshipRegistration,
} from "@/lib/supabase-internship"

export default function InternshipPage() {
  const [internships, setInternships] = useState<Internship[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    no_wa: "",
    kelas: "",
    catatan: "",
  })

  useEffect(() => {
    fetchInternships()
  }, [])

  const fetchInternships = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getInternships()
      setInternships(data)
    } catch (err) {
      setError("Gagal memuat data magang. Silakan coba lagi.")
      console.error("Error fetching internships:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedInternship) return

    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const registrationData: InternshipRegistration = {
        internship_id: selectedInternship.id,
        nama: formData.nama,
        no_wa: formData.no_wa,
        kelas: formData.kelas,
        catatan: formData.catatan || undefined,
      }

      const result = await registerInternship(registrationData)

      if (result.success) {
        setSubmitMessage({ type: "success", text: result.message })
        setFormData({ nama: "", no_wa: "", kelas: "", catatan: "" })
        // Refresh internships to update participant count
        await fetchInternships()
        // Close dialog after 2 seconds
        setTimeout(() => {
          setIsDialogOpen(false)
          setSubmitMessage(null)
        }, 2000)
      } else {
        setSubmitMessage({ type: "error", text: result.message })
      }
    } catch (error) {
      setSubmitMessage({ type: "error", text: "Terjadi kesalahan. Silakan coba lagi." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const openRegistrationDialog = (internship: Internship) => {
    setSelectedInternship(internship)
    setIsDialogOpen(true)
    setSubmitMessage(null)
  }

  const getAvailabilityStatus = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 100) return { text: "Penuh", color: "text-red-600" }
    if (percentage >= 80) return { text: "Hampir Penuh", color: "text-orange-600" }
    return { text: "Tersedia", color: "text-green-600" }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-black text-white p-4">
          <div className="flex items-center gap-3">
            <Link href="/self-development">
              <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Program Belajar Magang</h1>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-black text-white p-4">
          <div className="flex items-center gap-3">
            <Link href="/self-development">
              <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Program Belajar Magang</h1>
          </div>
        </div>
        <div className="p-4">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
              <p className="text-red-700 mb-4">{error}</p>
              <Button onClick={fetchInternships} variant="outline">
                Coba Lagi
              </Button>
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
          <Link href="/self-development">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Program Belajar Magang</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-blue-800 mb-2">Tentang Program Belajar Magang</h3>
            <p className="text-sm text-blue-700">
              Program belajar magang memberikan kesempatan untuk belajar langsung di dunia kerja dan mengembangkan
              keterampilan praktis. Semua program magang ini GRATIS!
            </p>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-2">
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-blue-600">{internships.length}</div>
              <div className="text-xs text-gray-600">Program Tersedia</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600">
                {internships.reduce((sum, internship) => sum + internship.current_participants, 0)}
              </div>
              <div className="text-xs text-gray-600">Total Peserta</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-purple-600">
                {
                  internships.filter((internship) => internship.current_participants < internship.max_participants)
                    .length
                }
              </div>
              <div className="text-xs text-gray-600">Masih Tersedia</div>
            </CardContent>
          </Card>
        </div>

        {internships.map((internship) => {
          const availability = getAvailabilityStatus(internship.current_participants, internship.max_participants)
          const progressPercentage = (internship.current_participants / internship.max_participants) * 100

          return (
            <Card key={internship.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-base">{internship.title}</CardTitle>
                  <Badge className={getTypeColor(internship.type)}>{internship.type}</Badge>
                </div>
                <p className="text-sm text-gray-600">{internship.description}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-600" />
                    <span>{internship.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>Durasi: {internship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>{internship.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-600" />
                    <span>{internship.requirements}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-orange-600" />
                    <span>
                      {internship.current_participants}/{internship.max_participants} peserta
                    </span>
                    <span className={`text-xs font-medium ${availability.color}`}>({availability.text})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-indigo-600" />
                    <span>
                      {formatDate(internship.start_date)} - {formatDate(internship.end_date)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Kapasitas</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        progressPercentage >= 100
                          ? "bg-red-500"
                          : progressPercentage >= 80
                            ? "bg-orange-500"
                            : "bg-green-500"
                      }`}
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-lg font-bold text-green-600">GRATIS</span>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="w-full"
                      onClick={() => openRegistrationDialog(internship)}
                      disabled={internship.current_participants >= internship.max_participants}
                    >
                      {internship.current_participants >= internship.max_participants ? "Penuh" : "Daftar Magang"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Daftar Magang</DialogTitle>
                      <p className="text-sm text-gray-600">{selectedInternship?.title}</p>
                      <p className="text-sm text-gray-500">{selectedInternship?.company}</p>
                    </DialogHeader>

                    {submitMessage && (
                      <div
                        className={`p-3 rounded-lg flex items-center gap-2 ${
                          submitMessage.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                        }`}
                      >
                        {submitMessage.type === "success" ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <AlertCircle className="w-4 h-4" />
                        )}
                        <span className="text-sm">{submitMessage.text}</span>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="nama">Nama Lengkap</Label>
                        <Input
                          id="nama"
                          name="nama"
                          value={formData.nama}
                          onChange={handleInputChange}
                          placeholder="Masukkan nama lengkap"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="no_wa">Nomor WhatsApp</Label>
                        <Input
                          id="no_wa"
                          name="no_wa"
                          value={formData.no_wa}
                          onChange={handleInputChange}
                          placeholder="08xxxxxxxxxx"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="kelas">Kelas</Label>
                        <Input
                          id="kelas"
                          name="kelas"
                          value={formData.kelas}
                          onChange={handleInputChange}
                          placeholder="Contoh: XII IPA 1"
                          required
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="catatan">Catatan (Opsional)</Label>
                        <Textarea
                          id="catatan"
                          name="catatan"
                          value={formData.catatan}
                          onChange={handleInputChange}
                          placeholder="Pengalaman atau motivasi Anda..."
                          rows={3}
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                          disabled={isSubmitting}
                          className="flex-1"
                        >
                          Batal
                        </Button>
                        <Button type="submit" disabled={isSubmitting} className="flex-1">
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Mendaftar...
                            </>
                          ) : (
                            "Daftar"
                          )}
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          )
        })}

        {internships.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Program Magang</h3>
              <p className="text-gray-500">Program magang akan segera tersedia. Silakan cek kembali nanti.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
