import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { courseApi } from "@/services/api";
import type { LessonDetail, Exercise } from "@/types/course";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Video, CheckCircle2, XCircle, Loader2, BookOpen } from "lucide-react";
import { toast } from "sonner";

const LessonDetailPage = () => {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState<LessonDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [theoryLoading, setTheoryLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessonDetail = async () => {
      if (!lessonId) return;
      
      try {
        const data = await courseApi.getLessonDetail(Number(lessonId));
        setLesson(data);
        
        // Fetch theory after getting lesson details
        setTheoryLoading(true);
        try {
          const theoryData = await courseApi.getLessonTheory(data.title);
          setLesson(prev => prev ? { ...prev, theory: theoryData.theory } : null);
        } catch (error) {
          console.error("Could not fetch theory:", error);
        } finally {
          setTheoryLoading(false);
        }
      } catch (error) {
        toast.error("Không thể tải chi tiết bài học");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonDetail();
  }, [lessonId]);

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

  if (!lesson) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy bài học</h1>
          <Button onClick={() => navigate(-1)}>Quay lại</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const allExercises = lesson.exerciseTypes.flatMap(type => type.exercises);
  const currentQuestion = allExercises[currentQuestionIndex];

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) {
      toast.error("Vui lòng chọn một đáp án");
      return;
    }

    setShowExplanation(true);
    
    if (!answeredQuestions.has(currentQuestionIndex)) {
      if (selectedAnswer === currentQuestion.correctOption) {
        setScore(score + 1);
      }
      setAnsweredQuestions(new Set([...answeredQuestions, currentQuestionIndex]));
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < allExercises.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setShowExplanation(false);
    } else {
      toast.success(`Hoàn thành! Điểm của bạn: ${score}/${allExercises.length}`);
    }
  };

  const getGoogleDriveEmbedUrl = (url: string) => {
    // Handle file URLs: /file/d/FILE_ID/view or /file/d/FILE_ID
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) {
      return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
    }
    
    // Handle folder URLs: /folders/FOLDER_ID
    const folderMatch = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
    if (folderMatch) {
      return `https://drive.google.com/embeddedfolderview?id=${folderMatch[1]}#grid`;
    }
    
    // If already an embed URL or unknown format, return as is
    return url;
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại
        </Button>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-3xl">{lesson.title}</CardTitle>
            </CardHeader>
          </Card>

          {lesson.theory && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Lý thuyết
                </CardTitle>
              </CardHeader>
              <CardContent>
                {theoryLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
                    {lesson.theory}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {lesson.videos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  Video bài học
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {lesson.videos.map((video) => (
                  <div key={video.id} className="space-y-2">
                    <h3 className="font-semibold">{video.title}</h3>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <iframe
                        src={getGoogleDriveEmbedUrl(video.filePath)}
                        className="w-full h-full"
                        allow="autoplay"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {allExercises.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Bài tập</CardTitle>
                  <span className="text-sm text-muted-foreground">
                    Câu {currentQuestionIndex + 1}/{allExercises.length}
                  </span>
                </div>
                <Progress 
                  value={((currentQuestionIndex + 1) / allExercises.length) * 100} 
                  className="mt-2"
                />
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    {currentQuestion.question}
                  </h3>
                  
                  <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
                    <div className="space-y-3">
                      {['A', 'B', 'C', 'D'].map((option) => {
                        const optionKey = `option${option}` as keyof Exercise;
                        const isCorrect = option === currentQuestion.correctOption;
                        const isSelected = option === selectedAnswer;
                        
                        return (
                          <div
                            key={option}
                            className={`flex items-center space-x-2 p-4 border rounded-lg transition-colors ${
                              showExplanation && isCorrect
                                ? 'border-green-500 bg-green-50 dark:bg-green-950'
                                : showExplanation && isSelected && !isCorrect
                                ? 'border-red-500 bg-red-50 dark:bg-red-950'
                                : 'hover:bg-accent'
                            }`}
                          >
                            <RadioGroupItem value={option} id={option} disabled={showExplanation} />
                            <Label htmlFor={option} className="flex-1 cursor-pointer">
                              <span className="font-semibold mr-2">{option}.</span>
                              {currentQuestion[optionKey]}
                            </Label>
                            {showExplanation && isCorrect && (
                              <CheckCircle2 className="h-5 w-5 text-green-600" />
                            )}
                            {showExplanation && isSelected && !isCorrect && (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </RadioGroup>
                </div>

                {showExplanation && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="font-semibold mb-2">Giải thích:</h4>
                    <p>{currentQuestion.explanation}</p>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    Điểm: {score}/{allExercises.length}
                  </p>
                  <div className="flex gap-2">
                    {!showExplanation ? (
                      <Button onClick={handleSubmitAnswer}>
                        Kiểm tra đáp án
                      </Button>
                    ) : (
                      <Button onClick={handleNextQuestion}>
                        {currentQuestionIndex < allExercises.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LessonDetailPage;
