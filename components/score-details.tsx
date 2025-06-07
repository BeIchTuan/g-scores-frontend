import type { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ApiStatus } from "@/components/api-status"
import { Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ScoreDetailsProps {
  studentScore: any
}

export const ScoreDetails: FC<ScoreDetailsProps> = ({ studentScore }) => {
  let sbd: string, scores: any

  if (studentScore.data) {
    const { data } = studentScore
    sbd = data.sbd
    scores = data
  } else {
    sbd = studentScore.sbd || ""
    scores = studentScore.scores || studentScore
  }

  if (!sbd || !scores) {
    return (
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-red-500">Dữ liệu không hợp lệ</p>
          </CardContent>
        </Card>
      </div>
    )
  }

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
    if (score === null) return "bg-gray-100 text-gray-500"
    if (score >= 9) return "bg-green-100 text-green-800"
    if (score >= 8) return "bg-blue-100 text-blue-800"
    if (score >= 6.5) return "bg-yellow-100 text-yellow-800"
    if (score >= 5) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  const getScoreLabel = (score: number | null) => {
    if (score === null) return "—"
    if (score >= 9) return "Xuất sắc"
    if (score >= 8) return "Giỏi"
    if (score >= 6.5) return "Khá"
    if (score >= 5) return "Trung bình"
    return "Yếu"
  }

  const subjectsCount = Object.entries(scores).filter(
    ([key, value]) => key !== "sbd" && key !== "ma_ngoai_ngu" && value !== null,
  ).length

  const validScores = Object.entries(scores)
    .filter(([key, value]) => key !== "sbd" && key !== "ma_ngoai_ngu" && typeof value === "number")
    .map(([, value]) => value as number)

  const highestScore = validScores.length > 0 ? Math.max(...validScores) : 0
  const lowestScore = validScores.length > 0 ? Math.min(...validScores) : 0

  const chartData = {
    labels: Object.entries(scores)
      .filter(([key]) => key !== "sbd" && key !== "ma_ngoai_ngu")
      .map(([key]) => subjectNames[key] || key),
    datasets: [
      {
        label: "Điểm số",
        data: Object.entries(scores)
          .filter(([key]) => key !== "sbd" && key !== "ma_ngoai_ngu")
          .map(([, value]) => value),
        backgroundColor: Object.entries(scores)
          .filter(([key]) => key !== "sbd" && key !== "ma_ngoai_ngu")
          .map(([, value]) => {
            const score = value as number
            if (score === null) return "rgba(209, 213, 219, 0.5)" // gray-200
            if (score >= 9) return "rgba(34, 197, 94, 0.7)" // green-500
            if (score >= 8) return "rgba(59, 130, 246, 0.7)" // blue-500
            if (score >= 6.5) return "rgba(245, 158, 11, 0.7)" // amber-500
            if (score >= 5) return "rgba(249, 115, 22, 0.7)" // orange-500
            return "rgba(239, 68, 68, 0.7)" // red-500
          }),
        borderColor: Object.entries(scores)
          .filter(([key]) => key !== "sbd" && key !== "ma_ngoai_ngu")
          .map(([, value]) => {
            const score = value as number
            if (score === null) return "rgb(209, 213, 219)" // gray-200
            if (score >= 9) return "rgb(34, 197, 94)" // green-500
            if (score >= 8) return "rgb(59, 130, 246)" // blue-500
            if (score >= 6.5) return "rgb(245, 158, 11)" // amber-500
            if (score >= 5) return "rgb(249, 115, 22)" // orange-500
            return "rgb(239, 68, 68)" // red-500
          }),
        borderWidth: 1,
      },
    ],
  }

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const score = context.parsed.y
            if (score === null) return "Không thi"
            return `Điểm: ${score} - ${getScoreLabel(score)}`
          },
        },
      },
    },
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
            <div>
              <CardTitle className="text-xl md:text-2xl">Kết quả điểm thi</CardTitle>
              <CardDescription className="text-base">
                Số báo danh: <span className="font-medium">{sbd}</span> • Đã thi {subjectsCount} môn
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {scores.ma_ngoai_ngu && (
                <Badge variant="outline" className="text-xs w-fit">
                  Mã ngoại ngữ: {scores.ma_ngoai_ngu}
                </Badge>
              )}
              <ApiStatus source={(studentScore as any)?.source} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Biểu đồ điểm số */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Biểu đồ điểm số</h3>
            <div className="h-[300px] w-full">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Bảng điểm chi tiết */}
          <div className="max-w-2xl">
            <h3 className="text-lg font-medium mb-4">Điểm các môn</h3>
            <div className="space-y-4">
              {Object.entries(scores).map(([subject, score]) => {
                if (subject === "sbd" || subject === "ma_ngoai_ngu") return null
                const subjectName = subjectNames[subject] || subject

                return (
                  <div key={subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">{subjectName}</div>
                      {score !== null ? (
                        <div className="flex items-center gap-2">
                          <Badge className={getScoreColor(score)}>{score}</Badge>
                          <span className="text-xs text-gray-500">{getScoreLabel(score)}</span>
                        </div>
                      ) : (
                        <Badge variant="outline">Không thi</Badge>
                      )}
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      {score !== null && (
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${(score / 10) * 100}%` }}
                        />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Thêm card thông tin chi tiết */}
      {validScores.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Thông tin chi tiết</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-2">
                <div className="font-medium text-gray-700">Tổng số môn thi:</div>
                <div className="text-lg font-bold">{subjectsCount}/9 môn</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-gray-700">Điểm cao nhất:</div>
                <div className="text-lg font-bold text-green-600">{highestScore}</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-gray-700">Điểm thấp nhất:</div>
                <div className="text-lg font-bold text-red-600">{lowestScore}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
