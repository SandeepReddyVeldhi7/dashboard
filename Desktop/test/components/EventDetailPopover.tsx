"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  X, MapPin, Clock, Users, Edit2, Trash2, Video, RefreshCw, CheckCircle, HelpCircle, XCircle,
} from "lucide-react";
import { CalendarEvent } from "@/lib/calendarData";
import dayjs from "dayjs";

interface EventDetailPopoverProps {
  event: CalendarEvent | null;
  onClose: () => void;
  onEdit: (event: CalendarEvent) => void;
  onDelete: (id: string) => void;
}

const RECURRENCE_LABELS: Record<CalendarEvent["recurrence"], string> = {
  none: "",
  daily: "Repeats daily",
  weekly: "Repeats weekly",
  monthly: "Repeats monthly",
};

const STATUS_ICON: Record<string, React.ReactNode> = {
  accepted: <CheckCircle size={12} className="text-green-400" />,
  tentative: <HelpCircle size={12} className="text-yellow-400" />,
  declined: <XCircle size={12} className="text-red-400" />,
  pending: <Clock size={12} className="text-text-muted" />,
};

export default function EventDetailPopover({ event, onClose, onEdit, onDelete }: EventDetailPopoverProps) {
  if (!event) return null;

  const start = dayjs(event.start);
  const end = dayjs(event.end);

  const formatTime = () => {
    if (event.isAllDay) return "All day";
    return `${start.format("dddd, MMMM D · h:mm")} – ${end.format("h:mm A")}`;
  };

  return (
    <Dialog.Root open={!!event} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
          <div className="bg-app-panel border border-app-border rounded-2xl shadow-card overflow-hidden">
            {/* Color strip */}
            <div className="h-1.5" style={{ backgroundColor: event.color }} />

            <div className="px-5 py-4">
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: event.color }} />
                <div className="flex-1 min-w-0">
                  <Dialog.Title className="text-base font-bold text-text-primary leading-snug">
                    {event.title}
                  </Dialog.Title>
                </div>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => onEdit(event)}
                    className="p-1.5 rounded-md hover:bg-state-hover text-text-muted hover:text-text-primary transition"
                    title="Edit"
                  >
                    <Edit2 size={15} />
                  </button>
                  <button
                    onClick={() => onDelete(event.id)}
                    className="p-1.5 rounded-md hover:bg-red-500/10 text-text-muted hover:text-red-400 transition"
                    title="Delete"
                  >
                    <Trash2 size={15} />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-md hover:bg-state-hover text-text-muted hover:text-text-primary transition"
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {/* Date / Time */}
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <Clock size={15} className="text-text-muted flex-shrink-0" />
                  <span>{formatTime()}</span>
                </div>

                {/* Recurrence */}
                {event.recurrence !== "none" && (
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <RefreshCw size={15} className="text-text-muted flex-shrink-0" />
                    <span>{RECURRENCE_LABELS[event.recurrence]}</span>
                  </div>
                )}

                {/* Location */}
                {event.location && (
                  <div className="flex items-center gap-3 text-sm text-text-secondary">
                    <MapPin size={15} className="text-text-muted flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                )}

                {/* Meeting link */}
                {event.meetingLink && (
                  <div className="flex items-center gap-3">
                    <Video size={15} className="text-brand flex-shrink-0" />
                    <a
                      href={event.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-brand hover:underline"
                    >
                      Join Teams Meeting
                    </a>
                  </div>
                )}

                {/* Organizer */}
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: event.color }}
                  >
                    {event.organizer.avatar.slice(0, 2)}
                  </div>
                  <span>
                    <span className="text-text-muted">Organizer: </span>
                    {event.organizer.name}
                  </span>
                </div>

                {/* Attendees */}
                {event.attendees.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Users size={15} className="text-text-muted flex-shrink-0 mt-0.5" />
                    <div className="flex-1 space-y-1">
                      {event.attendees.map((a) => (
                        <div key={a.email} className="flex items-center justify-between text-xs text-text-secondary">
                          <span>{a.name}</span>
                          <span className="flex items-center gap-1 capitalize text-text-muted">
                            {STATUS_ICON[a.status]}
                            {a.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                {event.description && (
                  <p className="text-sm text-text-secondary bg-app-bg rounded-lg px-3 py-2 border border-app-border">
                    {event.description}
                  </p>
                )}
              </div>

              {/* RSVP */}
              {event.attendees.length > 0 && (
                <div className="mt-4 pt-3 border-t border-app-border">
                  <p className="text-xs text-text-muted mb-2">Your response</p>
                  <div className="flex gap-2">
                    {(["Accept", "Tentative", "Decline"] as const).map((resp) => (
                      <button
                        key={resp}
                        className={`flex-1 py-1.5 rounded-md text-xs font-medium border transition
                          ${resp === "Accept" ? "border-green-500/40 text-green-400 hover:bg-green-500/10" : ""}
                          ${resp === "Tentative" ? "border-yellow-500/40 text-yellow-400 hover:bg-yellow-500/10" : ""}
                          ${resp === "Decline" ? "border-red-500/40 text-red-400 hover:bg-red-500/10" : ""}
                        `}
                      >
                        {resp}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
