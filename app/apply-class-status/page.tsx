"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Search, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { getPengajuanKelas, type PengajuanKelas } from "@/lib/supabase-pengajuan-kelas"

export default function ApplyClassStatusPage() {
  const [applications, setApplications] = useState<PengajuanKelas[]>([])
  const [loading, setLoading] = useState(false)
  const [searchEmail, setSearchEmail] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!searchEmail.trim()) return

    setLoading(true)
    setHasSearched(true)

    try {
      const data = await getPengajuanKelas(searchEmail.trim())
      setApplications(data)
    } catch (error) {
      console.error("Error fetching applications:", error)
      setApplications([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Menunggu Persetujuan
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="default" className="bg-green-600">
            Disetujui
          </Badge>
        )
      case "rejected":
        return <Badge variant="destructive">Ditolak</Badge>
      case "completed":
        return <Badge variant="secondary">Selesai</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getJenisKelasLabel = (jenisKelas: string) => {
    return jenisKelas === "lanjut-studi" ? "Lanjut Studi" : "Pengembangan Diri"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white p-4">
        <div className="flex items-center gap-3">
          <Link href="/menu">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">Status Pengajuan Kelas</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Cek Status Pengajuan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email yang digunakan saat pengajuan</Label>
              <Input
                id="email"
                type="email"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
                placeholder="Masukkan email Anda"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <Button onClick={handleSearch} disabled={loading || !searchEmail.trim()} className="w-full">
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Mencari...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Cari Pengajuan
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {hasSearched && (
          <>
            {applications.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Tidak Ada Pengajuan Ditemukan</h3>
                  <p className="text-gray-500">
                    Tidak ditemukan pengajuan kelas dengan email tersebut. Pastikan email yang dimasukkan benar.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800">Ditemukan {applications.length} pengajuan</h2>

                {applications.map((application) => (
                  <Card key={application.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{application.mata_pelajaran}</CardTitle>
                          <p className="text-sm text-gray-600 mt-1">{getJenisKelasLabel(application.jenis_kelas)}</p>
                        </div>
                        {getStatusBadge(application.status || "pending")}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(application.status || "pending")}
                          <span className="font-medium">Status:</span>
                          <span>
                            {application.status === "pending"
                              ? "Menunggu Persetujuan"
                              : application.status === "approved"
                                ? "Disetujui"
                                : application.status === "rejected"
                                  ? "Ditolak"
                                  : "Selesai"}
                          </span>
                        </div>

                        <div>
                          <span className="font-medium">Jadwal Preferensi:</span>
                          <span className="ml-2">{application.jadwal_preferensi}</span>
                        </div>

                        <div>
                          <span className="font-medium">Tanggal Pengajuan:</span>
                          <span className="ml-2">{formatDate(application.created_at!)}</span>
                        </div>

                        {application.jenis_keterampilan && (
                          <div>
                            <span className="font-medium">Jenis Keterampilan:</span>
                            <span className="ml-2">{application.jenis_keterampilan}</span>
                          </div>
                        )}

                        {application.tujuan_pembelajaran && (
                          <div>
                            <span className="font-medium">Tujuan Pembelajaran:</span>
                            <p className="mt-1 text-gray-600 text-sm">{application.tujuan_pembelajaran}</p>
                          </div>
                        )}

                        {application.catatan_tambahan && (
                          <div>
                            <span className="font-medium">Catatan Tambahan:</span>
                            <p className="mt-1 text-gray-600 text-sm">{application.catatan_tambahan}</p>
                          </div>
                        )}

                        {application.admin_notes && (
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <span className="font-medium text-blue-800">Catatan Admin:</span>
                            <p className="mt-1 text-blue-700 text-sm">{application.admin_notes}</p>
                          </div>
                        )}

                        {application.approved_at && (
                          <div>
                            <span className="font-medium">Disetujui pada:</span>
                            <span className="ml-2">{formatDate(application.approved_at)}</span>
                            {application.approved_by && (
                              <span className="ml-2 text-gray-600">oleh {application.approved_by}</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Status-specific information */}
                      {application.status === "pending" && (
                        <div className="bg-yellow-50 p-3 rounded-lg">
                          <p className="text-sm text-yellow-700">
                            📋 Pengajuan Anda sedang ditinjau. Tim kami akan menghubungi Anda dalam 1-2 hari kerja.
                          </p>
                        </div>
                      )}

                      {application.status === "approved" && (
                        <div className="bg-green-50 p-3 rounded-lg">
                          <p className="text-sm text-green-700">
                            ✅ Pengajuan Anda telah disetujui! Tim kami akan segera menghubungi Anda untuk mengatur
                            jadwal kelas.
                          </p>
                        </div>
                      )}

                      {application.status === "rejected" && (
                        <div className="bg-red-50 p-3 rounded-lg">
                          <p className="text-sm text-red-700">
                            ❌ Pengajuan tidak dapat disetujui. Silakan lihat catatan admin atau hubungi kami untuk
                            informasi lebih lanjut.
                          </p>
                        </div>
                      )}

                      {application.status === "completed" && (
                        <div className="bg-blue-50 p-3 rounded-lg">
                          <p className="text-sm text-blue-700">
                            🎉 Kelas telah selesai! Terima kasih telah mengikuti program bimbingan kami.
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}

        {/* Info Card */}
        {!hasSearched && (
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-800 mb-2">Cara Mengecek Status</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Masukkan email yang sama dengan saat pengajuan</li>
                <li>• Sistem akan menampilkan semua pengajuan yang terkait dengan email tersebut</li>
                <li>• Status akan diperbarui secara real-time</li>
                <li>• Anda akan dihubungi melalui email/telepon untuk konfirmasi</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
