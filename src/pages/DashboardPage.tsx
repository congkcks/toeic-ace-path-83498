import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { courseApi } from "@/services/api";
import type { Course } from "@/types/course";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen,
  Loader2,
  PlayCircle,
  Award,
  Target,
  Clock,
  TrendingUp,
  User
} from "lucide-react";
import { toast } from "sonner";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading] = useState(false);
  
  // Mock data
  const profile = {
    full_name: "Học viên",
    avatar_url: null
  };
  
  const stats = {
    current_streak: 0,
    predicted_score: 0,
    completed_lessons: 0,
    total_study_hours: 0
  };
  
  const goals = [
    { id: 1, goal_type: "daily_streak", current_value: 0, target_value: 30, completed: false },
    { id: 2, goal_type: "completed_lessons", current_value: 0, target_value: 100, completed: false }
  ];
  
  const achievements: any[] = [];
  
  const courses: Course[] = [];
  const courseDetails: any[] = [];
  
  const completedLessons = 0;

  const getTotalModules = () => {
    return courseDetails.reduce((total, course) => total + (course.modules?.length || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      <main className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {profile?.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt="Avatar" 
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-eng-pink/10 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-eng-pink" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-eng-navy">
                Xin chào, {profile?.full_name || 'Học viên'}!
              </h1>
              <p className="text-muted-foreground">
                Theo dõi tiến trình học tập của bạn
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-eng-pink" />
          </div>
        ) : (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 bg-gradient-feature">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tổng khóa học</p>
                      <p className="text-2xl font-bold text-eng-pink">{courses.length}</p>
                    </div>
                    <BookOpen className="w-8 h-8 text-eng-pink" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 bg-gradient-feature">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tổng Module</p>
                      <p className="text-2xl font-bold text-eng-navy">{getTotalModules()}</p>
                    </div>
                    <Target className="w-8 h-8 text-eng-navy" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-feature">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Bài học hoàn thành</p>
                      <p className="text-2xl font-bold text-eng-success">{completedLessons}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-eng-success" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-feature">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Thời gian học</p>
                      <p className="text-2xl font-bold text-eng-warning">
                        {stats?.total_study_hours?.toFixed(1) || 0} giờ
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-eng-warning" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content - Courses */}
              <div className="lg:col-span-2 space-y-8">
                <Card className="border-0 bg-gradient-feature">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-eng-navy">
                      <BookOpen className="w-5 h-5 text-eng-pink" />
                      <span>Khóa học của bạn</span>
                    </CardTitle>
                    <CardDescription>
                      Tiếp tục học tập để đạt mục tiêu
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {courses.length === 0 ? (
                      <div className="text-center py-8">
                        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-muted-foreground mb-4">Chưa có khóa học nào</p>
                        <Button onClick={() => navigate('/courses')}>
                          Xem khóa học
                        </Button>
                      </div>
                    ) : (
                      courses.map((course) => {
                        const detail = courseDetails.find(d => d.id === course.id);
                        const moduleCount = detail?.modules?.length || 0;
                        
                        return (
                          <div 
                            key={course.id} 
                            className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:bg-background/80 transition-colors"
                          >
                            <div className="flex items-center space-x-4 flex-1">
                              <div className="w-12 h-12 bg-eng-pink/10 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-eng-pink" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold text-eng-navy">{course.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {moduleCount} Module
                                </p>
                                <div className="mt-2">
                                  <Progress value={0} className="h-2" />
                                  <p className="text-xs text-muted-foreground mt-1">0% hoàn thành</p>
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="hero"
                              onClick={() => navigate(`/courses/${course.id}`)}
                              className="ml-4"
                            >
                              <PlayCircle className="w-4 h-4 mr-2" />
                              Học ngay
                            </Button>
                          </div>
                        );
                      })
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Study Goals */}
                <Card className="border-0 bg-gradient-feature">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-eng-navy">
                      <Target className="w-5 h-5 text-eng-pink" />
                      <span>Mục tiêu</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {goals.map((goal) => {
                        const progress = goal.target_value > 0 
                          ? (goal.current_value / goal.target_value) * 100 
                          : 0;
                        const displayName = goal.goal_type === 'daily_streak' 
                          ? 'Học mỗi ngày' 
                          : 'Hoàn thành bài học';
                        
                        return (
                          <div key={goal.id}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">{displayName}</span>
                              <span className="text-sm text-muted-foreground">
                                {goal.current_value}/{goal.target_value}
                              </span>
                            </div>
                            <Progress value={progress} className="h-2" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="border-0 bg-gradient-feature">
                  <CardHeader>
                    <CardTitle className="text-eng-navy">Hành động nhanh</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate('/courses')}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Xem tất cả khóa học
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        if (courses.length > 0) {
                          navigate(`/courses/${courses[0].id}`);
                        }
                      }}
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Tiếp tục học
                    </Button>
                  </CardContent>
                </Card>

                {/* Achievements */}
                <Card className="border-0 bg-gradient-feature">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-eng-navy">
                      <Award className="w-5 h-5 text-eng-pink" />
                      <span>Thành tích</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {achievements.length === 0 ? (
                      <div className="text-center py-6">
                        <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">
                          Bắt đầu học để mở khóa thành tích
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {achievements.slice(0, 5).map((achievement) => (
                          <div key={achievement.id} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                            <Award className="w-5 h-5 text-eng-pink mt-0.5" />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{achievement.title}</h4>
                              {achievement.description && (
                                <p className="text-xs text-muted-foreground mt-1">
                                  {achievement.description}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DashboardPage;