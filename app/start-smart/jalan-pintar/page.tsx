import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, MapPin, BookOpen, Trophy, Clock, Home } from "lucide-react"

export default function JalanPintarPage() {
  const pathways = [
    {
      name: "SNBP (Jalur Prestasi)",
      description: "Seleksi berdasarkan prestasi akademik dan non-akademik",
      requirements: ["Ranking 50% terbaik", "Prestasi akademik/non-akademik", "Portofolio"],
      percentage: "20%",
      color: "bg-green-500",
    },
    {
      name: "SNBT (Jalur Tes)",
      description: "Seleksi melalui tes skolastik dan literasi",
      requirements: ["Tes Skolastik", "Literasi Bahasa", "Penalaran Matematika"],
      percentage: "40%",
      color: "bg-blue-500",
    },
    {
      name: "Jalur Mandiri",
      description: "Seleksi yang diselenggarakan oleh universitas",
      requirements: ["Tes mandiri", "Wawancara", "Portofolio khusus"],
      percentage: "30%",
      color: "bg-purple-500",
    },
    {
      name: "Jalur Prestasi",
      description: "Khusus untuk siswa berprestasi tinggi",
      requirements: ["Juara olimpiade", "Prestasi internasional", "Rekomendasi"],
      percentage: "10%",
      color: "bg-orange-500",
    },
  ]

  const strategies = [
    "Persiapkan diri untuk multiple jalur masuk",
    "Fokus pada peningkatan prestasi akademik",
    "Ikuti kompetisi dan olimpiade",
    "Bangun portofolio yang kuat",
    "Pelajari pola soal setiap jalur",
    "Manfaatkan try out dan simulasi",
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
              <span className="font-medium">Jalan Pintar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl py-6 px-6 text-center">
          <MapPin className="w-12 h-12 text-white mx-auto mb-3" />
          <h1 className="text-white font-bold text-2xl mb-2">Jalan Pintar</h1>
          <p className="text-green-100 text-sm">Strategi cerdas meraih universitas impian melalui berbagai jalur</p>
        </div>

        {/* Introduction */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Kenali Semua Jalur Masuk PTN</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Setiap universitas menyediakan berbagai jalur masuk dengan kriteria yang berbeda. Memahami setiap jalur
              akan membantu Anda mempersiapkan strategi yang tepat dan meningkatkan peluang diterima di universitas
              impian.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Timeline Penting</span>
              </div>
              <p className="text-sm text-green-700">
                Persiapan optimal dimulai dari kelas 10-11 untuk membangun prestasi dan portofolio yang kuat.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pathways */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Jalur Masuk Perguruan Tinggi</h3>
            <div className="space-y-4">
              {pathways.map((pathway, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{pathway.name}</h4>
                      <p className="text-sm text-gray-600">{pathway.description}</p>
                    </div>
                    <div className={`${pathway.color} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                      {pathway.percentage}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Persyaratan:</p>
                    <div className="grid grid-cols-1 gap-1">
                      {pathway.requirements.map((req, reqIndex) => (
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

        {/* Strategies */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Strategi Jalan Pintar</h3>
            <div className="space-y-3">
              {strategies.map((strategy, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700">{strategy}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Success Tips */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <Trophy className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Kunci Sukses:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>
                    • <strong>Konsistensi:</strong> Jaga prestasi akademik dari awal
                  </li>
                  <li>
                    • <strong>Diversifikasi:</strong> Siapkan diri untuk berbagai jalur
                  </li>
                  <li>
                    • <strong>Networking:</strong> Bangun relasi dengan alumni dan mentor
                  </li>
                  <li>
                    • <strong>Adaptasi:</strong> Sesuaikan strategi dengan perkembangan
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="p-6 text-center">
            <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Siap Memulai Persiapan?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Ikuti try out dan bimbingan kelas untuk mempersiapkan diri dengan optimal
            </p>
            <div className="flex gap-2 justify-center">
              <Link href="/try-out">
                <Button className="bg-green-600 hover:bg-green-700 text-sm">Try Out</Button>
              </Link>
              <Link href="/class-guidance">
                <Button variant="outline" className="text-sm">
                  Bimbingan Kelas
                </Button>
              </Link>
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

      {/* Bottom padding */}
      <div className="h-20"></div>
    </div>
  )
}
