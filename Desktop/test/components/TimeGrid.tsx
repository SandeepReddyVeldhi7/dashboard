"use client";

import dayjs, { Dayjs } from "dayjs";
import { CalendarEvent, CALENDAR_COLORS } from "@/lib/calendarData";
import { useRef, useEffect, useState } from "react";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const HOUR_HEIGHT = 64; // px per hour

export interface TimeGridColumn {
  id: string;
  date: Dayjs;
  calendarId?: string;
  isToday: boolean;
}

interface TimeGridProps {
  columns: TimeGridColumn[];
  events: CalendarEvent[];
  onSelectEvent: (event: CalendarEvent) => void;
  onNewEvent: (start: Dayjs, calendarId?: string) => void;
}

function positionEvent(event: CalendarEvent, containerHeight: number) {
  const start = dayjs(event.start);
  const end = dayjs(event.end);
  const startMinutes = start.hour() * 60 + start.minute();
  const endMinutes = end.hour() * 60 + end.minute();
  const duration = Math.max(endMinutes - startMinutes, 30);
  const top = (startMinutes / 60) * HOUR_HEIGHT;
  const height = (duration / 60) * HOUR_HEIGHT;
  return { top, height };
}

export default function TimeGrid({ columns, events, onSelectEvent, onNewEvent }: TimeGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const today = dayjs();
  
  // Real-time current time state
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const getEventsForColumn = (col: TimeGridColumn) =>
    events.filter(
      (e) => !e.isAllDay && dayjs(e.start).isSame(col.date, "day") && (!col.calendarId || e.calendarId === col.calendarId)
    );

  const getAllDayEventsForColumn = (col: TimeGridColumn) =>
    events.filter(
      (e) => e.isAllDay && dayjs(e.start).isSame(col.date, "day") && (!col.calendarId || e.calendarId === col.calendarId)
    );

  const handleGridClick = (e: React.MouseEvent<HTMLDivElement>, col: TimeGridColumn) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top + (gridRef.current?.scrollTop ?? 0);
    const hour = Math.floor(y / HOUR_HEIGHT);
    const minutes = Math.floor(((y % HOUR_HEIGHT) / HOUR_HEIGHT) * 60);
    const snapped = Math.round(minutes / 15) * 15;
    onNewEvent(col.date.hour(hour).minute(snapped).second(0), col.calendarId);
  };

  // Current time indicator position
  const nowTop = (now.hour() * 60 + now.minute()) / 60 * HOUR_HEIGHT;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* All-day strip */}
      <div className="flex border-b border-app-border flex-shrink-0">
        <div className="w-14 flex-shrink-0 text-[10px] text-text-muted flex items-end justify-end pr-2 pb-1">
          All day
        </div>
        {columns.map((col) => {
          const allDay = getAllDayEventsForColumn(col);
          return (
            <div
              key={col.id}
              className="flex-1 min-h-8 border-l border-app-border px-1 py-1 flex flex-col gap-0.5"
            >
              {allDay.map((ev) => {
                 const baseColor = CALENDAR_COLORS[ev.calendarId] || ev.color;
                 return (
                  <button
                    key={ev.id}
                    onClick={() => onSelectEvent(ev)}
                    className="w-full text-left text-[11px] font-medium px-1.5 py-0.5 rounded truncate"
                    style={{ backgroundColor: baseColor + "33", color: baseColor }}
                  >
                    {ev.title}
                  </button>
                 );
              })}
            </div>
          );
        })}
      </div>

      {/* Scrollable time grid */}
      <div className="flex-1 overflow-y-auto" ref={gridRef}>
        <div className="flex relative" style={{ height: HOUR_HEIGHT * 24 }}>
          {/* Time labels */}
          <div className="w-14 flex-shrink-0 relative">
            {HOURS.map((h) => (
              <div
                key={h}
                className="absolute w-full text-right pr-2 text-[10px] text-text-muted"
                style={{ top: h * HOUR_HEIGHT - 7 }}
              >
                {h === 0 ? "" : dayjs().hour(h).minute(0).format("h A")}
              </div>
            ))}
          </div>

          {/* Day/Calendar columns */}
          <div className="flex flex-1 relative">
            {/* Hour lines container */}
            <div className="absolute inset-0 pointer-events-none">
              {HOURS.map((h) => (
                <div
                  key={h}
                  className="absolute w-full border-t border-app-border"
                  style={{ top: h * HOUR_HEIGHT }}
                />
              ))}
              {/* Half-hour lines */}
              {HOURS.map((h) => (
                <div
                  key={`half-${h}`}
                  className="absolute w-full border-t border-app-border opacity-30"
                  style={{ top: h * HOUR_HEIGHT + HOUR_HEIGHT / 2 }}
                />
              ))}
            </div>

            {columns.map((col) => {
              const colEvents = getEventsForColumn(col);

              return (
                <div
                  key={col.id}
                  className="flex-1 relative border-l border-app-border cursor-pointer"
                  onClick={(e) => handleGridClick(e, col)}
                >
                  {/* Current time indicator */}
                  {col.isToday && (
                    <div
                      className="absolute left-0 right-0 z-20 flex items-center pointer-events-none"
                      style={{ top: nowTop }}
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0 -ml-1.5 shadow-sm" />
                      <div className="flex-1 h-[1.5px] bg-red-500 shadow-sm" />
                    </div>
                  )}

                  {/* Events */}
                  {colEvents.map((ev) => {
                    const { top, height } = positionEvent(ev, HOUR_HEIGHT * 24);
                    const baseColor = CALENDAR_COLORS[ev.calendarId] || ev.color;
                    return (
                      <button
                        key={ev.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(ev);
                        }}
                        className="absolute left-0.5 right-0.5 rounded overflow-hidden text-left transition hover:brightness-110 hover:z-10 z-[1]"
                        style={{
                          top,
                          height: Math.max(height, 22),
                          backgroundColor: baseColor + "33",
                          borderLeft: `3px solid ${baseColor}`,
                        }}
                      >
                        <div className="px-1.5 pt-0.5">
                          <p className="text-[11px] font-semibold leading-tight truncate" style={{ color: baseColor }}>
                            {ev.title}
                          </p>
                          {height > 36 && (
                            <p className="text-[10px] opacity-70" style={{ color: baseColor }}>
                              {dayjs(ev.start).format("h:mm")}–{dayjs(ev.end).format("h:mm A")}
                            </p>
                          )}
                          {height > 52 && ev.location && (
                            <p className="text-[10px] opacity-60 truncate" style={{ color: baseColor }}>
                              {ev.location}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
