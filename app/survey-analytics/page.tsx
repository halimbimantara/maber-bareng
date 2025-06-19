"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, TrendingUp } from "lucide-react"
import { supabase, type SurveyResponse } from "@/lib/supabase"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

interface TrendData {
  date: string
  count: number
  cumulative: number
}

export default function SurveyAnalyticsPage() {
  const [surveyData, setSurveyData] = useState<SurveyResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [trendData, setTrendData] = useState<TrendData[]>([])

  useEffect(() => {
    fetchSurveyData()
  }, [])

  const fetchSurveyData = async () => {
    try {
      const { data, error } = await supabase
        .from("survey_responses")
        .select("*")
        .order("created_at", { ascending: true })

      if (error) throw error

      setSurveyData(data || [])
      calculateTrends(data || [])
    } catch (error) {
      console.error("Error fetching survey data:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateTrends = (data: SurveyResponse[]) => {
    if (data.length === 0) return

    const dailyCounts: Record<string, number> = {}

    data.forEach((response) => {
      if (response.created_at) {
        const date = new Date(response.created_at).toLocaleDateString("id-ID")
        dailyCounts[date] = (dailyCounts[date] || 0) + 1
      }
    })

    let cumulative = 0
    const trends: TrendData[] = Object.entries(dailyCounts).map(([date, count]) => {
      cumulative += count
      return {
        date,
        count,
        cumulative,
      }
    })

    setTrendData(trends)
  }

  const exportData = () => {
    const csvContent = [
      ["Nama", "Email", "Kelas", "No. Telepon", "Rencana", "Tujuan Karir", "Faktor Utama", "Tanggal"].join(","),
      ...surveyData.map((row) =>
        [
          row.nama_siswa,
          row.email,
          row.kelas,
          row.no_telepon,
          row.rencana_setelah_lulus,
          row.tujuan_karir,
          row.faktor_utama,
          row.created_at ? new Date(row.created_at).toLocaleDateString("id-ID") : "",
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `survey-results-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat analytics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-black text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/results">
              <Button variant="ghost" size="icon" className="text-white">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-semibold">Analytics Lanjutan</h1>
          </div>
          <Button variant="ghost" size="icon" className="text-white" onClick={exportData}>
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Tren Respons Survei
            </CardTitle>
          </CardHeader>
          <CardContent>
            {trendData.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Belum ada data trend</p>
            ) : (
              <ChartContainer
                config={{
                  count: {
                    label: "Respons Harian",
                    color: "hsl(var(--chart-1))",
                  },
                  cumulative: {
                    label: "Total Kumulatif",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[300px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="var(--color-count)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-count)" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="cumulative"
                      stroke="var(--color-cumulative)"
                      strokeWidth={2}
                      dot={{ fill: "var(--color-cumulative)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* Class Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Distribusi per Kelas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(
                surveyData.reduce(
                  (acc, curr) => {
                    acc[curr.kelas] = (acc[curr.kelas] || 0) + 1
                    return acc
                  },
                  {} as Record<string, number>,
                ),
              )
                .sort(([, a], [, b]) => b - a)
                .map(([kelas, count]) => (
                  <div key={kelas} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{kelas}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(count / surveyData.length) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
