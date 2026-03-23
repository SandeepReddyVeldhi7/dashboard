"use client";

import CalendarSidebar from "@/components/calendar/CalendarSidebar";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import MonthView from "@/components/calendar/MonthView";
import WeekView from "@/components/calendar/WeekView";
import WorkWeekView from "@/components/calendar/WorkWeekView";
import DayView from "@/components/calendar/DayView";
import EventModal from "@/components/calendar/EventModal";
import EventDetailPopover from "@/components/calendar/EventDetailPopover";
import MeetNowModal from "@/components/calendar/MeetNowModal";
import { useCalendar } from "@/hooks/useCalendar";
import { CalendarEvent, CALENDAR_COLORS, CALENDAR_NAMES } from "@/lib/calendarData";

export default function CalendarPageClient() {
  const {
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
    getHeaderLabel,
  } = useCalendar();

  const handleSaveEvent = (ev: Omit<CalendarEvent, "id"> & { id?: string }) => {
    if (ev.id) {
      updateEvent(ev as CalendarEvent);
    } else {
      addEvent(ev);
    }
  };

  const filteredEvents = events.filter((e: CalendarEvent) => selectedCalendars.includes(e.calendarId));

  return (
    <div className="flex w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <CalendarSidebar
        currentDate={currentDate}
        selectedCalendars={selectedCalendars}
        onDateSelect={(date) => {
          goToDate(date);
          if (view === "month") setView("day");
        }}
        onToggleCalendar={toggleCalendar}
      />

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 bg-app-bg overflow-hidden">
        <CalendarHeader
          view={view}
          label={getHeaderLabel()}
          onViewChange={setView}
          onPrev={goToPrev}
          onNext={goToNext}
          onToday={goToToday}
          onDateSelect={goToDate}
          onNewEvent={() => openNewEvent()}
          onMeetNow={() => setIsMeetNowOpen(true)}
        />

        <div className="flex-1 min-h-0 overflow-x-auto overflow-y-hidden flex">
          {view === "month" && selectedCalendars.map((calId: string) => (
            <div key={calId} className="flex flex-col flex-1 min-w-[500px] border-r border-app-border last:border-r-0 relative">
              <div className="h-8 flex items-center shrink-0 border-b border-app-border justify-center font-semibold text-sm bg-app-panel" style={{ color: CALENDAR_COLORS[calId], borderTop: `3px solid ${CALENDAR_COLORS[calId]}`, backgroundColor: CALENDAR_COLORS[calId]+"15" }}>
                {CALENDAR_NAMES[calId]}
              </div>
              <MonthView
                currentDate={currentDate}
                events={events.filter((e: CalendarEvent) => e.calendarId === calId)}
                onSelectEvent={setSelectedEvent}
                onSelectDay={(date) => {
                  goToDate(date);
                  setView("day");
                }}
                onNewEvent={openNewEvent}
              />
            </div>
          ))}
          {view === "week" && selectedCalendars.map((calId: string) => (
            <div key={calId} className="flex flex-col flex-1 min-w-[500px] border-r border-app-border last:border-r-0 relative">
              <div className="h-8 flex items-center shrink-0 border-b border-app-border justify-center font-semibold text-sm bg-app-panel" style={{ color: CALENDAR_COLORS[calId], borderTop: `3px solid ${CALENDAR_COLORS[calId]}`, backgroundColor: CALENDAR_COLORS[calId]+"15" }}>
                {CALENDAR_NAMES[calId]}
              </div>
              <WeekView
                currentDate={currentDate}
                events={events.filter((e: CalendarEvent) => e.calendarId === calId)}
                onSelectEvent={setSelectedEvent}
                onNewEvent={openNewEvent}
              />
            </div>
          ))}
          {view === "work-week" && selectedCalendars.map((calId: string) => (
            <div key={calId} className="flex flex-col flex-1 min-w-[500px] border-r border-app-border last:border-r-0 relative">
              <div className="h-8 flex items-center shrink-0 border-b border-app-border justify-center font-semibold text-sm bg-app-panel" style={{ color: CALENDAR_COLORS[calId], borderTop: `3px solid ${CALENDAR_COLORS[calId]}`, backgroundColor: CALENDAR_COLORS[calId]+"15" }}>
                {CALENDAR_NAMES[calId]}
              </div>
              <WorkWeekView
                currentDate={currentDate}
                events={events.filter((e: CalendarEvent) => e.calendarId === calId)}
                onSelectEvent={setSelectedEvent}
                onNewEvent={openNewEvent}
              />
            </div>
          ))}
          {view === "day" && (
            <div className="flex-1 w-full min-w-0">
               <DayView
                 currentDate={currentDate}
                 events={filteredEvents}
                 selectedCalendars={selectedCalendars}
                 onSelectEvent={setSelectedEvent}
                 onNewEvent={openNewEvent}
               />
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <EventModal
        open={isEventModalOpen}
        event={editingEvent}
        onClose={() => setIsEventModalOpen(false)}
        onSave={handleSaveEvent}
      />
      <EventDetailPopover
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onEdit={openEditEvent}
        onDelete={deleteEvent}
      />
      <MeetNowModal
        open={isMeetNowOpen}
        onClose={() => setIsMeetNowOpen(false)}
      />
    </div>
  );
}
