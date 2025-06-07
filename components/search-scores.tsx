"use client"

import type React from "react"
import { type FC, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Search } from "lucide-react"
import type { StudentScore } from "@/types/student"
import { API_BASE_URL } from "@/lib/config"

interface SearchScoresProps {
  onScoreFound: (score: StudentScore) => void
}

export const SearchScores: FC<SearchScoresProps> = ({ onScoreFound }) => {
  const [registrationNumber, setRegistrationNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!registrationNumber.trim()) {
      setError("Vui lòng nhập số báo danh")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/students/score/${registrationNumber}`);
      const result = await response.json()

      if (!result.success) {
        throw new Error(result.message || "Không tìm thấy thông tin điểm")
      }

      onScoreFound(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi khi tra cứu điểm")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl md:text-2xl">Tra cứu điểm</CardTitle>
          <CardDescription>Nhập số báo danh để tra cứu điểm thi</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  placeholder="Nhập số báo danh (VD: 01000002)"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                  className="pl-10 h-12 text-base"
                  maxLength={8}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white hover:bg-gray-800 h-12 px-6 sm:px-8"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang tra cứu...
                  </>
                ) : (
                  "Tra cứu"
                )}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
