"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function CalendarWidget() {
  const [selectedDay, setSelectedDay] = useState(23)

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)
  const startOffset = 3 // May 2024 starts on Wednesday

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <h3 className="text-sm font-bold text-slate-900">Calendar</h3>
        <div className="flex items-center gap-1">
          <span className="text-xs font-bold text-slate-700 mr-2">May 2024</span>
          <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day) => (
          <span key={day} className="text-[11px] font-semibold text-slate-400 uppercase">
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs">
        {/* Empty slots for offset */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} className="h-8 w-8" />
        ))}

        {daysInMonth.map((day) => {
          const isSelected = day === selectedDay
          const isDeadline = [25, 28].includes(day)

          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`h-8 w-8 rounded-full flex items-center justify-center font-medium transition-all cursor-pointer ${
                isSelected
                  ? "bg-[#F59E0B] text-white font-extrabold shadow-md shadow-amber-200"
                  : isDeadline
                  ? "bg-amber-50 text-[#F59E0B] font-semibold"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}
