import type { Course, CourseDetail, LessonDetail } from "@/types/course";
import type {
  RegisterRequest,
  LoginRequest,
  AuthResponse,
  DashboardHome,
  CourseProgress,
  CourseWithModules,
  ModuleWithLessons,
  UserLesson,
  StartLessonRequest,
  UpdateProgressRequest,
  FinishLessonRequest,
  WatchVideoRequest,
  LearningPlan,
  UserProfile,
} from "@/types/api";

const API_BASE_URL = "https://lotrinh.onrender.com";

// Authentication API
export const authApi = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Registration failed");
    return response.json();
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Login failed");
    return response.json();
  },
};

// Dashboard API
export const dashboardApi = {
  async getHome(userId: number): Promise<DashboardHome> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/home/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch dashboard");
    return response.json();
  },

  async getCourses(userId: number): Promise<CourseProgress[]> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/courses/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch courses");
    return response.json();
  },

  async getCourseModules(courseId: number, userId: number): Promise<CourseWithModules> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/course/${courseId}/modules/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch modules");
    return response.json();
  },

  async getModuleLessons(moduleId: number, userId: number): Promise<ModuleWithLessons> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard/module/${moduleId}/lessons/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch lessons");
    return response.json();
  },
};

// Courses API
export const courseApi = {
  async getCourses(): Promise<Course[]> {
    const response = await fetch(`${API_BASE_URL}/api/courses`);
    if (!response.ok) throw new Error("Failed to fetch courses");
    return response.json();
  },

  async getCourseDetail(courseId: number): Promise<CourseDetail> {
    const response = await fetch(`${API_BASE_URL}/api/courses/${courseId}`);
    if (!response.ok) throw new Error("Failed to fetch course detail");
    return response.json();
  },
};

// Lessons API
export const lessonApi = {
  async getLessonDetail(lessonId: number): Promise<LessonDetail> {
    const response = await fetch(`${API_BASE_URL}/api/lessons/${lessonId}`);
    if (!response.ok) throw new Error("Failed to fetch lesson detail");
    return response.json();
  },

  async getLessonTheory(titleLesson: string): Promise<{ title: string; theory: string }> {
    const response = await fetch(
      `https://btl-d39f.onrender.com/api/grammar/generate?titleLesson=${encodeURIComponent(titleLesson)}`
    );
    if (!response.ok) throw new Error("Failed to fetch lesson theory");
    
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      return response.json();
    } else {
      const theory = await response.text();
      return { title: titleLesson, theory };
    }
  },
};

// User Lessons API
export const userLessonApi = {
  async getUserLesson(userId: number, lessonId: number): Promise<UserLesson | null> {
    const response = await fetch(`${API_BASE_URL}/api/user-lessons/${userId}/${lessonId}`);
    if (response.status === 404) return null;
    if (!response.ok) throw new Error("Failed to fetch user lesson");
    return response.json();
  },

  async startLesson(data: StartLessonRequest): Promise<{ message: string; data: UserLesson }> {
    const response = await fetch(`${API_BASE_URL}/api/user-lessons/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to start lesson");
    return response.json();
  },

  async updateProgress(userId: number, lessonId: number, data: UpdateProgressRequest): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/user-lessons/update-progress/${userId}/${lessonId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update progress");
    return response.json();
  },

  async finishLesson(userId: number, lessonId: number, data: FinishLessonRequest): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/user-lessons/finish/${userId}/${lessonId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to finish lesson");
    return response.json();
  },

  async watchVideo(userId: number, lessonId: number, data: WatchVideoRequest): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/user-lessons/watch/${userId}/${lessonId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update video progress");
    return response.json();
  },
};

// Learning Plan API
export const learningPlanApi = {
  async getPlans(userId: number): Promise<LearningPlan[]> {
    const response = await fetch(`${API_BASE_URL}/api/learning-plan/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch learning plans");
    return response.json();
  },

  async createPlan(data: Omit<LearningPlan, "id" | "createdAt">): Promise<{ message: string; request: LearningPlan }> {
    const response = await fetch(`${API_BASE_URL}/api/learning-plan/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create learning plan");
    return response.json();
  },

  async updatePlan(id: number, data: Partial<LearningPlan>): Promise<{ message: string; plan: LearningPlan }> {
    const response = await fetch(`${API_BASE_URL}/api/learning-plan/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update learning plan");
    return response.json();
  },

  async deletePlan(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/learning-plan/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete learning plan");
    return response.json();
  },
};

// User Profile API
export const userApi = {
  async getProfile(userId: number): Promise<UserProfile> {
    const response = await fetch(`${API_BASE_URL}/api/user/profile/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch user profile");
    return response.json();
  },
};
