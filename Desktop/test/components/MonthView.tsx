"use client";

import dayjs, { Dayjs } from "dayjs";
import { CalendarEvent } from "@/lib/calendarData";
import EventChip from "./EventChip";

interface MonthViewProps {
  currentDate: Dayjs;
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onSelectDay: (date: Dayjs) => void;
  onNewEvent: (start?: Dayjs) => void;
}

export default function MonthView({ currentDate, events, onSelectEvent, onSelectDay, onNewEvent }: MonthViewProps) {
  const today = dayjs();
  const startOfMonth = currentDate.startOf("month");
  const startOfCal = startOfMonth.startOf("week");

  const cells: Dayjs[] = [];
  for (let i = 0; i < 42; i++) {
    cells.push(startOfCal.add(i, "day"));
  }

  const weeks: Dayjs[][] = [];
  for (let i = 0; i < 6; i++) {
    weeks.push(cells.slice(i * 7, i * 7 + 7));
  }

  const getEventsForDay = (date: Dayjs) =>
    events.filter((e) => dayjs(e.start).isSame(date, "day") || (e.isAllDay && dayjs(e.start).isSame(date, "day")));

  return (
    <div className="flex flex-col h-full">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-app-border">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-2 text-center text-xs font-semibold text-text-muted uppercase tracking-wide">
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="flex-1 grid grid-rows-6">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 border-b border-app-border last:border-b-0">
            {week.map((day, di) => {
              const isToday = day.isSame(today, "day");
              const isCurrentMonth = day.month() === currentDate.month();
              const dayEvents = getEventsForDay(day);
              const visible = dayEvents.slice(0, 3);
              const overflow = dayEvents.length - visible.length;

              return (
                <div
                  key={di}
                  onClick={() => onNewEvent(day.hour(9))}
                  className={`border-r border-app-border last:border-r-0 p-1 flex flex-col gap-0.5 cursor-pointer group transition ${
                    isCurrentMonth ? "bg-app-panel" : "bg-app-bg"
                  } hover:bg-state-hover`}
                >
                  {/* Date number */}
                  <div className="flex justify-center mb-0.5">
                    <span
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold transition ${
                        isToday
                          ? "bg-brand text-white"
                          : isCurrentMonth
                          ? "text-text-primary group-hover:bg-state-active"
                          : "text-text-muted"
                      }`}
                    >
                      {day.date()}
                    </span>
                  </div>

                  {/* Events */}
                  <div className="flex flex-col gap-0.5">
                    {visible.map((ev) => (
                      <EventChip key={ev.id} event={ev} onClick={onSelectEvent} />
                    ))}
                    {overflow > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDay(day);
                        }}
                        className="text-[10px] text-brand hover:text-brand-hover text-left px-1 font-medium"
                      >
                        +{overflow} more
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
