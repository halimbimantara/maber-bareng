"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BarChart3, Users, Calendar, RefreshCw } from "lucide-react"
import { supabase, type SurveyResponse } from "@/lib/supabase"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface ChartData {
  name: string
  value: number
  percentage: number
  color: string
}

interface SurveyStats {
  totalResponses: number
  rencanaSetelahLulus: ChartData[]
  tujuanKarir: ChartData[]
  faktorUtama: ChartData[]
  informasiBimbingan: ChartData[]
  dukunganDibutuhkan: ChartData[]
  kesiapanMenghadapi: ChartData[]
}

const COLORS = {
  primary: ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6", "#EC4899", "#06B6D4"],
  secondary: ["#DBEAFE", "#FEE2E2", "#D1FAE5", "#FEF3C7", "#EDE9FE", "#FCE7F3", "#CFFAFE"],
}

export default function ResultsPage() {
  const [surveyData, setSurveyData] = useState<SurveyResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [stats, setStats] = useState<SurveyStats>({
    totalResponses: 0,
    rencanaSetelahLulus: [],
    tujuanKarir: [],
    faktorUtama: [],
    informasiBimbingan: [],
    dukunganDibutuhkan: [],
    kesiapanMenghadapi: [],
  })

  useEffect(() => {
    fetchSurveyData()
  }, [])

  const fetchSurveyData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const { data, error } = await supabase
        .from("survey_responses")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error

      setSurveyData(data || [])
      calculateStats(data || [])
    } catch (error) {
      console.error("Error fetching survey data:", error)
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
        color: COLORS.primary[index % COLORS.primary.length],
      }))
      .sort((a, b) => b.value - a.value)
  }

  const formatLabel = (key: string): string => {
    const labelMap: Record<string, string> = {
      "perguruan-tinggi": "Perguruan Tinggi",
      bekerja: "Langsung Bekerja",
      wirausaha: "Berwirausaha",
      lainnya: "Lainnya",
      "ya-jelas": "Ya, Sudah Jelas",
      "masih-belum-pasti": "Masih Belum Pasti",
      "belum-memikirkannya": "Belum Memikirkan",
      "minat-pribadi": "Minat Pribadi",
      "saran-orangtua": "Saran Orang Tua",
      "peluang-karir": "Peluang Karir",
      "kondisi-finansial": "Kondisi Finansial",
      "ya-cukup": "Ya, Cukup",
      kurang: "Kurang",
      "tidak-sama-sekali": "Tidak Sama Sekali",
      "bimbingan-karir": "Bimbingan Karir",
      "informasi-perguruan-tinggi": "Info Perguruan Tinggi",
      "bantuan-finansial": "Bantuan Finansial",
      "pelatihan-keterampilan": "Pelatihan Keterampilan",
      "sangat-siap": "Sangat Siap",
      "cukup-siap": "Cukup Siap",
      "kurang-siap": "Kurang Siap",
      "tidak-siap-sama-sekali": "Tidak Siap",
    }
    return labelMap[key] || key.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  const calculateStats = (data: SurveyResponse[]) => {
    if (data.length === 0) {
      setStats({
        totalResponses: 0,
        rencanaSetelahLulus: [],
        tujuanKarir: [],
        faktorUtama: [],
        informasiBimbingan: [],
        dukunganDibutuhkan: [],
        kesiapanMenghadapi: [],
      })
      return
    }

    const total = data.length

    // Calculate counts for each question
    const rencanaCount: Record<string, number> = {}
    const tujuanCount: Record<string, number> = {}
    const faktorCount: Record<string, number> = {}
    const informasiCount: Record<string, number> = {}
    const dukunganCount: Record<string, number> = {}
    const kesiapanCount: Record<string, number> = {}

    data.forEach((response) => {
      if (response.rencana_setelah_lulus) {
        rencanaCount[response.rencana_setelah_lulus] = (rencanaCount[response.rencana_setelah_lulus] || 0) + 1
      }
      if (response.tujuan_karir) {
        tujuanCount[response.tujuan_karir] = (tujuanCount[response.tujuan_karir] || 0) + 1
      }
      if (response.faktor_utama) {
        faktorCount[response.faktor_utama] = (faktorCount[response.faktor_utama] || 0) + 1
      }
      if (response.informasi_bimbingan) {
        informasiCount[response.informasi_bimbingan] = (informasiCount[response.informasi_bimbingan] || 0) + 1
      }
      if (response.dukungan_dibutuhkan) {
        dukunganCount[response.dukungan_dibutuhkan] = (dukunganCount[response.dukungan_dibutuhkan] || 0) + 1
      }
      if (response.kesiapan_menghadapi) {
        kesiapanCount[response.kesiapan_menghadapi] = (kesiapanCount[response.kesiapan_menghadapi] || 0) + 1
      }
    })

    setStats({
      totalResponses: total,
      rencanaSetelahLulus: calculatePercentages(rencanaCount, total),
      tujuanKarir: calculatePercentages(tujuanCount, total),
      faktorUtama: calculatePercentages(faktorCount, total),
      informasiBimbingan: calculatePercentages(informasiCount, total),
      dukunganDibutuhkan: calculatePercentages(dukunganCount, total),
      kesiapanMenghadapi: calculatePercentages(kesiapanCount, total),
    })
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

            {/* Legend with percentages */}
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

  const renderBarChart = (data: ChartData[], title: string) => (
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
          <ChartContainer
            config={{
              percentage: {
                label: "Persentase",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} interval={0} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="percentage" fill="var(--color-percentage)" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data survei...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/menu">
              <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Hasil Survei & Analytics</h1>
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
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{stats.totalResponses}</p>
                <p className="text-sm text-gray-600">Total Responden</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {surveyData.length > 0 ? new Date(surveyData[0].created_at!).toLocaleDateString("id-ID") : "-"}
                </p>
                <p className="text-sm text-gray-600">Respons Terakhir</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {stats.totalResponses === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Belum Ada Data Survei</h3>
              <p className="text-gray-500 mb-6">Mulai dengan mengisi survei untuk melihat hasil analytics</p>
              <Link href="/survey">
                <Button className="bg-blue-600 hover:bg-blue-700">Isi Survei Sekarang</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Charts */}
            {renderPieChart(stats.rencanaSetelahLulus, "Rencana Setelah Lulus SMA")}
            {renderBarChart(stats.tujuanKarir, "Kejelasan Tujuan Karir")}
            {renderPieChart(stats.faktorUtama, "Faktor Utama Mempengaruhi Rencana")}
            {renderBarChart(stats.informasiBimbingan, "Kecukupan Informasi & Bimbingan")}
            {renderPieChart(stats.dukunganDibutuhkan, "Dukungan yang Dibutuhkan")}
            {renderBarChart(stats.kesiapanMenghadapi, "Kesiapan Menghadapi Masa Depan")}

            {/* Recent Responses Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Respons Terbaru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {surveyData.slice(0, 3).map((response) => (
                    <div key={response.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium text-gray-800">{response.nama_siswa}</h4>
                        <span className="text-xs text-gray-500">
                          {response.created_at ? new Date(response.created_at).toLocaleDateString("id-ID") : ""}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{response.kelas}</p>
                      <p className="text-sm text-gray-700 mt-1">{formatLabel(response.rencana_setelah_lulus || "")}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link href="/survey" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Isi Survei Baru</Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Bottom padding */}
      <div className="h-6"></div>
    </div>
  )
}
