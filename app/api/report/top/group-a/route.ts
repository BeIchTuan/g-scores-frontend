import { type NextRequest, NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/config"

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching top students from external API...")

    const response = await fetch(`${API_BASE_URL}/api/reports/top/group-a`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(30000), 
    })

    console.log("Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error Response:", errorText)
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text()
      console.error("Non-JSON response:", responseText)
    }

    const data = await response.json()
    console.log("Successfully fetched top students from API")

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching top students:", error)
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Đã xảy ra lỗi." },
      { status: 500 }
    );
  }
}
