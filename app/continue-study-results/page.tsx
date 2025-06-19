"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BarChart3, Users, RefreshCw } from "lucide-react"
import { getContinueStudySurveyResults, type ContinueStudySurveyResponse } from "@/lib/supabase-continue-study"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface ChartData {
  name: string
  value: number
  percentage: number
  color: string
}

const COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899"]

export default function ContinueStudyResultsPage() {
  const [surveyData, setSurveyData] = useState<ContinueStudySurveyResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchSurveyData()
  }, [])

  const fetchSurveyData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const data = await getContinueStudySurveyResults()
      setSurveyData(data || [])
    } catch (error) {
      console.error("Error fetching survey data:", error)
      // Handle the case where table doesn't exist yet
      if (error instanceof Error && error.message.includes("does not exist")) {
        setSurveyData([])
      }
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const calculatePercentages = (data: Record<string, number>, total: number): ChartData[] => {
    return Object.entries(data)
      .map(([key, value], index) => ({
        name: formatLabel(key),
        value,
        percentage: Math.round((value / total) * 100),
        color: COLORS[index % COLORS.length],
      }))
      .sort((a, b) => b.value - a.value)
  }

  const formatLabel = (key: string): string => {
    const labelMap: Record<string, string> = {
      universitas: "Universitas",
      "sekolah-vokasi-politeknik": "Sekolah Vokasi/Politeknik",
      akademi: "Akademi",
      lainnya: "Lainnya",
      "sains-dan-teknologi": "Sains dan Teknologi",
      "sosial-dan-humaniora": "Sosial dan Humaniora",
      "bisnis-dan-ekonomi": "Bisnis dan Ekonomi",
      kesehatan: "Kesehatan",
      "seni-dan-desain": "Seni dan Desain",
      "ya-sudah": "Ya, Sudah",
      "belum-masih-mencari-informasi": "Belum, Masih Mencari Info",
      "belum-memikirkannya": "Belum Memikirkan",
      "biaya-pendidikan": "Biaya Pendidikan",
      "persaingan-masuk-perguruan-tinggi": "Persaingan Masuk PT",
      "kurangnya-informasi-program-studi": "Kurang Informasi Prodi",
    }
    return labelMap[key] || key.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const getChartData = (field: keyof ContinueStudySurveyResponse): ChartData[] => {
    if (surveyData.length === 0) return []

    const counts: Record<string, number> = {}
    surveyData.forEach((response) => {
      const value = response[field] as string
      if (value) {
        counts[value] = (counts[value] || 0) + 1
      }
    })

    return calculatePercentages(counts, surveyData.length)
  }

  const renderPieChart = (data: ChartData[], title: string) => (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Belum ada data</p>
        ) : (
          <div className="space-y-4">
            <ChartContainer
              config={{
                value: {
                  label: "Jumlah",
                },
              }}
              className="h-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={2} dataKey="value">
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            <div className="space-y-2">
              {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{item.percentage}%</span>
                    <span className="text-gray-500">({item.value})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat hasil survei...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/continue-study">
              <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Hasil Survei Lanjut Studi</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white"
            onClick={() => fetchSurveyData(true)}
            disabled={refreshing}
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <div className="p-4">
        {/* Summary Statistics */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4" />
              Ringkasan Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{surveyData.length}</p>
                <p className="text-sm text-gray-600">Total Responden</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {surveyData.length > 0 ? new Date(surveyData[0].created_at!).toLocaleDateString("id-ID") : "-"}
                </p>
                <p className="text-sm text-gray-600">Respons Terakhir</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {surveyData.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Setup Database</h3>
              <p className="text-gray-500 mb-4">
                Database tabel belum dibuat. Jalankan script SQL terlebih dahulu untuk membuat tabel survei.
              </p>
              <div className="bg-gray-100 p-3 rounded-lg mb-4">
                <p className="text-xs text-gray-600 font-mono">
                  Jalankan: scripts/create-continue-study-survey-table.sql
                </p>
              </div>
              <Link href="/continue-study-survey">
                <Button className="bg-orange-600 hover:bg-orange-700">Isi Survei Sekarang</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {renderPieChart(getChartData("jenis_pendidikan_tinggi"), "Jenis Pendidikan Tinggi yang Diminati")}
            {renderPieChart(getChartData("bidang_studi"), "Bidang Studi yang Diminati")}
            {renderPieChart(getChartData("sudah_memilih_pt"), "Status Pemilihan Perguruan Tinggi")}
            {renderPieChart(getChartData("tantangan_terbesar"), "Tantangan Terbesar")}

            <Link href="/continue-study-survey" className="block">
              <Button className="w-full bg-orange-600 hover:bg-orange-700">Isi Survei Baru</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
