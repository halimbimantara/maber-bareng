import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MessageCircle, Phone, Clock, User } from "lucide-react"

export default function CounselingPage() {
  const whatsappLink =
    "https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20berkonsultasi%20mengenai%20bimbingan%20karir%20dan%20masa%20depan%20saya."

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-3">
          <Link href="/menu">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Image src="/images/ico_maber.png" alt="MaBer" width={32} height={32} className="rounded-lg" />
            <div>
              <h1 className="text-lg font-bold">MaBer</h1>
              <p className="text-blue-100 text-sm">Layanan Konseling</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Counselor Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              Konselor Tersedia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">Bu Sarah Konselor</h3>
                <p className="text-sm text-gray-600">Konselor Bimbingan Karir</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Online</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Info */}
        <Card>
          <CardHeader>
            <CardTitle>Layanan Konseling</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <MessageCircle className="w-5 h-5 text-blue-600" />
              <div>
                <h4 className="font-medium">Konsultasi Chat</h4>
                <p className="text-sm text-gray-600">Konsultasi via WhatsApp</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Phone className="w-5 h-5 text-green-600" />
              <div>
                <h4 className="font-medium">Konsultasi Telepon</h4>
                <p className="text-sm text-gray-600">Panggilan langsung</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <h4 className="font-medium">Jadwal Konseling</h4>
                <p className="text-sm text-gray-600">Senin - Jumat, 08:00 - 16:00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Topics */}
        <Card>
          <CardHeader>
            <CardTitle>Topik Konseling</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-blue-50 rounded text-center text-sm">Pemilihan Jurusan</div>
              <div className="p-2 bg-green-50 rounded text-center text-sm">Karir Masa Depan</div>
              <div className="p-2 bg-purple-50 rounded text-center text-sm">Motivasi Belajar</div>
              <div className="p-2 bg-orange-50 rounded text-center text-sm">Masalah Pribadi</div>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Button */}
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-base font-medium rounded-lg flex items-center justify-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Mulai Konseling via WhatsApp
          </Button>
        </a>

        {/* Contact Info */}
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600 mb-2">Atau hubungi langsung:</p>
            <a href="tel:+6281234567890" className="text-green-600 font-semibold text-lg">
              +62 812-3456-7890
            </a>
            <p className="text-xs text-gray-500 mt-1">Klik nomor untuk menelepon langsung</p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom padding */}
      <div className="h-6"></div>
    </div>
  )
}
