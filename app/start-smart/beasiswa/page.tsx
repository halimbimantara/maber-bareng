import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Award, Globe, DollarSign, Calendar, Users, Home } from "lucide-react"

export default function BeasiswaPage() {
  const scholarships = [
    {
      name: "KIP Kuliah (Kartu Indonesia Pintar Kuliah)",
      provider: "Kemendikbud",
      type: "Dalam Negeri",
      coverage: "Biaya Kuliah + Biaya Hidup",
      deadline: "Februari - Oktober",
      requirements: [
        "Siswa berprestasi dari keluarga kurang mampu",
        "Lulus seleksi masuk PTN/PTS",
        "Memiliki KIP atau memenuhi kriteria ekonomi",
      ],
      color: "bg-blue-500",
      target: "S1",
    },
    {
      name: "Beasiswa Unggulan",
      provider: "Kemendikbud",
      type: "Dalam/Luar Negeri",
      coverage: "Penuh + Tunjangan",
      deadline: "Februari - April",
      requirements: ["Masyarakat berprestasi", "Prestasi akademik/non-akademik", "Tes seleksi dan wawancara"],
      color: "bg-green-500",
      target: "S1/S2/S3",
    },
    {
      name: "Beasiswa LPDP",
      provider: "Kemenkeu",
      type: "Dalam/Luar Negeri",
      coverage: "Penuh + Living Cost + Asuransi",
      deadline: "Batch 1: Maret, Batch 2: September",
      requirements: ["Lulusan S1 terakreditasi", "TOEFL/IELTS", "Pengalaman organisasi/kerja"],
      color: "bg-red-500",
      target: "S2/S3",
    },
    {
      name: "Beasiswa Indonesia Maju (BIM)",
      provider: "LPDP & Kemendikbud",
      type: "Dalam/Luar Negeri",
      coverage: "Penuh + Tunjangan",
      deadline: "Maret - Mei",
      requirements: ["Prestasi akademik tinggi", "Komitmen kembali ke Indonesia", "Bidang studi prioritas"],
      color: "bg-purple-500",
      target: "S2/S3",
    },
    {
      name: "Beasiswa Pendidikan Indonesia (BPI)",
      provider: "Kemendikbud",
      type: "Dalam/Luar Negeri",
      coverage: "Sesuai Program",
      deadline: "Bervariasi per Program",
      requirements: ["Sesuai program studi", "Prestasi akademik", "Komitmen pengabdian"],
      color: "bg-indigo-500",
      target: "S1/S2/S3",
    },
    {
      name: "Beasiswa Bank Indonesia",
      provider: "Bank Indonesia",
      type: "Dalam Negeri",
      coverage: "SPP + Tunjangan Bulanan",
      deadline: "April - Juni",
      requirements: ["Mahasiswa S1 aktif", "IPK minimal 3.0", "Jurusan Ekonomi/Keuangan/Akuntansi"],
      color: "bg-yellow-600",
      target: "S1",
    },
  ]

  const privateScholarships = [
    {
      name: "Beasiswa Djarum Plus",
      provider: "Djarum Foundation",
      coverage: "Tunjangan + Soft Skills Training",
      requirements: ["Mahasiswa berprestasi", "Semester 4-6", "IPK minimal 3.0"],
    },
    {
      name: "Beasiswa BCA Finance Peduli",
      provider: "BCA Finance",
      coverage: "Bantuan Biaya Pendidikan",
      requirements: ["Potensi akademik baik", "Kondisi ekonomi kurang mampu", "Aktif berorganisasi"],
    },
    {
      name: "Beasiswa Tanoto Foundation",
      provider: "Tanoto Foundation",
      coverage: "Penuh + Leadership Program",
      requirements: ["Mahasiswa berprestasi", "Leadership potential", "Komitmen sosial"],
    },
    {
      name: "Beasiswa Telkom University",
      provider: "Telkom University",
      coverage: "Beasiswa Penuh",
      requirements: ["Berbagai jurusan", "Prestasi akademik", "Tes seleksi"],
    },
    {
      name: "Beasiswa Pertamina",
      provider: "Pertamina Foundation",
      coverage: "Biaya Kuliah + Tunjangan",
      requirements: ["Mahasiswa kampus mitra", "Jurusan teknik/sains", "Ikatan dinas"],
    },
    {
      name: "Beasiswa Cendekia BAZNAS",
      provider: "BAZNAS",
      coverage: "Bantuan Pendidikan",
      requirements: ["Mahasiswa berprestasi", "Kondisi ekonomi kurang mampu", "Aktif dalam kegiatan sosial"],
    },
  ]

  const tips = [
    "Mulai persiapan dokumen sejak dini",
    "Pelajari persyaratan setiap beasiswa dengan detail",
    "Bangun prestasi akademik dan non-akademik",
    "Tingkatkan kemampuan bahasa Inggris",
    "Tulis esai motivasi yang menarik dan personal",
    "Siapkan surat rekomendasi dari dosen/guru",
    "Ikuti webinar dan workshop tentang beasiswa",
    "Bergabung dengan komunitas penerima beasiswa",
  ]

  const categories = [
    { name: "Beasiswa Prestasi", icon: Award, desc: "Berdasarkan prestasi akademik tinggi" },
    { name: "Beasiswa Ekonomi", icon: DollarSign, desc: "Untuk siswa kurang mampu" },
    { name: "Beasiswa Riset", icon: Globe, desc: "Fokus pada penelitian dan inovasi" },
    { name: "Beasiswa Daerah", icon: Users, desc: "Khusus putra/putri daerah" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-4">
        <div className="flex items-center gap-3">
          <Link href="/start-smart">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <p className="text-yellow-400 text-sm font-medium">Start Smart:</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="font-medium">Beasiswa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl py-6 px-6 text-center">
          <Award className="w-12 h-12 text-white mx-auto mb-3" />
          <h1 className="text-white font-bold text-2xl mb-2">Beasiswa</h1>
          <p className="text-purple-100 text-sm">Panduan lengkap meraih beasiswa untuk pendidikan tinggi</p>
        </div>

        {/* Introduction */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Mengapa Beasiswa Penting?</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Beasiswa tidak hanya membantu meringankan beban finansial, tetapi juga membuka peluang untuk mengakses
              pendidikan berkualitas tinggi, membangun jaringan, dan mengembangkan potensi diri secara maksimal.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 rounded-lg p-3 text-center">
                <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-800">Bebas Biaya</p>
                <p className="text-xs text-gray-600">Pendidikan tanpa beban finansial</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-800">Akses Global</p>
                <p className="text-xs text-gray-600">Kesempatan studi di luar negeri</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Scholarship Categories */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Jenis Beasiswa</h3>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
                  <category.icon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <h4 className="font-medium text-gray-800 text-sm mb-1">{category.name}</h4>
                  <p className="text-xs text-gray-600">{category.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Government Scholarships */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Beasiswa Pemerintah</h3>
            <div className="space-y-4">
              {scholarships.map((scholarship, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{scholarship.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{scholarship.provider}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`${scholarship.color} text-white px-2 py-1 rounded-full text-xs`}>
                          {scholarship.type}
                        </span>
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                          {scholarship.target}
                        </span>
                      </div>
                      <span className="text-green-600 font-medium text-sm">{scholarship.coverage}</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Deadline: {scholarship.deadline}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Persyaratan:</p>
                    <div className="grid grid-cols-1 gap-1">
                      {scholarship.requirements.map((req, reqIndex) => (
                        <div key={reqIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-600">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Private Scholarships */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Beasiswa Swasta</h3>
            <div className="space-y-4">
              {privateScholarships.map((scholarship, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{scholarship.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{scholarship.provider}</p>
                      <span className="text-green-600 font-medium text-sm">{scholarship.coverage}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Persyaratan:</p>
                    <div className="grid grid-cols-1 gap-1">
                      {scholarship.requirements.map((req, reqIndex) => (
                        <div key={reqIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                          <span className="text-sm text-gray-600">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tips Meraih Beasiswa</h3>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline Card */}
        <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-8 h-8 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Timeline Persiapan:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • <strong>1 tahun sebelum:</strong> Riset beasiswa dan persyaratan
                  </li>
                  <li>
                    • <strong>6 bulan sebelum:</strong> Persiapan dokumen dan tes bahasa
                  </li>
                  <li>
                    • <strong>3 bulan sebelum:</strong> Finalisasi aplikasi dan esai
                  </li>
                  <li>
                    • <strong>1 bulan sebelum:</strong> Submit aplikasi dan follow up
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-purple-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Butuh Bimbingan?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Konsultasikan strategi beasiswa Anda dengan konselor berpengalaman
            </p>
            <Link href="/counseling">
              <Button className="bg-purple-600 hover:bg-purple-700">Konsultasi Beasiswa</Button>
            </Link>
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

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  )
}
