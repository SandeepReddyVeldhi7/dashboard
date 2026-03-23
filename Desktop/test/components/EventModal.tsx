"use client";

import { Dialog } from "@base-ui/react/dialog";
import {
  X, Maximize2, Users, Clock, MapPin, Video,
  Paperclip, Image as ImageIcon, Smile, Type, Sun, PenTool, Accessibility, CalendarIcon, ChevronDown, ChevronLeft, ChevronRight, BarChart2, Briefcase, Bell, Tag, Lock
} from "lucide-react";
import { CalendarEvent } from "@/lib/calendarData";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

interface EventModalProps {
  open: boolean;
  event: CalendarEvent | null;
  onClose: () => void;
  onSave: (event: Omit<CalendarEvent, "id"> & { id?: string }) => void;
}

const HOURS = [12, 13, 14, 15, 16, 17, 18, 19, 20];

export default function EventModal({ open, event, onClose, onSave }: EventModalProps) {
  const [title, setTitle] = useState("");
  const [isTeamsMeeting, setIsTeamsMeeting] = useState(true);
  const [start, setStart] = useState(dayjs().startOf('hour').add(1, 'hour'));
  const [end, setEnd] = useState(dayjs().startOf('hour').add(1, 'hour').add(30, 'minute'));

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      if (event.start) setStart(dayjs(event.start));
      if (event.end) setEnd(dayjs(event.end));
    } else {
      setTitle("");
    }
  }, [event]);

  const handleSave = () => {
    if (!title.trim()) return;

    onSave({
      id: event?.id,
      calendarId: event?.calendarId || "my-calendar",
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      isAllDay: false,
      color: "#ff5b5b", // Teams red for scheduler
      location: "",
      description: "",
      organizer: event?.organizer ?? { name: "You", avatar: "ME" },
      attendees: [],
      recurrence: "none",
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 bg-black/60 z-50 transition-opacity" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[1000px] bg-[#1f1f1f] shadow-2xl rounded-lg overflow-hidden flex flex-col border border-[#3d3d3d]">
          
          {/* Top Window Bar (Black) */}
          <div className="h-8 bg-black flex items-center justify-between px-3 w-full shrink-0">
            <span className="text-xs text-text-muted">New event</span>
            <div className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity">
              <button className="text-white hover:text-gray-300">
                <Maximize2 size={12} />
              </button>
              <button onClick={onClose} className="text-white hover:text-gray-300">
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Teams Navigation Bar */}
          <div className="h-12 bg-[#292929] border-b border-[#3d3d3d] flex items-center justify-between px-2 shrink-0">
            <div className="flex items-center gap-1 h-full pt-2">
              <button className="h-full px-3 flex items-center gap-2 border-b-2 border-transparent hover:bg-[#333333] transition rounded-t-lg">
                <CalendarIcon size={14} className="text-white" />
                <span className="text-sm text-white font-medium">Event</span>
              </button>
              <button className="h-full px-3 flex items-center gap-2 text-text-secondary hover:text-white hover:bg-[#333333] transition rounded-t-lg">
                <RefreshCwIcon className="w-3.5 h-3.5" />
                <span className="text-sm">Series</span>
              </button>
              <div className="w-px h-4 bg-[#4a4a4a] mx-1" />
              <button className="h-full px-2 flex items-center gap-1.5 text-text-secondary hover:text-white transition">
                <Briefcase size={14} /> Busy <ChevronDown size={14} className="opacity-70" />
              </button>
              <button className="h-full px-2 flex items-center gap-1.5 text-text-secondary hover:text-white transition">
                <Bell size={14} /> <ChevronDown size={14} className="opacity-70" />
              </button>
              <button className="h-full px-2 flex items-center gap-1.5 text-text-secondary hover:text-white transition">
                <Tag size={14} /> <ChevronDown size={14} className="opacity-70" />
              </button>
              <button className="h-full px-2 flex items-center gap-1.5 text-text-secondary hover:text-white transition">
                <Lock size={14} /> <ChevronDown size={14} className="opacity-70" />
              </button>
            </div>

            <button
              onClick={handleSave}
              className="px-4 py-1.5 bg-[#5b5fc7] hover:bg-[#4f52b2] text-white text-sm font-semibold rounded shadow-sm mr-2 flex items-center gap-2 transition"
            >
              <div className="w-4 h-4 border-2 border-white rounded flex items-center justify-center text-[8px]">💾</div>
              Save
            </button>
          </div>

          {/* Main Layout */}
          <div className="flex flex-1 min-h-[500px] overflow-hidden">
            
            {/* Left Column (Form) */}
            <div className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar bg-[#242424]">
              <div className="max-w-3xl mx-auto w-full space-y-5">
                
                {/* Title */}
                <div className="flex gap-4 items-center border-b border-[#5b5fc7] pb-2 group">
                  <div className="w-6 h-6 rounded flex items-center justify-center border border-[#4a4a4a] text-[#8e8cd8] group-hover:bg-[#333333] transition w-8">
                    <span className="font-mono text-xs font-bold leading-none">α+β</span>
                  </div>
                  <input
                    autoFocus
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add title"
                    className="flex-1 bg-transparent text-2xl text-white placeholder-text-muted outline-none font-medium"
                  />
                </div>

                {/* Attendees */}
                <div className="flex items-center gap-4 border-b border-[#3d3d3d] pb-2 group">
                  <Users size={16} className="text-text-muted mt-1 shrink-0 w-8" />
                  <input
                    placeholder="Invite required attendees"
                    className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted outline-none"
                  />
                  <div className="flex items-center gap-1 text-text-muted flex-shrink-0 cursor-pointer hover:text-white">
                    <Users size={14} />
                    <ChevronDown size={14} />
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-4 border-b border-[#3d3d3d] pb-2 group justify-between">
                  <div className="flex items-center gap-4">
                    <Clock size={16} className="text-text-muted shrink-0 w-8" />
                    <span className="text-text-primary text-sm font-medium">{start.format("ddd DD-MM-YYYY HH:mm")} - {end.format("HH:mm")}</span>
                  </div>
                  <button className="flex items-center gap-2 text-text-primary text-sm font-medium hover:bg-[#333333] px-2 py-1 rounded transition">
                    <BarChart2 size={16} className="rotate-90" />
                    Scheduler
                  </button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 border-b border-[#3d3d3d] pb-2 group">
                  <MapPin size={16} className="text-text-muted mt-1 shrink-0 w-8" />
                  <input
                    placeholder="Add a room or location"
                    className="flex-1 bg-transparent text-sm text-text-primary placeholder-text-muted outline-none"
                  />
                  <div className="flex items-center gap-1 text-text-muted flex-shrink-0 cursor-pointer hover:text-white">
                    <MapPin size={14} />
                    <ChevronDown size={14} />
                  </div>
                </div>

                {/* Teams Meeting Toggle */}
                <div className="flex items-center gap-4 border-b border-[#3d3d3d] pb-4 pt-2">
                  <Video size={16} className="text-text-muted shrink-0 w-8" />
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsTeamsMeeting(!isTeamsMeeting)}
                      className={`w-10 h-5 rounded-full relative flex items-center transition-colors ${
                        isTeamsMeeting ? "bg-[#5b5fc7]" : "bg-[#4a4a4a]"
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full absolute transition-all ${
                        isTeamsMeeting ? "left-[22px]" : "left-[3px]"
                      }`} />
                    </button>
                    <span className="text-sm font-medium text-white">Teams meeting</span>
                  </div>
                </div>

                {/* Description Editor */}
                <div className="border border-[#3d3d3d] rounded-lg mt-4 bg-[#1f1f1f] flex flex-col overflow-hidden min-h-[200px]">
                  <textarea
                    className="flex-1 bg-transparent outline-none p-3 text-sm text-text-primary resize-none placeholder-[#444]"
                  />
                  <div className="h-10 border-t border-[#3d3d3d] bg-[#141414] px-3 flex items-center gap-4 opacity-70">
                    <Paperclip size={14} className="hover:text-white cursor-pointer" />
                    <ImageIcon size={14} className="hover:text-white cursor-pointer" />
                    <Smile size={14} className="hover:text-white cursor-pointer" />
                    <Type size={14} className="hover:text-white cursor-pointer" />
                    <Sun size={14} className="hover:text-white cursor-pointer" />
                    <PenTool size={14} className="hover:text-white cursor-pointer" />
                    <Accessibility size={14} className="hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Scheduler) */}
            <div className="w-[320px] bg-[#1a1a1a] border-l border-[#3d3d3d] flex flex-col shrink-0">
              {/* Right Header */}
              <div className="h-12 border-b border-[#3d3d3d] flex items-center justify-between px-3 text-text-primary">
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <button className="hover:bg-[#333333] p-1 rounded transition"><ChevronLeft size={16} /></button>
                  <CalendarIcon size={14} className="text-text-muted" />
                  <button className="hover:bg-[#333333] p-1 rounded transition"><ChevronRight size={16} /></button>
                  <span className="ml-1 cursor-pointer hover:underline">{start.format("ddd, DD MMM, YYYY")}</span>
                  <ChevronDown size={14} className="text-text-muted" />
                </div>
                <button className="hover:bg-[#333333] p-1 rounded transition text-text-muted"><Maximize2 size={12} /></button>
              </div>

              {/* Mini Timegrid */}
              <div className="flex-1 overflow-y-auto px-4 py-2 relative text-white text-xs select-none">
                {HOURS.map((h, i) => (
                  <div key={h} className="flex relative h-12">
                    <div className="w-6 shrink-0 text-[#666] font-medium pt-[22px] text-right pr-2 text-[10px]">
                      {h}
                    </div>
                    <div className="flex-1 border-t border-[#333] mt-6" />
                  </div>
                ))}
                
                {/* The Red Meeting Box */}
                <div className="absolute top-[32px] left-10 right-4 h-6 border bg-[#ff5b5b]/90 border-transparent rounded-[2px] flex items-center px-2 cursor-pointer transition shadow-lg z-10">
                   <div className="w-1.5 h-1.5 bg-black rounded-full absolute -left-[3px] top-1/2 -translate-y-1/2" />
                   <div className="w-1.5 h-1.5 bg-black rounded-full absolute -right-[3px] top-1/2 -translate-y-1/2" />
                   <span className="text-[10px] font-bold text-black mix-blend-lighten tracking-wide">{start.format("HH:mm")} - {end.format("HH:mm")}</span>
                </div>
              </div>
            </div>

          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function RefreshCwIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
    </svg>
  );
}
