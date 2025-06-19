import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Target, TrendingUp, Users, Briefcase, Home } from "lucide-react"

export default function JurusanJituPage() {
  const popularMajors = [
    { name: "Teknik Informatika", demand: "Sangat Tinggi", salary: "8-15 juta", growth: "+25%" },
    { name: "Kedokteran", demand: "Tinggi", salary: "10-20 juta", growth: "+15%" },
    { name: "Akuntansi", demand: "Tinggi", salary: "5-12 juta", growth: "+10%" },
    { name: "Psikologi", demand: "Sedang", salary: "4-10 juta", growth: "+12%" },
    { name: "Teknik Sipil", demand: "Tinggi", salary: "6-14 juta", growth: "+8%" },
  ]

  const tips = [
    "Kenali minat dan bakat pribadi Anda",
    "Riset prospek karir dan gaji di masa depan",
    "Pertimbangkan tren industri 5-10 tahun ke depan",
    "Konsultasi dengan alumni atau profesional",
    "Sesuaikan dengan kemampuan finansial keluarga",
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
              <span className="font-medium">Jurusan Jitu</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl py-6 px-6 text-center">
          <Target className="w-12 h-12 text-white mx-auto mb-3" />
          <h1 className="text-white font-bold text-2xl mb-2">Jurusan Jitu</h1>
          <p className="text-blue-100 text-sm">Panduan memilih jurusan yang tepat untuk masa depan cerah</p>
        </div>

        {/* Introduction */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Mengapa Pemilihan Jurusan Penting?</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Memilih jurusan yang tepat adalah langkah krusial yang akan menentukan arah karir dan kehidupan Anda.
              Jurusan yang "jitu" adalah yang sesuai dengan minat, bakat, dan memiliki prospek karir yang cerah.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-xs text-gray-600">Sesuai Minat</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-xs text-gray-600">Prospek Cerah</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-xs text-gray-600">Karir Stabil</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Majors */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Jurusan Populer & Prospektif</h3>
            <div className="space-y-3">
              {popularMajors.map((major, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-800">{major.name}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        major.demand === "Sangat Tinggi"
                          ? "bg-red-100 text-red-700"
                          : major.demand === "Tinggi"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {major.demand}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Gaji Rata-rata:</p>
                      <p className="font-medium text-green-600">{major.salary}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Pertumbuhan:</p>
                      <p className="font-medium text-blue-600">{major.growth}</p>
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
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tips Memilih Jurusan Jitu</h3>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Butuh Konsultasi?</h3>
            <p className="text-sm text-gray-600 mb-4">Konsultasikan pilihan jurusan Anda dengan konselor ahli kami</p>
            <Link href="/counseling">
              <Button className="bg-blue-600 hover:bg-blue-700">Konsultasi Sekarang</Button>
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
