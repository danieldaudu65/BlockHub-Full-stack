// src/types/job.ts
export interface Job {
  id: string;
  jobTitle: string;
  postedAt: string;
  applicationEnd: string;
  skills?: string[];
  companyDescription?: string;
  candidateRole?: string;
  benefit?: string;
  [key: string]: any;
}
