// src/types.ts
export interface Task {
  _id: string;
  title: string;
  description: string;
  hashtags: string;
  status: "not_submitted" | "pending" | "rejected" | "completed" | "approved";
  points: number;
  important: boolean;
  createdAt: string | Date;
  expires_at?: string;
}
