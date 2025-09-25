// Libraries
import { useState } from "react";
import { Moon, Sun, Globe, User, LogOut, Menu, X } from "lucide-react";

// Components
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";

// Contexts
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

export default function Header({ currentPage, onNavigate }) {
  const { language, setLanguage, t } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { key: "home", label: "IlHub", isLogo: true },
    { key: "about", label: t("nav.about") },
    { key: "features", label: t("nav.features") },
    { key: "contact", label: t("nav.contact") },
  ];

  const handleLogout = () => {
    logout();
    onNavigate("home");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate("home")}
          >
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">I</span>
            </div>
            <span className="text-xl font-bold text-blue-500">IlHub</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.slice(1).map((item) => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`hover:text-blue-500 transition-colors ${
                  currentPage === item.key ? "text-blue-500" : "text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "en" ? "uz" : "en")}
              className="hidden sm:flex"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language.toUpperCase()}
            </Button>

            {/* Theme Toggle */}
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4" />
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
              <Moon className="w-4 h-4" />
            </div>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate(user.role + "-panel")}
                  className="hidden sm:flex"
                >
                  <User className="w-4 h-4 mr-1" />
                  {user.name}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate("login")}
                >
                  {t("nav.login")}
                </Button>
                <Button size="sm" onClick={() => onNavigate("signup")}>
                  {t("nav.signup")}
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 p-4 bg-background/95 backdrop-blur-sm rounded-lg border border-border">
            <nav className="flex flex-col gap-4">
              {navItems.slice(1).map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.key);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left hover:text-blue-500 transition-colors ${
                    currentPage === item.key
                      ? "text-blue-500"
                      : "text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="border-t border-border pt-4 flex flex-col gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === "en" ? "uz" : "en")}
                  className="justify-start"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  {language === "en" ? "O'zbekcha" : "English"}
                </Button>

                {user ? (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onNavigate(user.role + "-panel");
                        setIsMenuOpen(false);
                      }}
                      className="justify-start"
                    >
                      <User className="w-4 h-4 mr-2" />
                      {user.name}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="justify-start"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {t("nav.logout")}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        onNavigate("login");
                        setIsMenuOpen(false);
                      }}
                      className="justify-start"
                    >
                      {t("nav.login")}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        onNavigate("signup");
                        setIsMenuOpen(false);
                      }}
                      className="justify-start"
                    >
                      {t("nav.signup")}
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
