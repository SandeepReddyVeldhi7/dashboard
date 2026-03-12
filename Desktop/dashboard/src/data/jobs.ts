export interface Candidate {
  id: number;
  totalCandidates: number;
  resumeScreened: number;
  inProgress: number;
  hired: number;
  rejected: number;
}

export interface Job {
  id: string;
  title: string;
  status: string;
  location: string;
  candidates: Candidate[];
}

export const jobs: Job[] = [
  {
    id: "FLUO1J67",
    title: "Testing",
    status: "Full-time",
    location: "Hyderabad-India",
    candidates: [{ id: 1, totalCandidates: 1, resumeScreened: 0, inProgress: 0, hired: 0, rejected: 1 }],
  },
  {
    id: "FLUO1J66",
    title: "QA",
    status: "Full-time",
    location: "Hyderabad-India",
    candidates: [{ id: 1, totalCandidates: 2, resumeScreened: 0, inProgress: 1, hired: 0, rejected: 1 }],
  },
  {
    id: "FLUO1J65",
    title: "SDET 1",
    status: "Full-time",
    location: "Hyderabad-India",
    candidates: [{ id: 1, totalCandidates: 0, resumeScreened: 0, inProgress: 0, hired: 0, rejected: 0 }],
  },
  {
    id: "FLUO1J61",
    title: "Business Analyst",
    status: "Internship",
    location: "Hyderabad-India +2",
    candidates: [{ id: 1, totalCandidates: 1, resumeScreened: 0, inProgress: 0, hired: 0, rejected: 1 }],
  },
  {
    id: "FLUO1J60",
    title: "Software Development Engi...",
    status: "Full-time",
    location: "Hyderabad-India",
    candidates: [{ id: 1, totalCandidates: 1, resumeScreened: 0, inProgress: 0, hired: 0, rejected: 1 }],
  },
  {
    id: "FLUO1J59",
    title: "Manual Testing",
    status: "Full-time",
    location: "Hyderabad-India",
    candidates: [{ id: 1, totalCandidates: 12, resumeScreened: 2, inProgress: 3, hired: 1, rejected: 6 }],
  },
  {
    id: "FLUO1J53",
    title: "QA Engineer (1)",
    status: "Full-time",
    location: "Hyderabad-India",
    candidates: [{ id: 1, totalCandidates: 11, resumeScreened: 1, inProgress: 2, hired: 3, rejected: 5 }],
  },
];
