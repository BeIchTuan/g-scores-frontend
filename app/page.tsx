"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { SearchScores } from "@/components/search-scores"
import { ScoreReport } from "@/components/score-report"
import { Settings } from "@/components/settings"
import { ScoreDetails } from "@/components/score-details"
import { Menu } from "lucide-react"
import type { StudentScore } from "@/types/student"
import { ErrorBoundary } from "@/components/error-boundary"

type ActiveView = "dashboard" | "search" | "reports" | "settings" | "details"

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("search")
  const [studentScore, setStudentScore] = useState<StudentScore | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleScoreFound = (score: StudentScore) => {
    setStudentScore(score)
    setActiveView("details")
    setSidebarOpen(false) // Đóng sidebar trên mobile sau khi tìm kiếm
  }

  const handleViewChange = (view: ActiveView) => {
    setActiveView(view)
    setSidebarOpen(false) // Đóng sidebar trên mobile sau khi chọn menu
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <Sidebar activeView={activeView} onChangeView={handleViewChange} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-1 rounded-md hover:bg-white/10" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-bold">G-Scores</h1>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <ErrorBoundary>
            {activeView === "dashboard" && (
              <div className="max-w-4xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold">Bảng điều khiển</h2>
                <p>Chào mừng đến với hệ thống tra cứu điểm G-Scores.</p>
              </div>
            )}

            {activeView === "search" && <SearchScores onScoreFound={handleScoreFound} />}

            {activeView === "reports" && <ScoreReport />}

            {activeView === "settings" && <Settings />}

            {activeView === "details" && studentScore && <ScoreDetails studentScore={studentScore} />}
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
