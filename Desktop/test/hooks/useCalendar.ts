"use client";

import { useState, useCallback } from "react";
import dayjs, { Dayjs } from "dayjs";
import { CalendarEvent, MOCK_EVENTS } from "@/lib/calendarData";

export type CalendarView = "day" | "work-week" | "week" | "month";

export function useCalendar() {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());
  const [view, setView] = useState<CalendarView>("week");
  const [events, setEvents] = useState<CalendarEvent[]>(MOCK_EVENTS);
  const [selectedCalendars, setSelectedCalendars] = useState<string[]>([
    "my-calendar",
    "us-holidays",
    "birthdays",
  ]);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [isMeetNowOpen, setIsMeetNowOpen] = useState(false);

  // Navigation
  const goToToday = useCallback(() => setCurrentDate(dayjs()), []);

  const goToPrev = useCallback(() => {
    setCurrentDate((d) => {
      if (view === "day") return d.subtract(1, "day");
      if (view === "week" || view === "work-week") return d.subtract(1, "week");
      return d.subtract(1, "month");
    });
  }, [view]);

  const goToNext = useCallback(() => {
    setCurrentDate((d) => {
      if (view === "day") return d.add(1, "day");
      if (view === "week" || view === "work-week") return d.add(1, "week");
      return d.add(1, "month");
    });
  }, [view]);

  const goToDate = useCallback((date: Dayjs) => {
    setCurrentDate(date);
  }, []);

  // Event CRUD
  const addEvent = useCallback((event: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: `evt-${Date.now()}`,
    };
    setEvents((prev) => [...prev, newEvent]);
    setIsEventModalOpen(false);
    setEditingEvent(null);
  }, []);

  const updateEvent = useCallback((updated: CalendarEvent) => {
    setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    setIsEventModalOpen(false);
    setEditingEvent(null);
    setSelectedEvent(null);
  }, []);

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    setSelectedEvent(null);
  }, []);

  const openNewEvent = useCallback((defaultStart?: Dayjs) => {
    const start = defaultStart ?? dayjs().startOf("hour").add(1, "hour");
    setEditingEvent({
      id: `evt-${Date.now()}`,
      calendarId: "my-calendar",
      title: "New Event",
      start: start.toISOString(),
      end: start.add(30, "minute").toISOString(),
      isAllDay: false,
      color: "#1ab1c6",
      location: "",
      description: "",
      organizer: { name: "You", avatar: "ME" },
      attendees: [],
      recurrence: "none",
    });
    setIsEventModalOpen(true);
  }, []);

  const openEditEvent = useCallback((event: CalendarEvent) => {
    setEditingEvent(event);
    setIsEventModalOpen(true);
    setSelectedEvent(null);
  }, []);

  const toggleCalendar = useCallback((id: string) => {
    setSelectedCalendars((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }, []);

  const getEventsForDay = useCallback(
    (date: Dayjs) => {
      return events.filter((e) => {
        if (!selectedCalendars.includes(e.calendarId)) return false;
        const start = dayjs(e.start);
        const end = dayjs(e.end);
        return (
          date.isSame(start, "day") ||
          (e.isAllDay && (date.isAfter(start, "day") || date.isSame(start, "day")) && (date.isBefore(end, "day") || date.isSame(end, "day")))
        );
      });
    },
    [events]
  );

  const getHeaderLabel = useCallback(() => {
    if (view === "day") return currentDate.format("dddd, MMMM D, YYYY");
    if (view === "month") return currentDate.format("MMMM YYYY");
    const startOfWeek = currentDate.startOf("week");
    const endOfWeek = view === "work-week" ? startOfWeek.add(4, "day") : startOfWeek.add(6, "day");
    if (startOfWeek.month() === endOfWeek.month()) {
      return `${startOfWeek.format("MMMM D")} – ${endOfWeek.format("D, YYYY")}`;
    }
    return `${startOfWeek.format("MMM D")} – ${endOfWeek.format("MMM D, YYYY")}`;
  }, [currentDate, view]);

  return {
    currentDate,
    view,
    setView,
    events,
    selectedCalendars,
    toggleCalendar,
    selectedEvent,
    setSelectedEvent,
    isEventModalOpen,
    setIsEventModalOpen,
    editingEvent,
    setEditingEvent,
    isMeetNowOpen,
    setIsMeetNowOpen,
    goToToday,
    goToPrev,
    goToNext,
    goToDate,
    addEvent,
    updateEvent,
    deleteEvent,
    openNewEvent,
    openEditEvent,
    getEventsForDay,
    getHeaderLabel,
  };
}
