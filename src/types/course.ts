export interface Course {
  id: number;
  name: string;
}

export interface Lesson {
  id: number;
  title: string;
}

export interface Module {
  id: number;
  name: string;
  lessons: Lesson[];
}

export interface CourseDetail {
  id: number;
  name: string;
  modules: Module[];
}

export interface Video {
  id: number;
  title: string;
  filePath: string;
}

export interface Exercise {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  explanation: string;
}

export interface ExerciseType {
  id: number;
  name: string;
  exercises: Exercise[];
}

export interface LessonDetail {
  id: number;
  title: string;
  videos: Video[];
  exerciseTypes: ExerciseType[];
  theory?: string;
}
