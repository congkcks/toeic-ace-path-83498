import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { courseApi } from "@/services/api";
import type { Course } from "@/types/course";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Loader2 } from "lucide-react";
import { toast } from "sonner";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await courseApi.getCourses();
        setCourses(data);
      } catch (error) {
        toast.error("Không thể tải danh sách khóa học");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      <main className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-eng-navy mb-4">Khóa Học</h1>
          <p className="text-muted-foreground text-lg">
            Chọn khóa học phù hợp với trình độ của bạn
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-eng-pink" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {courses.map((course) => (
              <Card 
                key={course.id} 
                className="group hover:shadow-card transition-all duration-300 border-0 bg-gradient-feature"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-eng-pink/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="h-6 w-6 text-eng-pink" />
                  </div>
                  <CardTitle className="text-xl text-eng-navy">{course.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Khóa học toàn diện với nhiều module và bài học
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={() => navigate(`/courses/${course.id}`)}
                    className="w-full bg-gradient-hero hover:opacity-90 transition-opacity"
                    variant="hero"
                  >
                    Xem Chi Tiết
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CoursesPage;
