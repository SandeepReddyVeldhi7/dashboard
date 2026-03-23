"use client";

import { Dayjs } from "dayjs";
import { ChevronLeft, ChevronRight, ChevronDown, Check, Circle, MoreHorizontal } from "lucide-react";
import { Accordion } from "@base-ui/react/accordion";
import { Menu } from "@base-ui/react/menu";
import { useState } from "react";
import NewGroupModal from "./NewGroupModal";
import { CALENDAR_COLORS } from "@/lib/calendarData";

interface CalendarGroup {
  id: string;
  name: string;
  items: { id: string; name: string }[];
}

const CALENDAR_GROUPS: CalendarGroup[] = [
  {
    id: "my-calendars",
    name: "My calendars",
    items: [
      { id: "my-calendar", name: "Calendar" },
      { id: "us-holidays", name: "United States holidays" },
      { id: "birthdays", name: "Birthdays" },
    ],
  },
  {
    id: "groups",
    name: "Groups",
    items: [
      { id: "ag-bidplan", name: "AG_bidPlan" },
      { id: "ag-aptagrim", name: "AG_Aptagrim" },
    ],
  },
];

interface CalendarSidebarProps {
  currentDate: Dayjs;
  selectedCalendars: string[];
  onDateSelect: (date: Dayjs) => void;
  onToggleCalendar: (id: string) => void;
}

export default function CalendarSidebar({
  currentDate,
  selectedCalendars,
  onDateSelect,
  onToggleCalendar,
}: CalendarSidebarProps) {
  const [isNewGroupModalOpen, setIsNewGroupModalOpen] = useState(false);

  // Mini calendar logic
  const startOfMonth = currentDate.startOf("month");
  const daysInMonth = currentDate.daysInMonth();
  const startDayOfWeek = startOfMonth.day();

  const handlePrevMonth = () => onDateSelect(currentDate.subtract(1, "month"));
  const handleNextMonth = () => onDateSelect(currentDate.add(1, "month"));

  return (
    <>
      <div className="w-64 bg-app-panel border-r border-app-border flex flex-col h-full flex-shrink-0">

        {/* Title */}
        <div className="h-14 flex items-center px-4 shrink-0">
          <h1 className="text-xl font-bold text-text-primary tracking-tight">Calendar</h1>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-4">
          
          <Accordion.Root defaultValue={["month-picker"]} className="space-y-1" multiple>
            <Accordion.Item value="month-picker" className="group/item">
              <Accordion.Header>
                <Accordion.Trigger className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-[#292929] rounded-md transition text-text-primary group/trigger">
                  <div className="flex items-center gap-2">
                    <ChevronDown
                      size={14}
                      className="text-text-muted transition-transform duration-200 group-data-[panel-open]/trigger:-rotate-180 -rotate-90"
                    />
                    <span className="text-sm font-semibold tracking-wide">{currentDate.format("MMMM YYYY")}</span>
                  </div>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Panel className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                {/* Mini Calendar Header Controls */}
                <div className="flex items-center justify-end px-2 text-text-primary mt-1 mb-2">
                  <div className="flex items-center gap-1">
                    <button onClick={handlePrevMonth} className="p-1 hover:bg-[#292929] rounded transition">
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={handleNextMonth} className="p-1 hover:bg-[#292929] rounded transition">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Mini Calendar Grid */}
                <div className="px-2">
                  <div className="grid grid-cols-7 gap-y-1 text-center mb-1">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                      <div key={i} className="text-[11px] font-medium text-text-muted mt-1">
                        {d}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-y-[2px] text-center text-[12px]">
                    {Array.from({ length: startDayOfWeek }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-7" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayStr = String(i + 1);
                      const isSelected = dayStr === currentDate.format("D");
                      return (
                        <button
                          key={i}
                          onClick={() => onDateSelect(currentDate.date(i + 1))}
                          className={`h-7 w-7 mx-auto flex items-center justify-center rounded-full transition-colors ${isSelected
                              ? "bg-[#5b5fc7] text-white font-semibold"
                              : "text-text-primary hover:bg-[#292929]"
                            }`}
                        >
                          {dayStr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion.Root>

          <div className="h-px bg-[#3d3d3d] mx-2" />

          {/* Calendars & Groups List */}
          <Accordion.Root defaultValue={["my-calendars", "groups"]} className="space-y-1" multiple>
            {CALENDAR_GROUPS.map((group) => (
              <Accordion.Item key={group.id} value={group.id} className="group/item">

                {/* Accordion Header */}
                <Accordion.Header className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-[#292929] rounded-md transition text-text-primary group/trigger">
                  <Accordion.Trigger className="flex items-center gap-2 flex-1 outline-none text-left min-w-0">
                    <ChevronDown
                      size={14}
                      className="text-text-muted transition-transform duration-200 group-data-[panel-open]/trigger:-rotate-180 flex-shrink-0"
                    />
                    <span className="text-sm font-semibold truncate">{group.name}</span>
                  </Accordion.Trigger>

                  {/* Show ... menu only on Groups hover */}
                  {group.id === "groups" && (
                    <Menu.Root>
                      <Menu.Trigger
                        className="opacity-0 group-hover/trigger:opacity-100 p-0.5 rounded hover:bg-[#3d3d3d] text-text-muted transition flex-shrink-0"
                      >
                        <MoreHorizontal size={14} />
                      </Menu.Trigger>
                      <Menu.Portal>
                        <Menu.Positioner align="start" sideOffset={4}>
                          <Menu.Popup className="w-40 bg-[#292929] border border-[#3d3d3d] rounded shadow-xl p-1 z-50 text-sm text-text-primary">
                            <Menu.Item
                              className="px-3 py-1.5 hover:bg-[#333333] rounded cursor-pointer outline-none"
                              onClick={() => setIsNewGroupModalOpen(true)}
                            >
                              New group
                            </Menu.Item>
                          </Menu.Popup>
                        </Menu.Positioner>
                      </Menu.Portal>
                    </Menu.Root>
                  )}
                </Accordion.Header>

                {/* Accordion List */}
                <Accordion.Panel className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <div className="pt-1 pb-2 space-y-0.5 ml-2">
                    {group.items.map((cal) => {
                      const checked = selectedCalendars.includes(cal.id);
                      const color = CALENDAR_COLORS[cal.id] || "#fff";

                      return (
                        <button
                          key={cal.id}
                          onClick={() => onToggleCalendar(cal.id)}
                          className="w-full flex items-center gap-3 px-2 py-1.5 hover:bg-[#292929] rounded-md transition text-left"
                        >
                          <div
                            className="w-4 h-4 rounded-full flex items-center justify-center border-2 transition-colors relative flex-shrink-0"
                            style={{
                              borderColor: checked ? color : "#666",
                              backgroundColor: checked ? color : "transparent",
                            }}
                          >
                            {checked && <Check size={10} className="text-white absolute" strokeWidth={3} />}
                          </div>
                          <span className="text-sm text-text-secondary truncate pr-2">{cal.name}</span>
                        </button>
                      );
                    })}
                  </div>

                  {group.id === "groups" && (
                    <button className="text-[13px] text-[#8e8cd8] hover:text-[#a6a4e2] px-9 py-1 mb-2">
                      Show selected
                    </button>
                  )}
                  {group.id === "my-calendars" && (
                    <button className="text-[13px] text-[#8e8cd8] hover:text-[#a6a4e2] px-9 py-1 mb-2">
                      Show all
                    </button>
                  )}
                </Accordion.Panel>

              </Accordion.Item>
            ))}
          </Accordion.Root>
        </div>
      </div>

      <NewGroupModal
        open={isNewGroupModalOpen}
        onClose={() => setIsNewGroupModalOpen(false)}
      />
    </>
  );
}
