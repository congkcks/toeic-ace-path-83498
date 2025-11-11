import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

export interface UserStats {
  current_streak: number;
  longest_streak: number;
  total_study_hours: number;
  completed_lessons: number;
  predicted_score: number;
  last_study_date: string | null;
}

export interface UserGoal {
  id: string;
  goal_type: string;
  target_value: number;
  current_value: number;
  completed: boolean;
}

export interface UserAchievement {
  id: string;
  achievement_type: string;
  title: string;
  description: string | null;
  earned_at: string;
}

export interface UserProgress {
  lesson_id: number;
  completed: boolean;
  score: number | null;
  completed_at: string | null;
}

export function useUserData() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [goals, setGoals] = useState<UserGoal[]>([]);
  const [achievements, setAchievements] = useState<UserAchievement[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      setProfile(profileData);

      // Fetch stats
      const { data: statsData } = await supabase
        .from("user_study_stats")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      setStats(statsData);

      // Fetch goals
      const { data: goalsData } = await supabase
        .from("user_goals")
        .select("*")
        .eq("user_id", user.id);

      setGoals(goalsData || []);

      // Fetch achievements
      const { data: achievementsData } = await supabase
        .from("user_achievements")
        .select("*")
        .eq("user_id", user.id)
        .order("earned_at", { ascending: false });

      setAchievements(achievementsData || []);

      // Fetch progress
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", user.id);

      setProgress(progressData || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id);

    if (!error) {
      await fetchUserData();
    }
    return { error };
  };

  const updateStats = async (updates: Partial<UserStats>) => {
    if (!user) return;

    const { error } = await supabase
      .from("user_study_stats")
      .update(updates)
      .eq("user_id", user.id);

    if (!error) {
      await fetchUserData();
    }
    return { error };
  };

  const markLessonComplete = async (lessonId: number, score?: number) => {
    if (!user) return;

    const { error } = await supabase.from("user_progress").upsert({
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      score,
      completed_at: new Date().toISOString(),
    });

    if (!error) {
      await fetchUserData();
    }
    return { error };
  };

  const getLessonProgress = (lessonId: number) => {
    return progress.find((p) => p.lesson_id === lessonId);
  };

  const getCompletedLessonsCount = () => {
    return progress.filter((p) => p.completed).length;
  };

  const calculateProgress = (totalLessons: number) => {
    if (totalLessons === 0) return 0;
    return Math.round((getCompletedLessonsCount() / totalLessons) * 100);
  };

  return {
    profile,
    stats,
    goals,
    achievements,
    progress,
    loading,
    updateProfile,
    updateStats,
    markLessonComplete,
    getLessonProgress,
    getCompletedLessonsCount,
    calculateProgress,
    refetch: fetchUserData,
  };
}
