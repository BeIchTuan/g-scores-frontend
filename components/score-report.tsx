"use client"

import { type FC, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ScoreLevelStats } from "@/types/report"
import { TopStudents } from "@/components/top-students"
import { SubjectLevelChart } from "@/components/subject-level-chart"
import { Loader2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const ScoreReport: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<ScoreLevelStats[]>([])
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (typeof window === "undefined") return;
      const response = await fetch("/api/report/score-levels")
      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Không thể tải dữ liệu báo cáo")
      }

      setStats(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải báo cáo")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const subjectNames: Record<string, string> = {
    toan: "Toán",
    ngu_van: "Ngữ văn",
    ngoai_ngu: "Ngoại ngữ",
    vat_li: "Vật lý",
    hoa_hoc: "Hóa học",
    sinh_hoc: "Sinh học",
    lich_su: "Lịch sử",
    dia_li: "Địa lý",
    gdcd: "GDCD",
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <Tabs defaultValue="stats" className="w-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <TabsList className="grid w-full sm:w-auto grid-cols-2">
            <TabsTrigger value="stats">Thống kê điểm</TabsTrigger>
            <TabsTrigger value="top">Học sinh xuất sắc</TabsTrigger>
          </TabsList>

          <Button variant="outline" size="sm" onClick={fetchStats} disabled={isLoading} className="w-full sm:w-auto">
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Làm mới
          </Button>
        </div>

        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">Thống kê điểm theo môn học</CardTitle>
              <CardDescription>Phân bố điểm theo các mức: Xuất sắc, Giỏi, Trung bình, Yếu</CardDescription>
              {stats.length > 0 && (
                <div className="mt-2">
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Đang tải dữ liệu...</p>
                  </div>
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500 mb-4">{error}</p>
                  <Button onClick={fetchStats} variant="outline">
                    Thử lại
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                  {stats.map((stat) => (
                    <Card key={stat.subject} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base md:text-lg">
                          {subjectNames[stat.subject] || stat.subject}
                        </CardTitle>
                        <CardDescription className="text-sm">Tổng số: {stat.total.toLocaleString()}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <SubjectLevelChart data={stat} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top" className="mt-6">
          <TopStudents />
        </TabsContent>
      </Tabs>
    </div>
  )
}
