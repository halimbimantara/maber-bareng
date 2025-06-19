import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ShoppingBasket, Award, CreditCard, Home, BarChart3, Building } from "lucide-react"

export default function SelfDevelopmentPage() {
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
              <p className="text-blue-100 text-sm">Pengembangan Diri</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full py-3 px-6 text-center">
          <h1 className="text-white font-semibold text-lg">Pengembangan Diri</h1>
        </div>

        {/* Hero Image */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 text-center relative min-h-[200px] flex items-center justify-center">
              <div className="absolute inset-0 bg-white opacity-95"></div>
              <div className="relative z-10 space-y-4">
                <div className="flex justify-center items-center space-x-6">
                  {/* Notebook */}
                  <div className="w-16 h-20 bg-gray-300 rounded-sm border-l-4 border-gray-400 relative">
                    <div className="absolute top-2 left-2 right-2 space-y-1">
                      <div className="h-1 bg-gray-400 rounded"></div>
                      <div className="h-1 bg-gray-400 rounded"></div>
                      <div className="h-1 bg-gray-400 rounded"></div>
                    </div>
                  </div>

                  {/* Coffee Cup */}
                  <div className="w-12 h-12 bg-teal-400 rounded-full relative">
                    <div className="absolute top-2 left-2 right-2 bottom-4 bg-teal-500 rounded-full"></div>
                    <div className="absolute -right-2 top-3 w-3 h-6 border-2 border-teal-400 rounded-r-full"></div>
                  </div>

                  {/* Pen */}
                  <div className="w-1 h-16 bg-blue-600 rounded-full"></div>
                </div>

                {/* Desk surface */}
                <div className="w-32 h-2 bg-gray-300 rounded-full mx-auto"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          {/* First 4 cards in 2x2 grid */}
          <Link href="/seminar" className="block">
            <Card className="hover:shadow-md transition-shadow h-24">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-2">
                  <ShoppingBasket className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Seminar</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/class-guidance-dev" className="block">
            <Card className="hover:shadow-md transition-shadow h-24">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Pelatihan & Pengembangan</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/apply-class-dev" className="block">
            <Card className="hover:shadow-md transition-shadow h-24">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mb-2">
                  <CreditCard className="w-5 h-5 text-cyan-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Ajukan Kelas</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/self-development-results" className="block">
            <Card className="hover:shadow-md transition-shadow h-24">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Hasil Survei</span>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Internship card - full width */}
        <div className="col-span-2 mt-4">
          <Link href="/internship" className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-center text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Building className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-base font-medium text-gray-800">Program Belajar Magang</span>
              </CardContent>
            </Card>
          </Link>
        </div>
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
