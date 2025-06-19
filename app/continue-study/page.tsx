import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ShoppingBasket, Award, CreditCard, User, Home } from "lucide-react"

export default function ContinueStudyPage() {
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
              <p className="text-blue-100 text-sm">Lanjut Studi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Page Title */}
        <div className="bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full py-3 px-6 text-center">
          <h1 className="text-white font-semibold text-lg">Lanjut Studi</h1>
        </div>

        {/* Hero Image */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 p-8 text-center relative min-h-[200px] flex items-center justify-center">
              <div className="absolute inset-0 bg-yellow-400 opacity-90"></div>
              <div className="relative z-10 space-y-4">
                <div className="flex justify-center items-center space-x-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="w-12 h-12 bg-black rounded-square flex items-center justify-center">
                    <div className="w-8 h-8 bg-yellow-600 rounded-sm"></div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-20 h-4 bg-orange-600 rounded-full"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Link href="/try-out" className="block">
            <Card className="hover:shadow-md transition-shadow h-24">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-2">
                  <ShoppingBasket className="w-5 h-5 text-red-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Try Out Online</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/class-guidance" className="block">
            <Card className="hover:shadow-md transition-shadow h-24">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Bimbingan Kelas</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/apply-class" className="block">
            <Card className="hover:shadow-md transition-shadow h-24">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center mb-2">
                  <CreditCard className="w-5 h-5 text-cyan-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Ajukan Kelas</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/continue-study-results" className="block">
            <Card className="hover:shadow-md transition-shadow h-24">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Hasil Survei</span>
              </CardContent>
            </Card>
          </Link>

          <Link href="/start-smart" className="block">
            <Card className="hover:shadow-md transition-shadow h-24">
              <CardContent className="p-4 flex flex-col items-center justify-center h-full text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">Start Smart</span>
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
