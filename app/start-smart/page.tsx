import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Target, MapPin, Award, Home } from "lucide-react"

export default function StartSmartPage() {
  const smartMenuItems = [
    {
      title: "Jurusan Jitu",
      description: "Panduan memilih jurusan yang tepat sesuai minat dan prospek karir",
      icon: Target,
      href: "/start-smart/jurusan-jitu",
      color: "bg-blue-600",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      title: "Jalan Pintar",
      description: "Strategi cerdas meraih universitas impian dengan berbagai jalur masuk",
      icon: MapPin,
      href: "/start-smart/jalan-pintar",
      color: "bg-green-600",
      gradient: "from-green-500 to-green-600",
    },
    {
      title: "Beasiswa",
      description: "Informasi lengkap beasiswa dalam dan luar negeri untuk pendidikan tinggi",
      icon: Award,
      href: "/start-smart/beasiswa",
      color: "bg-purple-600",
      gradient: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-4">
        <div className="flex items-center gap-3">
          <Link href="/continue-study">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <p className="text-yellow-400 text-sm font-medium">Lanjut Studi:</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="font-medium">Start Smart</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl py-6 px-6 text-center">
          <h1 className="text-white font-bold text-2xl mb-2">Start Smart</h1>
          <p className="text-purple-100 text-sm">Mulai perjalanan cerdas menuju pendidikan tinggi impian Anda</p>
        </div>

        {/* Hero Description */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Panduan Lengkap Lanjut Studi</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Start Smart memberikan panduan komprehensif untuk membantu Anda membuat keputusan cerdas dalam
                melanjutkan pendidikan tinggi. Dari pemilihan jurusan hingga strategi mendapatkan beasiswa.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 px-2">Pilih Panduan:</h3>

          {smartMenuItems.map((item, index) => (
            <Link key={index} href={item.href}>
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                <CardContent className="p-0">
                  <div className={`bg-gradient-to-r ${item.gradient} p-6 rounded-t-lg`}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    <div className="mt-3 flex items-center text-blue-600 text-sm font-medium">
                      <span>Pelajari Selengkapnya</span>
                      <ArrowLeft className="w-4 h-4 ml-1 rotate-180" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Tips Section */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-sm font-bold">💡</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Tips Start Smart:</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Mulai dengan mengenali minat dan bakat Anda</li>
                  <li>• Riset mendalam tentang jurusan dan universitas</li>
                  <li>• Persiapkan diri sejak dini untuk berbagai jalur masuk</li>
                  <li>• Manfaatkan semua peluang beasiswa yang tersedia</li>
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
