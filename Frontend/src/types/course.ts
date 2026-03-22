// types/course.ts
export type LessonType = "note" | "video";

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  points: number;
}

// Cloudinary uploaded file type
export interface UploadedFile {
  id: string;     // Cloudinary public_id
  name: string;
  url: string;
  size: number;   // MB
  type: string;   // PDF, MP4, etc.
}

export interface Lesson {
  videoUrl: string;
  title: string;
  description: string;
  type: LessonType;
  content: string | UploadedFile | null;  // for video or main content
  quizEnabled: boolean;
  quiz: QuizQuestion[];
  open: boolean;
  typeDropdownOpen?: boolean;
  files: UploadedFile[];                  // <-- updated type
}

export interface CourseData {
  totalEnrollments: number;
  _id: string;
  name: string;
  overview: string;
  thumbnail: File | null;
  level: string;
  tag: string;
  twitter: string;
  website: string;
  lessons: Lesson[];
}