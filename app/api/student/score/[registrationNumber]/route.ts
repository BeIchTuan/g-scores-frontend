import { type NextRequest, NextResponse } from "next/server"
import { API_BASE_URL } from "@/lib/config"

export async function GET(request: NextRequest, { params }: { params: { registrationNumber: string } }) {
  try {
    const { registrationNumber } = params

    console.log("Fetching student score for:", registrationNumber)

    const response = await fetch(
      `${API_BASE_URL}/students/score/${registrationNumber}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(30000), 
      },
    )
    console.log(`Calling API: ${API_BASE_URL}/students/score/${registrationNumber}`)

    console.log("Response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("API Error Response:", errorText)

      if (response.status === 404) {
        return NextResponse.json(
          {
            success: false,
            message: "Không tìm thấy thông tin điểm cho số báo danh này",
          },
          { status: 404 },
        )
      }

      return NextResponse.json(
        {
          success: false,
          message: "Lỗi khi lấy dữ liệu từ API",
        },
        { status: response.status },
      )
    }

    const contentType = response.headers.get("content-type")
    if (!contentType || !contentType.includes("application/json")) {
      const responseText = await response.text()
      console.error("Non-JSON response:", responseText)

      return NextResponse.json(
        {
          success: false,
          message: "Định dạng dữ liệu không hợp lệ",
        },
        { status: 500 },
      )
    }

    const data = await response.json()
    console.log("Successfully fetched student data from API")

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching student score:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Lỗi hệ thống khi lấy dữ liệu",
      },
      { status: 500 },
    )
  }
}