"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ArrowLeft, User, CheckCircle } from "lucide-react"

export default function PersonalDataPage() {
  const router = useRouter()
  const [personalData, setPersonalData] = useState({
    namaSiswa: "",
    email: "",
    kelas: "",
    noTelepon: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setPersonalData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveData = () => {
    // Save to localStorage
    localStorage.setItem("personalData", JSON.stringify(personalData))

    // Redirect back to menu with success indicator
    router.push("/menu?dataSet=true")
  }

  const isFormValid = () => {
    return (
      personalData.namaSiswa.trim() &&
      personalData.email.trim() &&
      personalData.kelas.trim() &&
      personalData.noTelepon.trim()
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-4">
        <div className="flex items-center gap-3">
          <Link href="/menu">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <p className="text-yellow-400 text-sm font-medium">Setup Profil</p>
            <div className="flex items-center gap-2 mt-1">
              <User className="w-4 h-4" />
              <span className="font-medium">Data Pribadi</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-blue-600 text-white px-4 py-2">
        <h2 className="font-semibold">Lengkapi Data Pribadi</h2>
      </div>

      {/* Content */}
      <div className="p-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <User className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Data Pribadi</h2>
              <p className="text-sm text-gray-600">
                Lengkapi data pribadi Anda untuk mempermudah pengisian survey dan formulir selanjutnya
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="nama-siswa" className="text-base font-medium text-gray-800">
                  Nama Siswa <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nama-siswa"
                  value={personalData.namaSiswa}
                  onChange={(e) => handleInputChange("namaSiswa", e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-base font-medium text-gray-800">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={personalData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Masukkan email"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="kelas" className="text-base font-medium text-gray-800">
                  Kelas <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="kelas"
                  value={personalData.kelas}
                  onChange={(e) => handleInputChange("kelas", e.target.value)}
                  placeholder="Contoh: XII IPA 1"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="no-telepon" className="text-base font-medium text-gray-800">
                  No. Telepon <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="no-telepon"
                  type="tel"
                  value={personalData.noTelepon}
                  onChange={(e) => handleInputChange("noTelepon", e.target.value)}
                  placeholder="Masukkan nomor telepon"
                  className="mt-2"
                  required
                />
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <Button
                onClick={handleSaveData}
                disabled={!isFormValid()}
                className="w-full bg-blue-600 hover:bg-blue-700 py-3"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Simpan Data Pribadi
              </Button>

              {!isFormValid() && (
                <p className="text-sm text-gray-500 text-center">Silakan lengkapi semua field yang wajib diisi</p>
              )}

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">💡 Informasi</h3>
                <p className="text-sm text-blue-700">
                  Data pribadi ini akan otomatis mengisi form survey dan aplikasi kelas, sehingga Anda tidak perlu
                  mengetik ulang informasi yang sama.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom padding */}
      <div className="h-6"></div>
    </div>
  )
}
