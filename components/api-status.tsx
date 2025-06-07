"use client"

import { type FC, useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"

interface ApiStatusProps {
  source?: string
}

export const ApiStatus: FC<ApiStatusProps> = ({ source }) => {
  const [status, setStatus] = useState<"checking" | "online" | "offline">("checking")

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        const response = await fetch("/api/health")
        if (response.ok) {
          setStatus(source === "fallback" ? "offline" : "online")
        } else {
          setStatus("offline")
        }
      } catch {
        setStatus("offline")
      }
    }

    checkApiStatus()
  }, [source])

  const getStatusConfig = () => {
    switch (status) {
      case "checking":
        return {
          icon: <Clock size={12} />,
          text: "Đang kiểm tra...",
          variant: "outline" as const,
          className: "text-gray-600",
        }
      case "online":
        return {
          icon: <CheckCircle size={12} />,
          text: "Thành công",
          variant: "outline" as const,
          className: "text-green-600 border-green-200",
        }
      case "offline":
        return {
          icon: <AlertCircle size={12} />,
          text: "Sử dụng dữ liệu demo",
          variant: "outline" as const,
          className: "text-orange-600 border-orange-200",
        }
    }
  }

  const config = getStatusConfig()

  return (
    <Badge variant={config.variant} className={`text-xs flex items-center gap-1 ${config.className}`}>
      {config.icon}
      {config.text}
    </Badge>
  )
}
