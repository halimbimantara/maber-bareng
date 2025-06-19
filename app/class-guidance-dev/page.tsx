"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Home, Users, Clock, MapPin, Star, Filter, Calendar, User, BookOpen, Award } from "lucide-react"
import {
  getKelasPengembanganDiri,
  getKelasPengembanganDiriByKategori,
  getDifficultyColor,
  getCategoryColor,
  formatTanggal,
  getAvailabilityStatus,
  type KelasPengembanganDiri,
} from "@/lib/supabase-kelas-pengembangan-diri"

export default function ClassGuidanceDevPage() {
  const [classes, setClasses] = useState<KelasPengembanganDiri[]>([])
  const [filteredClasses, setFilteredClasses] = useState<KelasPengembanganDiri[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const categories = [
    "Semua",
    "Kewirausahaan",
    "Keterampilan Teknis",
    "Hospitality",
    "Digital Marketing",
    "Soft Skills",
    "Keuangan",
  ]

  useEffect(() => {
    fetchClasses()
  }, [])

  useEffect(() => {
    filterClasses()
  }, [selectedCategory, classes])

  const fetchClasses = async () => {
    try {
      setLoading(true)
      const data = await getKelasPengembanganDiri()
      setClasses(data)
      setError(null)
    } catch (err) {
      setError("Gagal memuat data kelas. Silakan coba lagi.")
      console.error("Error fetching classes:", err)
    } finally {
      setLoading(false)
    }
  }

  const filterClasses = async () => {
    try {
      if (selectedCategory === "Semua") {
        setFilteredClasses(classes)
      } else {
        const filtered = await getKelasPengembanganDiriByKategori(selectedCategory)
        setFilteredClasses(filtered)
      }
    } catch (err) {
      console.error("Error filtering classes:", err)
    }
  }

  const getStats = () => {
    const totalClasses = classes.length
    const totalParticipants = classes.reduce((sum, cls) => sum + cls.peserta_terdaftar, 0)
    const activeClasses = classes.filter((cls) => cls.status === "aktif").length

    return { totalClasses, totalParticipants, activeClasses }
  }

  const stats = getStats()

  if (loading) {
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
              <p className="text-yellow-400 text-sm font-medium">Student:</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="font-medium">Hanung Gagas Radya</span>
                <span className="text-gray-300">XI IPS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-full py-3 px-6 text-center">
            <h1 className="text-white font-semibold text-lg">Pelatihan & Pengembangan</h1>
          </div>

          {/* Loading Skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
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
        {/* Header */}
        <div className="bg-black text-white p-4">
          <div className="flex items-center gap-3">
            <Link href="/self-development">
              <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <p className="text-yellow-400 text-sm font-medium">Student:</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="font-medium">Hanung Gagas Radya</span>
                <span className="text-gray-300">XI IPS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-full py-3 px-6 text-center">
            <h1 className="text-white font-semibold text-lg">Pelatihan & Pengembangan</h1>
          </div>

          <Card className="border-red-200">
            <CardContent className="p-6 text-center">
              <div className="text-red-500 mb-4">
                <BookOpen className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Gagal Memuat Data</h3>
              <p className="text-gray-600 mb-4">{error}</p>
              <Button onClick={fetchClasses} className="bg-orange-500 hover:bg-orange-600">
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
      {/* Header */}
      <div className="bg-black text-white p-4">
        <div className="flex items-center gap-3">
          <Link href="/self-development">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <p className="text-yellow-400 text-sm font-medium">Student:</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="font-medium">Hanung Gagas Radya</span>
              <span className="text-gray-300">XI IPS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-orange-400 to-red-400 rounded-full py-3 px-6 text-center">
          <h1 className="text-white font-semibold text-lg">Pelatihan & Pengembangan</h1>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-3 text-center">
              <BookOpen className="w-6 h-6 text-orange-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{stats.totalClasses}</p>
              <p className="text-xs text-gray-600">Total Kelas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Users className="w-6 h-6 text-blue-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{stats.totalParticipants}</p>
              <p className="text-xs text-gray-600">Peserta</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <Award className="w-6 h-6 text-green-500 mx-auto mb-1" />
              <p className="text-lg font-bold text-gray-900">{stats.activeClasses}</p>
              <p className="text-xs text-gray-600">Kelas Aktif</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter Kategori:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-orange-500 hover:bg-orange-600"
                    : "hover:bg-orange-50 hover:border-orange-200"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Classes List */}
        <div className="space-y-4">
          {filteredClasses.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Tidak Ada Kelas</h3>
                <p className="text-gray-600">Belum ada kelas untuk kategori yang dipilih.</p>
              </CardContent>
            </Card>
          ) : (
            filteredClasses.map((kelas) => {
              const availability = getAvailabilityStatus(kelas.peserta_terdaftar, kelas.max_peserta)

              return (
                <Card key={kelas.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    {/* Class Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{kelas.judul}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(kelas.kategori)}`}
                          >
                            {kelas.kategori}
                          </span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(kelas.tingkat_kesulitan)}`}
                          >
                            {kelas.tingkat_kesulitan}
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-600">GRATIS</p>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mb-3">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700 font-medium">{kelas.pengisi}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{kelas.deskripsi}</p>

                    {/* Class Details Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Tanggal</p>
                          <p className="text-sm font-medium">{formatTanggal(kelas.tanggal_mulai)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Durasi</p>
                          <p className="text-sm font-medium">{kelas.durasi_jam} jam</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Lokasi</p>
                          <p className="text-sm font-medium">{kelas.lokasi}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Peserta</p>
                          <p className="text-sm font-medium">
                            {kelas.peserta_terdaftar}/{kelas.max_peserta}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Schedule */}
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-1">Jadwal</p>
                      <p className="text-sm font-medium">
                        {kelas.jadwal_hari}, {kelas.jadwal_waktu}
                      </p>
                    </div>

                    {/* Availability Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">Ketersediaan</span>
                        <span className={`text-xs font-medium ${availability.color}`}>{availability.status}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            availability.percentage >= 100
                              ? "bg-red-500"
                              : availability.percentage >= 80
                                ? "bg-orange-500"
                                : availability.percentage >= 50
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                          }`}
                          style={{ width: `${availability.percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      className="w-full bg-orange-500 hover:bg-orange-600"
                      disabled={availability.percentage >= 100}
                    >
                      {availability.percentage >= 100 ? "Kelas Penuh" : "Daftar Gratis"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })
          )}
        </div>

        {/* Tips Section */}
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Star className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Tips Mengikuti Pelatihan</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Datang tepat waktu dan siapkan alat tulis</li>
                  <li>• Aktif bertanya dan berdiskusi dengan instruktur</li>
                  <li>• Praktikkan ilmu yang didapat setelah pelatihan</li>
                  <li>• Manfaatkan sesi networking dengan peserta lain</li>
                  <li>• Semua pelatihan GRATIS dan bersertifikat!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-center">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-blue-600">
              <Home className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  )
}
