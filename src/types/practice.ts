// Vocabulary Types
export interface Vocabulary {
  id: number;
  lessonId: number;
  word: string;
  meaning: string;
  example?: string;
  phonetic?: string;
  level?: string;
}

// Grammar Types
export interface GrammarExercise {
  id: number;
  lessonId: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  explanation?: string;
}

// Listening Types
export interface ListeningPractice {
  id: number;
  lessonId: number;
  title?: string;
  audioUrl?: string;
  transcript: string;
}

// Reading Types
export interface ReadingPassage {
  id: number;
  lessonId: number;
  title: string;
  contentHtml: string;
}

export interface ReadingQuestion {
  id: number;
  passageId: number;
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
}

export interface ReadingContent {
  passage: ReadingPassage;
  questions: ReadingQuestion[];
}

// Dictation Types
export interface Dictation {
  id: number;
  lessonId: number;
  audioText: string;
  correctText: string;
}

// User Notes Types
export interface UserNote {
  id?: number;
  userId: number;
  lessonId: number;
  note: string;
  createdAt: string;
}

export interface AddNoteRequest {
  userId: number;
  lessonId: number;
  note: string;
}

export interface UpdateNoteRequest {
  note: string;
}

// User Highlights Types
export interface UserHighlight {
  id?: number;
  userId: number;
  lessonId: number;
  startIndex: number;
  endIndex: number;
  color: string;
  createdAt?: string;
}

export interface AddHighlightRequest {
  userId: number;
  lessonId: number;
  startIndex: number;
  endIndex: number;
  color: string;
}

export interface UpdateHighlightRequest {
  startIndex: number;
  endIndex: number;
  color: string;
}

// Dashboard Stats Types
export interface DashboardStats {
  vocabularyCount: number;
  notesCount: number;
  highlightsCount: number;
  grammarCompleted: number;
  readingCompleted: number;
  listeningCompleted: number;
  flashcardMastered: number;
}

// Progress Submission Types
export interface GrammarProgressRequest {
  userId: number;
  grammarExerciseId: number;
  score?: number;
}

export interface ReadingProgressRequest {
  userId: number;
  readingPassageId: number;
  score?: number;
}

export interface ListeningProgressRequest {
  userId: number;
  listeningPracticeId: number;
  score?: number;
}

export interface FlashcardMasterRequest {
  userId: number;
  flashcardId: number;
  reviewCount?: number;
}
