import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { courseApi } from "@/services/api";
import type { Course, CourseDetail } from "@/types/course";
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
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

const DashboardPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseDetails, setCourseDetails] = useState<CourseDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesData = await courseApi.getCourses();
        setCourses(coursesData);
        
        // Fetch details for each course
        const detailsPromises = coursesData.map(course => 
          courseApi.getCourseDetail(course.id).catch(() => null)
        );
        const details = await Promise.all(detailsPromises);
        setCourseDetails(details.filter((d): d is CourseDetail => d !== null));
      } catch (error) {
        toast.error("Không thể tải dữ liệu");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate total modules across all courses
  const getTotalModules = () => {
    return courseDetails.reduce((total, course) => total + (course.modules?.length || 0), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      <main className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-eng-navy mb-2">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Theo dõi tiến trình học tập của bạn
          </p>
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
                      <p className="text-sm font-medium text-muted-foreground">Tiến độ</p>
                      <p className="text-2xl font-bold text-eng-success">0%</p>
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
                      <p className="text-2xl font-bold text-eng-warning">0 giờ</p>
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
                    {courses.map((course) => {
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
                    })}
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
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Hoàn thành khóa học</span>
                          <span className="text-sm text-muted-foreground">0/{courses.length}</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Học mỗi ngày</span>
                          <span className="text-sm text-muted-foreground">0 ngày</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
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
                    <div className="text-center py-6">
                      <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">
                        Bắt đầu học để mở khóa thành tích
                      </p>
                    </div>
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
