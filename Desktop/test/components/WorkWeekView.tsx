"use client";

import dayjs, { Dayjs } from "dayjs";
import { CalendarEvent } from "@/lib/calendarData";
import TimeGrid from "./TimeGrid";

interface WorkWeekViewProps {
  currentDate: Dayjs;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onNewEvent: (start: Dayjs) => void;
}

export default function WorkWeekView({ currentDate, events, onSelectEvent, onNewEvent }: WorkWeekViewProps) {
  const startOfWeek = currentDate.startOf("week");
  // Mon(1)–Fri(5)
  const days = Array.from({ length: 5 }, (_, i) => startOfWeek.add(i + 1, "day"));
  const today = dayjs();

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Day headers */}
      <div className="flex border-b border-app-border flex-shrink-0 bg-app-panel">
        <div className="w-14 flex-shrink-0" />
        {days.map((day) => {
          const isToday = day.isSame(today, "day");
          return (
            <div key={day.toISOString()} className="flex-1 border-l border-app-border py-2 flex flex-col items-center">
              <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wide">
                {day.format("ddd")}
              </span>
              <span
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold mt-0.5 ${
                  isToday ? "bg-brand text-white" : "text-text-primary"
                }`}
              >
                {day.date()}
              </span>
            </div>
          );
        })}
      </div>

      <TimeGrid
        columns={days.map((day) => ({
          id: day.toISOString(),
          date: day,
          isToday: day.isSame(today, "day"),
        }))}
        events={events}
        onSelectEvent={onSelectEvent}
        onNewEvent={onNewEvent}
      />
    </div>
  );
}
