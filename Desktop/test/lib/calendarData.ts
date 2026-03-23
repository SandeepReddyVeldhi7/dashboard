import dayjs from "dayjs";

export type CalendarEvent = {
  id: string;
  calendarId: string;
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  isAllDay: boolean;
  color: string;
  location?: string;
  description?: string;
  organizer: { name: string; avatar: string };
  attendees: { name: string; email: string; status: "accepted" | "tentative" | "declined" | "pending" }[];
  recurrence: "none" | "daily" | "weekly" | "monthly";
  meetingLink?: string;
};

export const CALENDAR_COLORS: Record<string, string> = {
  "my-calendar": "#1ab1c6",
  "us-holidays": "#10b981",
  "birthdays": "#f59e0b",
  "ag-bidplan": "#7c3aed",
  "ag-aptagrim": "#ec4899"
};

export const CALENDAR_NAMES: Record<string, string> = {
  "my-calendar": "Calendar",
  "us-holidays": "United States holidays",
  "birthdays": "Birthdays",
  "ag-bidplan": "AG_bidPlan",
  "ag-aptagrim": "AG_Aptagrim"
};

const today = dayjs();

export const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: "evt-1",
    calendarId: "my-calendar",
    title: "Team Standup",
    start: today.hour(9).minute(0).second(0).toISOString(),
    end: today.hour(9).minute(30).second(0).toISOString(),
    isAllDay: false,
    color: "#1ab1c6",
    location: "Microsoft Teams",
    description: "Daily team standup meeting.",
    organizer: { name: "Alex Johnson", avatar: "AJ" },
    attendees: [
      { name: "Alex Johnson", email: "alex@company.com", status: "accepted" },
      { name: "Maria Garcia", email: "maria@company.com", status: "accepted" },
      { name: "James Wilson", email: "james@company.com", status: "tentative" },
    ],
    recurrence: "daily",
    meetingLink: "https://teams.microsoft.com/meet/123456",
  },
  {
    id: "evt-2",
    calendarId: "ag-bidplan",
    title: "Product Review",
    start: today.hour(11).minute(0).second(0).toISOString(),
    end: today.hour(12).minute(0).second(0).toISOString(),
    isAllDay: false,
    color: "#7c3aed",
    location: "Conference Room A",
    description: "Monthly product review with stakeholders.",
    organizer: { name: "Maria Garcia", avatar: "MG" },
    attendees: [
      { name: "Maria Garcia", email: "maria@company.com", status: "accepted" },
      { name: "Alex Johnson", email: "alex@company.com", status: "accepted" },
      { name: "Sara Lee", email: "sara@company.com", status: "declined" },
    ],
    recurrence: "monthly",
  },
  {
    id: "evt-3",
    calendarId: "ag-aptagrim",
    title: "Design Sprint Planning",
    start: today.hour(14).minute(0).second(0).toISOString(),
    end: today.hour(15).minute(30).second(0).toISOString(),
    isAllDay: false,
    color: "#f59e0b",
    location: "Teams Call",
    description: "Sprint planning for the new design system.",
    organizer: { name: "Sara Lee", avatar: "SL" },
    attendees: [
      { name: "Sara Lee", email: "sara@company.com", status: "accepted" },
      { name: "James Wilson", email: "james@company.com", status: "accepted" },
    ],
    recurrence: "weekly",
    meetingLink: "https://teams.microsoft.com/meet/789012",
  },
  {
    id: "evt-4",
    calendarId: "my-calendar",
    title: "All Hands Meeting",
    start: today.add(1, "day").hour(10).minute(0).second(0).toISOString(),
    end: today.add(1, "day").hour(11).minute(0).second(0).toISOString(),
    isAllDay: false,
    color: "#10b981",
    location: "Main Auditorium",
    description: "Company-wide all hands meeting.",
    organizer: { name: "CEO Office", avatar: "CE" },
    attendees: [],
    recurrence: "monthly",
  },
  {
    id: "evt-5",
    calendarId: "my-calendar",
    title: "Project Kickoff",
    start: today.add(2, "day").hour(9).minute(0).second(0).toISOString(),
    end: today.add(2, "day").hour(10).minute(0).second(0).toISOString(),
    isAllDay: false,
    color: "#ef4444",
    location: "Zoom",
    description: "Project Alpha kickoff session.",
    organizer: { name: "James Wilson", avatar: "JW" },
    attendees: [
      { name: "James Wilson", email: "james@company.com", status: "accepted" },
      { name: "Alex Johnson", email: "alex@company.com", status: "pending" },
    ],
    recurrence: "none",
  },
  {
    id: "evt-6",
    calendarId: "ag-bidplan",
    title: "Team Lunch",
    start: today.add(-1, "day").hour(12).minute(30).second(0).toISOString(),
    end: today.add(-1, "day").hour(13).minute(30).second(0).toISOString(),
    isAllDay: false,
    color: "#f97316",
    location: "Cafeteria",
    description: "Monthly team lunch.",
    organizer: { name: "Alex Johnson", avatar: "AJ" },
    attendees: [],
    recurrence: "monthly",
  },
  {
    id: "evt-7",
    calendarId: "us-holidays",
    title: "Company Holiday – Memorial Day",
    start: today.add(5, "day").startOf("day").toISOString(),
    end: today.add(5, "day").endOf("day").toISOString(),
    isAllDay: true,
    color: "#6366f1",
    location: "",
    description: "Public holiday.",
    organizer: { name: "HR", avatar: "HR" },
    attendees: [],
    recurrence: "none",
  },
  {
    id: "evt-8",
    calendarId: "birthdays",
    title: "1:1 with Manager",
    start: today.add(3, "day").hour(15).minute(0).second(0).toISOString(),
    end: today.add(3, "day").hour(15).minute(30).second(0).toISOString(),
    isAllDay: false,
    color: "#1ab1c6",
    location: "Teams",
    description: "",
    organizer: { name: "Alex Johnson", avatar: "AJ" },
    attendees: [
      { name: "Alex Johnson", email: "alex@company.com", status: "accepted" },
      { name: "Maria Garcia", email: "maria@company.com", status: "accepted" },
    ],
    recurrence: "weekly",
    meetingLink: "https://teams.microsoft.com/meet/111222",
  },
  {
    id: "evt-9",
    calendarId: "ag-aptagrim",
    title: "Client Demo",
    start: today.add(4, "day").hour(13).minute(0).second(0).toISOString(),
    end: today.add(4, "day").hour(14).minute(0).second(0).toISOString(),
    isAllDay: false,
    color: "#ec4899",
    location: "Client HQ",
    description: "Product demo for enterprise client.",
    organizer: { name: "Sara Lee", avatar: "SL" },
    attendees: [
      { name: "Sara Lee", email: "sara@company.com", status: "accepted" },
      { name: "James Wilson", email: "james@company.com", status: "accepted" },
      { name: "Alex Johnson", email: "alex@company.com", status: "accepted" },
    ],
    recurrence: "none",
  },
];
