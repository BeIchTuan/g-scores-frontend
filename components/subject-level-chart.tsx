"use client"

import type { FC } from "react"
import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions, type ChartData } from "chart.js"
import type { ScoreLevelStats } from "@/types/report"

// Đăng ký các thành phần Chart.js cần thiết
ChartJS.register(ArcElement, Tooltip, Legend)

interface SubjectLevelChartProps {
  data: ScoreLevelStats
}

export const SubjectLevelChart: FC<SubjectLevelChartProps> = ({ data }) => {
  const { levels, total } = data

  const levelColors = {
    EXCELLENT: "#22c55e", // green-500
    GOOD: "#3b82f6", // blue-500
    AVERAGE: "#f59e0b", // amber-500
    BELOW_AVERAGE: "#ef4444", // red-500
  }

  const levelNames = {
    EXCELLENT: "Xuất sắc",
    GOOD: "Giỏi",
    AVERAGE: "Trung bình",
    BELOW_AVERAGE: "Yếu",
  }

  const chartData: ChartData<"pie"> = {
    labels: Object.keys(levels).map((level) => levelNames[level as keyof typeof levelNames]),
    datasets: [
      {
        data: Object.values(levels),
        backgroundColor: Object.keys(levels).map((level) => levelColors[level as keyof typeof levelColors]),
        borderColor: Object.keys(levels).map(() => "#ffffff"),
        borderWidth: 1,
      },
    ],
  }

  const chartOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ""
            const value = context.raw as number
            const percentage = ((value / total) * 100).toFixed(1)
            return `${label}: ${value.toLocaleString()} (${percentage}%)`
          },
        },
      },
    },
  }

  return (
    <div className="space-y-4">
      <div className="h-[200px] flex items-center justify-center">
        <Pie data={chartData} options={chartOptions} />
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {Object.entries(levels).map(([level, count]) => {
          const percentage = (count / total) * 100
          const levelName = levelNames[level as keyof typeof levelNames]
          const color = levelColors[level as keyof typeof levelColors]

          return (
            <div key={level} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
              <div className="flex-1 flex justify-between">
                <span>{levelName}</span>
                <span className="font-medium">{percentage.toFixed(1)}%</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
