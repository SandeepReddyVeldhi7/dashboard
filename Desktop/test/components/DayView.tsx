"use client";

import dayjs, { Dayjs } from "dayjs";
import { CalendarEvent, CALENDAR_NAMES, CALENDAR_COLORS } from "@/lib/calendarData";
import TimeGrid, { TimeGridColumn } from "./TimeGrid";

interface DayViewProps {
  currentDate: Dayjs;
  events: CalendarEvent[];
  selectedCalendars: string[];
  onSelectEvent: (event: CalendarEvent) => void;
  onNewEvent: (start: Dayjs, calendarId?: string) => void;
}

export default function DayView({
  currentDate,
  events,
  selectedCalendars,
  onSelectEvent,
  onNewEvent,
}: DayViewProps) {
  const isToday = currentDate.isSame(dayjs(), "day");

  // Create columns based on selected calendars for the split view!
  // If no calendars are selected, we might want to show a default or empty state, but let's assume at least one.
  const columns: TimeGridColumn[] = selectedCalendars.map((calId) => ({
    id: calId,
    date: currentDate,
    calendarId: calId,
    isToday,
  }));

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Calendar Split Headers */}
      <div className="flex border-b border-app-border flex-shrink-0 bg-app-panel">
        <div className="w-14 flex-shrink-0" />
        {columns.map((col) => {
          const calendarName = CALENDAR_NAMES[col.id] || "Calendar";
          const calendarColor = CALENDAR_COLORS[col.id] || "#8e8cd8";

          return (
            <div key={col.id} className="flex-1 border-l border-app-border py-3 px-3 flex flex-col justify-end min-h-[64px] relative group">
              {/* Fake close button to match Teams style */}
              <button className="absolute right-2 top-2 text-text-muted opacity-0 group-hover:opacity-100 transition-opacity hover:text-white">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="text-sm font-semibold mb-2" style={{ color: calendarColor }}>
                {calendarName}
              </div>
              
              <div className="flex items-center gap-2 border-t-[3px] pt-1" style={{ borderColor: calendarColor }}>
                <span className={`text-2xl font-semibold leading-none ${col.isToday ? "text-white" : "text-text-primary"}`}>
                  {currentDate.format("D")}
                </span>
                <span className="text-sm text-text-muted mt-1">
                  {currentDate.format("dddd")}
                </span>
              </div>
              
            </div>
          );
        })}
      </div>

      <TimeGrid
        columns={columns}
        events={events}
        onSelectEvent={onSelectEvent}
        onNewEvent={onNewEvent}
      />
    </div>
  );
}
