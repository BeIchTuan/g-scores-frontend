"use client"

import type React from "react"
import type { FC } from "react"
import { BarChart3, Home, Search, Settings, X } from "lucide-react"

type ActiveView = "dashboard" | "search" | "reports" | "settings" | "details"

interface SidebarProps {
  activeView: ActiveView
  onChangeView: (view: ActiveView) => void
  onClose?: () => void
}

export const Sidebar: FC<SidebarProps> = ({ activeView, onChangeView, onClose }) => {
  return (
    <aside className="sidebar w-64 h-full flex flex-col text-gray-800 shadow-lg">
      <div className="p-4 md:p-6 flex justify-between items-center">
        <div className="font-bold text-xl">Menu</div>
        {onClose && (
          <button className="lg:hidden p-1 rounded-md hover:bg-black/10" onClick={onClose}>
            <X size={20} />
          </button>
        )}
      </div>

      <nav className="flex flex-col flex-1 px-2">
        <SidebarItem
          icon={<Home size={20} />}
          label="Dashboard"
          active={activeView === "dashboard"}
          onClick={() => onChangeView("dashboard")}
        />
        <SidebarItem
          icon={<Search size={20} />}
          label="Tra cứu điểm"
          active={activeView === "search" || activeView === "details"}
          onClick={() => onChangeView("search")}
        />
        <SidebarItem
          icon={<BarChart3 size={20} />}
          label="Báo cáo"
          active={activeView === "reports"}
          onClick={() => onChangeView("reports")}
        />
        <SidebarItem
          icon={<Settings size={20} />}
          label="Cài đặt"
          active={activeView === "settings"}
          onClick={() => onChangeView("settings")}
        />
      </nav>
    </aside>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}

const SidebarItem: FC<SidebarItemProps> = ({ icon, label, active, onClick }) => {
  return (
    <button
      className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors text-left ${
        active ? "bg-black/10 font-medium" : "hover:bg-black/5"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  )
}
