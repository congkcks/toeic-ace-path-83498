import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseApi } from "@/services/api";
import type { CourseDetail } from "@/types/course";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookOpen, PlayCircle, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetail = async () => {
      if (!courseId) return;
      
      try {
        const data = await courseApi.getCourseDetail(Number(courseId));
        setCourse(data);
      } catch (error) {
        toast.error("Không thể tải chi tiết khóa học");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetail();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy khóa học</h1>
          <Button onClick={() => navigate("/courses")}>Quay lại</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate("/courses")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại danh sách khóa học
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-3xl">{course.name}</CardTitle>
              <CardDescription>
                {course.modules.length} modules với {totalLessons} bài học
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Nội dung khóa học</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {course.modules.map((module) => (
                <AccordionItem key={module.id} value={`module-${module.id}`} className="border rounded-lg px-6">
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold">{module.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {module.lessons.length} bài học
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2 pt-4">
                      {module.lessons.length === 0 ? (
                        <p className="text-muted-foreground text-sm">Chưa có bài học</p>
                      ) : (
                        module.lessons.map((lesson) => (
                          <Card
                            key={lesson.id}
                            className="hover:bg-accent transition-colors cursor-pointer"
                            onClick={() => navigate(`/lessons/${lesson.id}`)}
                          >
                            <CardContent className="p-4 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <PlayCircle className="h-5 w-5 text-primary" />
                                <span>{lesson.title}</span>
                              </div>
                              <Button size="sm" variant="default">
                                Học ngay
                              </Button>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPage;