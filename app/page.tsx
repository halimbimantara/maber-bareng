import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, MessageCircle, Globe, Lightbulb, BarChart3, Home, Menu } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#4688a5] to-[#5a9bb8] text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/ico_maber.png" alt="MaBer App Icon" width={40} height={40} className="rounded-lg" />
            <div>
              <h1 className="text-xl font-bold">MaBer</h1>
              <p className="text-blue-100 text-sm">Mari belajar dan berkembang bareng</p>
            </div>
          </div>
          <Link href="/menu">
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-400/20">
              <Menu className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Hero Banner */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative">
              <Image
                src="/images/student-banner.png"
                alt="Students with paper airplanes representing hopes and dreams for the future"
                width={400}
                height={250}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600/90 to-transparent text-white p-4">
                <p className="text-sm font-medium">Harapan terbesarmu untuk masa depan</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <Button className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 text-base font-medium rounded-lg">
          Yuk! Tentukan Arah Masa Depanmu!
        </Button>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/survey" className="block">
            <Button variant="outline" className="flex items-center gap-2 py-3 rounded-full w-full">
              <FileText className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium">Isi Survei</span>
            </Button>
          </Link>
          <a
            href="https://wa.me/6281573291314?text=Halo,%20saya%20ingin%20berkonsultasi%20mengenai%20bimbingan%20karir%20dan%20masa%20depan%20saya.%20Nama%20saya%20Hanung%20Gagas%20Radya%20dari%20kelas%20XI%20IPS."
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button variant="outline" className="flex items-center gap-2 py-3 rounded-full w-full">
              <MessageCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">Layanan Konseling</span>
            </Button>
          </a>
        </div>

        {/* Learning Options */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Pilihan Belajar Terbaik</h2>
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4">
                <Link href="/continue-study" className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">Lanjut Studi</p>
                </Link>
                <Link href="/self-development" className="text-center">
                  <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Lightbulb className="w-6 h-6 text-cyan-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">Pengembangan Diri</p>
                </Link>
                <Link href="/results" className="text-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BarChart3 className="w-6 h-6 text-red-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-700">Hasil Survei</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Inspirational Quote Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-blue-800 mb-2">💫 Inspirasi Hari Ini</h3>
            <p className="text-sm text-blue-700 italic">
              "Belajarlah dengan sungguh-sungguh, karena masa depanmu dibangun dari ilmu hari ini. Rasulullah ﷺ
              bersabda, 'Barang siapa menempuh jalan untuk mencari ilmu, Allah akan mudahkan baginya jalan menuju
              surga.' "
            </p>
            <p className="text-xs text-blue-600 mt-1">HR. Muslim</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-center">
          <Button variant="ghost" size="icon" className="text-blue-600">
            <Home className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Bottom padding to account for fixed navigation */}
      <div className="h-20"></div>
    </div>
  )
}
