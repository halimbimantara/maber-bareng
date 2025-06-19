"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Users, Calendar, BookOpen, Clock, User, Star, Filter } from "lucide-react"
import {
  getBimbinganKelas,
  type BimbinganKelas,
  getDifficultyColor,
  getStatusColor,
} from "@/lib/supabase-bimbingan-kelas"

export default function ClassGuidancePage() {
  const [bimbinganKelas, setBimbinganKelas] = useState<BimbinganKelas[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedKategori, setSelectedKategori] = useState<string>("semua")

  useEffect(() => {
    fetchBimbinganKelas()
  }, [])

  const fetchBimbinganKelas = async () => {
    try {
      setLoading(true)
      const data = await getBimbinganKelas()
      setBimbinganKelas(data)
    } catch (err) {
      setError("Gagal memuat data bimbingan kelas")
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  const filteredKelas =
    selectedKategori === "semua"
      ? bimbinganKelas
      : bimbinganKelas.filter((kelas) => kelas.kategori.toLowerCase() === selectedKategori.toLowerCase())

  const kategoris = ["semua", ...Array.from(new Set(bimbinganKelas.map((kelas) => kelas.kategori)))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-b-3xl shadow-lg">
          <div className="flex items-center gap-3">
            <Link href="/continue-study">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Image src="/images/ico_maber.png" alt="MaBer" width={32} height={32} className="rounded-lg" />
              <div>
                <h1 className="text-lg font-bold">MaBer</h1>
                <p className="text-blue-100 text-sm">Bimbingan Kelas</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-b-3xl shadow-lg">
          <div className="flex items-center gap-3">
            <Link href="/continue-study">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Image src="/images/ico_maber.png" alt="MaBer" width={32} height={32} className="rounded-lg" />
              <div>
                <h1 className="text-lg font-bold">MaBer</h1>
                <p className="text-blue-100 text-sm">Bimbingan Kelas</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchBimbinganKelas} variant="outline">
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
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3">
          <Link href="/continue-study">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Image src="/images/ico_maber.png" alt="MaBer" width={32} height={32} className="rounded-lg" />
            <div>
              <h1 className="text-lg font-bold">MaBer</h1>
              <p className="text-blue-100 text-sm">Bimbingan Kelas</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Filter Kategori */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Filter className="w-4 h-4 text-orange-600" />
              Filter Kategori
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {kategoris.map((kategori) => (
                <Button
                  key={kategori}
                  variant={selectedKategori === kategori ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedKategori(kategori)}
                  className="whitespace-nowrap"
                >
                  {kategori.charAt(0).toUpperCase() + kategori.slice(1)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-600">{filteredKelas.length}</div>
                <div className="text-xs text-gray-600">Kelas Tersedia</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {filteredKelas.reduce((sum, kelas) => sum + kelas.peserta_terdaftar, 0)}
                </div>
                <div className="text-xs text-gray-600">Total Peserta</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {filteredKelas.filter((kelas) => kelas.status === "aktif").length}
                </div>
                <div className="text-xs text-gray-600">Kelas Aktif</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daftar Kelas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600" />
              Kelas Tersedia ({filteredKelas.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredKelas.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Tidak ada kelas tersedia untuk kategori ini</p>
              </div>
            ) : (
              filteredKelas.map((kelas) => (
                <Card key={kelas.id} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{kelas.nama_kelas}</h3>
                        <p className="text-sm text-gray-600 mb-2">{kelas.deskripsi}</p>
                      </div>
                      {kelas.gambar_url && (
                        <Image
                          src={kelas.gambar_url || "/placeholder.svg"}
                          alt={kelas.nama_kelas}
                          width={80}
                          height={60}
                          className="rounded-lg ml-3"
                        />
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge variant="secondary" className={getDifficultyColor(kelas.tingkat_kesulitan)}>
                        {kelas.tingkat_kesulitan.charAt(0).toUpperCase() + kelas.tingkat_kesulitan.slice(1)}
                      </Badge>
                      <Badge variant="secondary" className={getStatusColor(kelas.status)}>
                        {kelas.status.charAt(0).toUpperCase() + kelas.status.slice(1)}
                      </Badge>
                      <Badge variant="outline">{kelas.kategori}</Badge>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{kelas.jadwal}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{kelas.durasi_per_sesi} menit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">{kelas.instruktur}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-600">
                          {kelas.peserta_terdaftar}/{kelas.kapasitas_maksimal} peserta
                        </span>
                      </div>
                    </div>

                    {/* Mata Pelajaran */}
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Mata Pelajaran:</p>
                      <div className="flex flex-wrap gap-1">
                        {kelas.mata_pelajaran.map((mapel, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {mapel}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Fasilitas */}
                    {kelas.fasilitas && kelas.fasilitas.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Fasilitas:</p>
                        <div className="flex flex-wrap gap-1">
                          {kelas.fasilitas.map((fasilitas, index) => (
                            <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
                              {fasilitas}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Free Class Indicator and Action */}
                    <div className="flex justify-between items-center pt-3 border-t">
                      <div>
                        <div className="text-lg font-bold text-green-600">GRATIS</div>
                        <div className="text-xs text-gray-500">
                          {kelas.total_sesi} sesi • {new Date(kelas.tanggal_mulai).toLocaleDateString("id-ID")}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        disabled={kelas.status === "penuh" || kelas.status === "selesai"}
                        className="bg-orange-600 hover:bg-orange-700"
                      >
                        {kelas.status === "penuh" ? "Penuh" : "Daftar Gratis"}
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Kapasitas</span>
                        <span>{Math.round((kelas.peserta_terdaftar / kelas.kapasitas_maksimal) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${Math.min((kelas.peserta_terdaftar / kelas.kapasitas_maksimal) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>

        {/* Info Footer */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Kelas Gratis Berkualitas</h4>
                <p className="text-sm text-blue-700">
                  Semua kelas bimbingan tersedia gratis! Pilih kelas sesuai dengan tingkat kemampuan dan tujuan belajar
                  Anda. Konsultasikan dengan konselor jika masih ragu.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
