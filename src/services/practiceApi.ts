import type {
  Vocabulary,
  GrammarExercise,
  ListeningPractice,
  ReadingContent,
  Dictation,
  UserNote,
  AddNoteRequest,
  UpdateNoteRequest,
  UserHighlight,
  AddHighlightRequest,
  UpdateHighlightRequest,
  DashboardStats,
  GrammarProgressRequest,
  ReadingProgressRequest,
  ListeningProgressRequest,
  FlashcardMasterRequest,
} from "@/types/practice";

const API_BASE_URL = "https://lotrinh-1.onrender.com";

// Practice Content API
export const vocabularyApi = {
  async getByLesson(lessonId: number): Promise<Vocabulary[]> {
    const response = await fetch(`${API_BASE_URL}/api/vocabulary/${lessonId}`);
    if (!response.ok) throw new Error("Failed to fetch vocabulary");
    return response.json();
  },
};

export const grammarApi = {
  async getByLesson(lessonId: number): Promise<GrammarExercise[]> {
    const response = await fetch(`${API_BASE_URL}/api/grammar/${lessonId}`);
    if (!response.ok) throw new Error("Failed to fetch grammar exercises");
    return response.json();
  },
};

export const listeningApi = {
  async getByLesson(lessonId: number): Promise<ListeningPractice[]> {
    const response = await fetch(`${API_BASE_URL}/api/listening/${lessonId}`);
    if (!response.ok) throw new Error("Failed to fetch listening exercises");
    return response.json();
  },
};

export const readingApi = {
  async getByLesson(lessonId: number): Promise<ReadingContent> {
    const response = await fetch(`${API_BASE_URL}/api/reading/${lessonId}`);
    if (!response.ok) throw new Error("Failed to fetch reading content");
    return response.json();
  },
};

export const dictationApi = {
  async getByLesson(lessonId: number): Promise<Dictation[]> {
    const response = await fetch(`${API_BASE_URL}/api/dictation/${lessonId}`);
    if (!response.ok) throw new Error("Failed to fetch dictation exercises");
    return response.json();
  },
};

// User Notes API
export const userNoteApi = {
  async getNotes(userId: number, lessonId: number): Promise<UserNote[]> {
    const response = await fetch(`${API_BASE_URL}/api/user-notes/${userId}/${lessonId}`);
    if (!response.ok) throw new Error("Failed to fetch notes");
    return response.json();
  },

  async addNote(data: AddNoteRequest): Promise<{ message: string; note: UserNote }> {
    const response = await fetch(`${API_BASE_URL}/api/user-notes/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to add note");
    return response.json();
  },

  async updateNote(id: number, data: UpdateNoteRequest): Promise<{ message: string; note: UserNote }> {
    const response = await fetch(`${API_BASE_URL}/api/user-notes/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update note");
    return response.json();
  },

  async deleteNote(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/user-notes/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete note");
    return response.json();
  },
};

// User Highlights API
export const userHighlightApi = {
  async getHighlights(userId: number, lessonId: number): Promise<UserHighlight[]> {
    const response = await fetch(`${API_BASE_URL}/api/user-highlights/${userId}/${lessonId}`);
    if (!response.ok) throw new Error("Failed to fetch highlights");
    return response.json();
  },

  async addHighlight(data: AddHighlightRequest): Promise<{ message: string; highlight: UserHighlight }> {
    const response = await fetch(`${API_BASE_URL}/api/user-highlights/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to add highlight");
    return response.json();
  },

  async updateHighlight(id: number, data: UpdateHighlightRequest): Promise<{ message: string; highlight: UserHighlight }> {
    const response = await fetch(`${API_BASE_URL}/api/user-highlights/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update highlight");
    return response.json();
  },

  async deleteHighlight(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/api/user-highlights/delete/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete highlight");
    return response.json();
  },
};

// Dashboard Stats API
export const dashboardStatsApi = {
  async getVocabularyCount(userId: number): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard-stats/vocabulary/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch vocabulary count");
    return response.json();
  },

  async getNotesCount(userId: number): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard-stats/notes/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch notes count");
    return response.json();
  },

  async getHighlightsCount(userId: number): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard-stats/highlights/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch highlights count");
    return response.json();
  },

  async getGrammarCompleted(userId: number): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard-stats/grammar-completed/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch grammar stats");
    return response.json();
  },

  async getReadingCompleted(userId: number): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard-stats/reading-completed/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch reading stats");
    return response.json();
  },

  async getListeningCompleted(userId: number): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard-stats/listening-completed/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch listening stats");
    return response.json();
  },

  async getFlashcardMastered(userId: number): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard-stats/flashcard-mastered/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch flashcard stats");
    return response.json();
  },

  async getSummary(userId: number): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/api/dashboard-stats/summary/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch dashboard stats");
    return response.json();
  },
};

// User Progress API
export const userProgressApi = {
  async submitGrammar(data: GrammarProgressRequest): Promise<{ message: string; data: any }> {
    const response = await fetch(`${API_BASE_URL}/api/user-progress/grammar/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to submit grammar progress");
    return response.json();
  },

  async getGrammarCompleted(userId: number): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/api/user-progress/grammar/completed/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch grammar completed");
    return response.json();
  },

  async submitReading(data: ReadingProgressRequest): Promise<{ message: string; data: any }> {
    const response = await fetch(`${API_BASE_URL}/api/user-progress/reading/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to submit reading progress");
    return response.json();
  },

  async getReadingCompleted(userId: number): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/api/user-progress/reading/completed/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch reading completed");
    return response.json();
  },

  async submitListening(data: ListeningProgressRequest): Promise<{ message: string; data: any }> {
    const response = await fetch(`${API_BASE_URL}/api/user-progress/listening/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to submit listening progress");
    return response.json();
  },

  async getListeningCompleted(userId: number): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/api/user-progress/listening/completed/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch listening completed");
    return response.json();
  },

  async masterFlashcard(data: FlashcardMasterRequest): Promise<{ message: string; data: any }> {
    const response = await fetch(`${API_BASE_URL}/api/user-progress/flashcard/master`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to master flashcard");
    return response.json();
  },

  async getFlashcardMastered(userId: number): Promise<number> {
    const response = await fetch(`${API_BASE_URL}/api/user-progress/flashcard/mastered/${userId}`);
    if (!response.ok) throw new Error("Failed to fetch flashcard mastered");
    return response.json();
  },
};
