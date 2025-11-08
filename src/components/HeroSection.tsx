import { Button } from "@/components/ui/button";
import { Play, Star, Users, Award } from "lucide-react";
import heroImage from "@/assets/hero-toeic.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background to-muted overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-eng-pink rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-eng-success rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-eng-pink/10 text-eng-pink px-4 py-2 rounded-full text-sm font-medium">
                <span>✅ Không cần đăng nhập - Sử dụng ngay!</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-eng-navy leading-tight">
                Nâng cao kỹ năng tiếng Anh với 
                <span className="bg-gradient-hero bg-clip-text text-transparent"> EngBuddy</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Công cụ học tiếng Anh thông minh giúp bạn tra từ, tạo bài tập và luyện tập với AI chỉ trong một nền tảng.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => window.location.href = '/courses'}
              >
                <Play className="w-5 h-5 mr-2" />
                Bắt đầu ngay
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-4"
                onClick={() => window.location.href = '/dashboard'}
              >
                Khám phá tính năng
              </Button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;