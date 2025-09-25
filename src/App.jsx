// Libraries
import { useState } from "react";

// Pages
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import FeaturesPage from "./components/FeaturesPage";
import ContactPage from "./components/ContactPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";

// Panels
import AdminPanel from "./components/AdminPanel";
import TeacherPanel from "./components/TeacherPanel";
import StudentPanel from "./components/StudentPanel";

// Components
import Header from "./components/Header";
import { Toaster } from "./components/ui/sonner";

// Contexts 
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigation} />;
      case "about":
        return <AboutPage />;
      case "features":
        return <FeaturesPage />;
      case "contact":
        return <ContactPage />;
      case "login":
        return <LoginPage onNavigate={handleNavigation} />;
      case "signup":
        return <SignupPage onNavigate={handleNavigation} />;
      case "admin-panel":
        return <AdminPanel />;
      case "teacher-panel":
        return <TeacherPanel />;
      case "student-panel":
        return <StudentPanel />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header currentPage={currentPage} onNavigate={handleNavigation} />
            <main>{renderPage()}</main>
            <Toaster />
          </div>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
