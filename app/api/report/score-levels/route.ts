import { type NextRequest, NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/config"

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching score levels from external API...")

    const response = await fetch(`${API_BASE_URL}/reports/score-levels`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(30000), // 30 seconds
    })

    console.log("Response status:", response.status)
    console.log("Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error Response:", errorText)
    }

    const data = await response.json()
    console.log("Successfully fetched data from API")

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching score levels:", error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Đã xảy ra lỗi." },
      { status: 500 }
    );
  }
}
