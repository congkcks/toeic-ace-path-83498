import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌐</span>
            </div>
            <span className="text-xl font-bold text-eng-navy">EngBuddy</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-eng-pink transition-colors">Trang chủ</a>
            <a href="/courses" className="text-foreground hover:text-eng-pink transition-colors">Khóa học</a>
            <a href="/dashboard" className="text-foreground hover:text-eng-pink transition-colors">Dashboard</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <a href="/" className="text-foreground hover:text-eng-pink transition-colors">Trang chủ</a>
              <a href="/courses" className="text-foreground hover:text-eng-pink transition-colors">Khóa học</a>
              <a href="/dashboard" className="text-foreground hover:text-eng-pink transition-colors">Dashboard</a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;