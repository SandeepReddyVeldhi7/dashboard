"use client";

import { CalendarEvent } from "@/lib/calendarData";

interface EventChipProps {
  event: CalendarEvent;
  onClick: (event: CalendarEvent) => void;
}

export default function EventChip({ event, onClick }: EventChipProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick(event);
      }}
      className="w-full text-left px-1.5 py-0.5 rounded text-[11px] font-medium truncate transition hover:brightness-110 hover:scale-[1.01]"
      style={{ backgroundColor: event.color + "33", color: event.color, borderLeft: `2px solid ${event.color}` }}
      title={event.title}
    >
      {!event.isAllDay && (
        <span className="opacity-75 mr-1 text-[10px]">
          {new Date(event.start).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      )}
      {event.title}
    </button>
  );
}
