"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  BookOpen,
  Users,
  Briefcase,
  GraduationCap,
  Target,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function MenuPage() {
  const searchParams = useSearchParams()
  const [hasPersonalData, setHasPersonalData] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  useEffect(() => {
    // Check if personal data exists
    const personalData = localStorage.getItem("personalData")
    setHasPersonalData(!!personalData)

    // Show success alert if data was just set
    if (searchParams.get("dataSet") === "true") {
      setShowSuccessAlert(true)
      setTimeout(() => setShowSuccessAlert(false), 5000)
    }
  }, [searchParams])

  const menuItems = [
    {
      title: "Survei Minat Bakat",
      description: "Temukan minat dan bakat Anda melalui survei komprehensif",
      icon: Target,
      href: "/survey",
      color: "bg-purple-600",
      requiresPersonalData: true,
    },
    {
      title: "Lanjut Studi",
      description: "Panduan dan informasi untuk melanjutkan pendidikan tinggi",
      icon: GraduationCap,
      href: "/continue-study",
      color: "bg-orange-600",
      requiresPersonalData: false,
    },
    {
      title: "Pengembangan Diri",
      description: "Program pengembangan keterampilan dan soft skills",
      icon: Users,
      href: "/self-development",
      color: "bg-cyan-600",
      requiresPersonalData: false,
    },
    {
      title: "Bimbingan Kelas",
      description: "Bimbingan belajar untuk berbagai mata pelajaran",
      icon: BookOpen,
      href: "/class-guidance",
      color: "bg-green-600",
      requiresPersonalData: false,
    },
    {
      title: "Konseling",
      description: "Layanan konseling akademik dan karir",
      icon: Users,
      href: "/counseling",
      color: "bg-blue-600",
      requiresPersonalData: false,
    },
    {
      title: "Magang",
      description: "Informasi dan pendaftaran program magang",
      icon: Briefcase,
      href: "/internship",
      color: "bg-red-600",
      requiresPersonalData: false,
    },
  ]

  const handleMenuClick = (item: any, e: React.MouseEvent) => {
    if (item.requiresPersonalData && !hasPersonalData) {
      e.preventDefault()
      // Redirect to personal data page first
      window.location.href = "/personal-data"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white p-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <p className="text-yellow-400 text-sm font-medium">Bimbingan Konseling</p>
            <h1 className="text-lg font-semibold">Menu Utama</h1>
          </div>
        </div>
      </div>

      {/* Success Alert */}
      {showSuccessAlert && (
        <Alert className="mx-4 mt-4 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Data pribadi berhasil disimpan! Sekarang Anda dapat mengisi survey dengan lebih mudah.
          </AlertDescription>
        </Alert>
      )}

      {/* Personal Data Status */}
      <div className="p-4">
        <Card className={`mb-4 ${hasPersonalData ? "border-green-200 bg-green-50" : "border-orange-200 bg-orange-50"}`}>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              {hasPersonalData ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-600" />
              )}
              <div className="flex-1">
                <h3 className={`font-medium ${hasPersonalData ? "text-green-800" : "text-orange-800"}`}>
                  {hasPersonalData ? "Data Pribadi Lengkap" : "Data Pribadi Belum Lengkap"}
                </h3>
                <p className={`text-sm ${hasPersonalData ? "text-green-700" : "text-orange-700"}`}>
                  {hasPersonalData
                    ? "Data pribadi Anda sudah tersimpan dan siap digunakan untuk survey"
                    : "Lengkapi data pribadi untuk mempermudah pengisian survey"}
                </p>
              </div>
              {!hasPersonalData && (
                <Link href="/personal-data">
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    <User className="w-4 h-4 mr-1" />
                    Lengkapi
                  </Button>
                </Link>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 gap-4">
          {menuItems.map((item, index) => (
            <Link key={index} href={item.href} onClick={(e) => handleMenuClick(item, e)}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`${item.color} p-3 rounded-lg`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {item.title}
                        {item.requiresPersonalData && !hasPersonalData && (
                          <span className="ml-2 text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                            Perlu Data Pribadi
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-6"></div>
    </div>
  )
}
