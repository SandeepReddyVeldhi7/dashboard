"use client";

import { ChevronLeft, ChevronRight, Plus, Video, Calendar as CalendarIcon, Filter, MoreHorizontal, ChevronDown } from "lucide-react";
import dayjs, { Dayjs } from "dayjs";
import { CalendarView } from "@/hooks/useCalendar";
import { Menu } from "@base-ui/react/menu";

const VIEW_OPTIONS: { label: string; value: CalendarView }[] = [
  { label: "Day", value: "day" },
  { label: "Work week", value: "work-week" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

interface CalendarHeaderProps {
  view: CalendarView;
  label: string;
  onViewChange: (v: CalendarView) => void;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onDateSelect: (date: Dayjs) => void;
  onNewEvent: () => void;
  onMeetNow: () => void;
}

export default function CalendarHeader({
  view,
  label,
  onViewChange,
  onPrev,
  onNext,
  onToday,
  onDateSelect,
  onNewEvent,
  onMeetNow,
}: CalendarHeaderProps) {
  return (
    <header className="h-14 flex items-center justify-between px-4 bg-[#1f1f1f] border-b border-[#292929] flex-shrink-0 text-text-primary">

      {/* Left side: Navigation & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToday}
          className="px-3 py-1.5 rounded-md hover:bg-[#292929] text-sm font-medium transition tracking-wide"
        >
          Today
        </button>

        <div className="flex flex-col items-center">
          <Menu.Root>
            <Menu.Trigger className="flex items-center gap-1.5 text-base font-semibold tracking-wide ml-1 hover:bg-[#292929] px-2 py-1 rounded transition cursor-pointer outline-none group">
              {label}
              <ChevronDown size={14} className="text-text-muted transition-transform group-data-[state=open]:rotate-180" />
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner align="start" sideOffset={8}>
                <Menu.Popup className="bg-[#1f1f1f] border border-[#3d3d3d] rounded-lg shadow-2xl p-4 z-50 flex gap-6 text-white min-w-[480px]">

                  {/* Left Pane: Month Calendar */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold text-sm">March 2026</span>
                      <div className="flex gap-2 text-text-muted">
                        <button className="hover:text-white transition"><ChevronLeft size={16} /></button>
                        <button className="hover:text-white transition"><ChevronRight size={16} /></button>
                      </div>
                    </div>
                    {/* Tiny representation of the grid */}
                    <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
                      {["S", "M", "T", "W", "T", "F", "S"].map(d => <div key={d} className="text-text-muted">{d}</div>)}
                      {Array.from({ length: 31 }).map((_, i) => (
                        <div key={i}
                             onClick={() => onDateSelect(dayjs().date(i + 1))}
                             className={`h-8 w-8 mx-auto flex items-center justify-center rounded-full hover:bg-[#292929] cursor-pointer transition ${i + 1 === dayjs().date() ? "bg-[#5b5fc7] font-semibold text-white" : ""}`}>
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Pane: Year & Months */}
                  <div className="flex-1 border-l border-[#3d3d3d] pl-6 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-semibold text-sm">2026</span>
                      <div className="flex gap-2 text-text-muted">
                        <button className="hover:text-white transition"><ChevronLeft size={16} /></button>
                        <button className="hover:text-white transition"><ChevronRight size={16} /></button>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => (
                        <div key={m} className={`h-8 flex items-center justify-center rounded cursor-pointer transition ${m === "Mar" ? "bg-[#5b5fc7] font-semibold" : "hover:bg-[#292929]"}`}>
                          {m}
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto text-right text-xs pt-4">
                      <button className="hover:text-brand font-medium transition cursor-pointer">Today</button>
                    </div>
                  </div>

                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
        </div>
      </div>

      {/* Right side: View Switcher, Actions, New Button */}
      <div className="flex items-center gap-2">

        {/* View Switcher Dropdown */}
        <Menu.Root>
          <Menu.Trigger className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-[#292929] text-sm font-medium transition cursor-pointer outline-none">
            <CalendarIcon size={14} />
            {VIEW_OPTIONS.find((o) => o.value === view)?.label}
            <ChevronDown size={14} className="text-text-muted" />
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner align="end" sideOffset={4}>
              <Menu.Popup className="w-40 bg-[#292929] border border-[#3d3d3d] rounded-lg shadow-xl p-1 z-50">
                {VIEW_OPTIONS.map((opt) => (
                  <Menu.Item
                    key={opt.value}
                    onClick={() => onViewChange(opt.value)}
                  >
                    <div className={`flex items-center px-3 py-1.5 rounded-md text-sm cursor-pointer outline-none transition-colors ${view === opt.value ? "bg-[#333333] text-white font-medium" : "text-text-secondary hover:bg-[#333333] hover:text-white"
                      }`}>
                      {opt.label}
                    </div>
                  </Menu.Item>
                ))}
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>

        <div className="w-px h-5 bg-[#3d3d3d] mx-1" />

        {/* Filter Dropdown */}
        <Menu.Root>
          <Menu.Trigger className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-[#292929] text-sm font-medium transition cursor-pointer outline-none group">
            <Filter size={14} />
            <span className="truncate max-w-[100px]">Filter applied</span>
            <ChevronDown size={14} className="text-text-muted transition-transform group-data-[state=open]:rotate-180" />
          </Menu.Trigger>
          <Menu.Portal>
            <Menu.Positioner align="start" sideOffset={4}>
              <Menu.Popup className="w-56 bg-[#292929] border border-[#3d3d3d] rounded-lg shadow-xl py-1 z-50 text-sm text-text-primary">
                
                <Menu.Item className="px-3 py-2 hover:bg-[#333333] cursor-pointer outline-none flex items-center gap-2 text-text-muted">
                  <div className="w-4 h-4 flex items-center justify-center">✕</div>
                  <span>Clear filters</span>
                </Menu.Item>
                <div className="h-px bg-[#3d3d3d] my-1 mx-2" />

                {[
                  { label: "Appointments", checked: true },
                  { label: "Meetings", checked: true, hasArrow: true },
                  { label: "Poll holds", checked: true, hasArrow: true },
                  { label: "Reservations", checked: false, hasArrow: true },
                ].map((opt) => (
                  <Menu.Item key={opt.label} className="px-3 py-1.5 hover:bg-[#333333] cursor-pointer outline-none flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                       <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${opt.checked ? 'bg-[#5b5fc7] border-[#5b5fc7]' : 'border-text-muted'}`}>
                          {opt.checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>}
                       </div>
                       <span>{opt.label}</span>
                    </div>
                    {opt.hasArrow && <ChevronRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </Menu.Item>
                ))}

                <div className="h-px bg-[#3d3d3d] my-1 mx-2" />

                {[
                  { label: "Categories", checked: true, hasArrow: true },
                  { label: "Show as", checked: true, hasArrow: true },
                  { label: "Recurrence", checked: true, hasArrow: true },
                  { label: "In-person", checked: true, hasArrow: true },
                ].map((opt) => (
                  <Menu.Item key={opt.label} className="px-3 py-1.5 hover:bg-[#333333] cursor-pointer outline-none flex items-center justify-between group">
                    <div className="flex items-center gap-2">
                       <div className={`w-4 h-4 rounded-sm flex items-center justify-center border ${opt.checked ? 'bg-[#5b5fc7] border-[#5b5fc7]' : 'border-text-muted'}`}>
                          {opt.checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M20 6L9 17l-5-5" /></svg>}
                       </div>
                       <span>{opt.label}</span>
                    </div>
                    {opt.hasArrow && <ChevronRight size={14} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </Menu.Item>
                ))}

              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>

        <button className="p-1.5 rounded-md hover:bg-[#292929] transition">
          <MoreHorizontal size={16} />
        </button>

        <button
          onClick={onMeetNow}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-[#3d3d3d] hover:bg-[#292929] text-sm font-medium transition ml-1"
        >
          <Video size={14} />
          Meet now
        </button>

        {/* Exact Teams Purple New Button */}
        <button
          onClick={onNewEvent}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#5b5fc7] hover:bg-[#4f52b2] text-white text-sm font-medium transition ml-1"
        >
          <CalendarIcon size={14} className="hidden sm:block" />
          <span className="font-semibold">New</span>
          <ChevronDown size={14} className="opacity-80" />
        </button>

      </div>
    </header>
  );
}
