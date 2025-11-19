import type { Course, CourseDetail, LessonDetail } from "@/types/course";

const API_BASE_URL = "https://lotrinh.onrender.com/api";

export const courseApi = {
  async getCourses(): Promise<Course[]> {
    const response = await fetch(`${API_BASE_URL}/courses`);
    if (!response.ok) throw new Error("Failed to fetch courses");
    return response.json();
  },

  async getCourseDetail(courseId: number): Promise<CourseDetail> {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}`);
    if (!response.ok) throw new Error("Failed to fetch course detail");
    return response.json();
  },

  async getLessonDetail(lessonId: number): Promise<LessonDetail> {
    const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}`);
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
