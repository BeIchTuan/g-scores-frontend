"use client"

import { type FC, useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { TopStudent } from "@/types/student"
import { Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ApiStatus } from "@/components/api-status"
import { API_BASE_URL } from "@/lib/config"

export const TopStudents: FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [students, setStudents] = useState<TopStudent[]>([])
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<string>("")

  useEffect(() => {
    const fetchTopStudents = async () => {
      try {
        if (typeof window === "undefined") return;
        const response = await fetch(`${API_BASE_URL}/api/reports/top/group-a`)
        const result = await response.json()

        if (!result.success) {
          throw new Error(result.message || "Không thể tải danh sách học sinh xuất sắc")
        }

        setStudents(result.data)
        setSource(result.source || "api")
      } catch (err) {
        setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tải danh sách")
      } finally {
        setIsLoading(false)
      }
    }

    fetchTopStudents()
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

  const getScoreColor = (score: number | null) => {
    if (score === null) return ""
    if (score >= 9) return "bg-green-100 text-green-800"
    if (score >= 8) return "bg-blue-100 text-blue-800"
    if (score >= 6.5) return "bg-yellow-100 text-yellow-800"
    return "bg-orange-100 text-orange-800"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Học sinh xuất sắc khối A</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <span>Danh sách học sinh có điểm cao nhất khối A (Toán, Lý, Hóa)</span>
            <ApiStatus source={source} />
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">SBD</TableHead>
                  <TableHead>Toán</TableHead>
                  <TableHead>Vật lý</TableHead>
                  <TableHead>Hóa học</TableHead>
                  <TableHead>Ngữ văn</TableHead>
                  <TableHead>Ngoại ngữ</TableHead>
                  <TableHead>Sinh học</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.sbd}>
                    <TableCell className="font-medium">{student.sbd}</TableCell>
                    {["toan", "vat_li", "hoa_hoc", "ngu_van", "ngoai_ngu", "sinh_hoc"].map((subject) => (
                      <TableCell key={subject}>
                        {student[subject as keyof TopStudent] !== null ? (
                          <Badge className={getScoreColor(student[subject as keyof TopStudent] as number | null)}>
                            {(student[subject as keyof TopStudent] as number)}
                          </Badge>
                        ) : (
                          <Badge variant="outline">—</Badge>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
