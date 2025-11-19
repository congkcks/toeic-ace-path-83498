import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-foreground hover:text-eng-pink transition-colors">Trang chủ</a>
            <a href="/courses" className="text-foreground hover:text-eng-pink transition-colors">Khóa học</a>
            <a href="/dashboard" className="text-foreground hover:text-eng-pink transition-colors">Dashboard</a>
            
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.username}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                  Đăng nhập
                </Button>
                <Button size="sm" onClick={() => navigate("/register")}>
                  Đăng ký
                </Button>
              </div>
            )}
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
              
              {user ? (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4" />
                    <span>{user.username}</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleLogout} className="w-full">
                    <LogOut className="h-4 w-4 mr-2" />
                    Đăng xuất
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                    Đăng nhập
                  </Button>
                  <Button size="sm" onClick={() => navigate("/register")}>
                    Đăng ký
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;