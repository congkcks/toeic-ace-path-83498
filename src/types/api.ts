// Auth Types
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  userId?: number;
  user?: {
    id: number;
    username: string;
    email: string;
  };
}

// Dashboard Types
export interface DashboardSummary {
  totalCourses: number;
  completedCourses: number;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
  avgScore: number;
  lastAccess: string;
}

export interface SkillStats {
  grammar: number;
  listening: number;
  reading: number;
  vocabulary: number;
}

export interface UserData {
  notesCount: number;
  highlightCount: number;
}

export interface LearningPlan {
  id?: number;
  userId: number;
  title: string;
  description?: string;
  goal?: string;
  startDate?: string;
  endDate?: string;
  isActive: boolean;
  planData?: string;
  createdAt: string;
}

export interface LessonRecommendation {
  id: number;
  title: string;
}

export interface DashboardHome {
  summary: DashboardSummary;
  skills: SkillStats;
  userData: UserData;
  plans: LearningPlan[];
  recommendation: LessonRecommendation | null;
}

export interface CourseProgress {
  courseId: number;
  name: string;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
}

export interface ModuleProgress {
  moduleId: number;
  name: string;
  totalLessons: number;
  completedLessons: number;
  progressPercent: number;
}

export interface CourseWithModules {
  courseId: number;
  name: string;
  modules: ModuleProgress[];
}

export interface LessonProgress {
  id: number;
  title: string;
  isCompleted: boolean;
  progressPercent: number;
}

export interface ModuleWithLessons {
  id: number;
  name: string;
  lessons: LessonProgress[];
}

// User Lesson Types
export interface UserLesson {
  userId: number;
  lessonId: number;
  progressPercent: number;
  isCompleted: boolean;
  score?: number;
  lastWatchedSecond?: number;
  lastAccess: string;
}

export interface StartLessonRequest {
  userId: number;
  lessonId: number;
  progressPercent?: number;
  isCompleted?: boolean;
  score?: number;
  lastWatchedSecond?: number;
}

export interface UpdateProgressRequest {
  progressPercent: number;
}

export interface FinishLessonRequest {
  score: number;
}

export interface WatchVideoRequest {
  lastWatchedSecond: number;
}

// User Profile
export interface UserProfile {
  id: number;
  username: string;
  email: string;
}
