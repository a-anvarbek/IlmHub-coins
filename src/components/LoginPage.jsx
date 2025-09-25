// Libraries
import { useState } from "react";
import {
  LogIn,
  User,
  GraduationCap,
  Shield,
  Eye,
  EyeOff,
  Mail,
  Key,
} from "lucide-react";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Alert, AlertDescription } from "./ui/alert";

// Contexts
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

export default function LoginPage({ onNavigate }) {
  const { t } = useLanguage();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    studentId: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const credentials = {
        password: formData.password,
      };

      if (loginType === "student") {
        credentials.studentId = formData.studentId;
      } else {
        credentials.email = formData.email;
      }

      const success = await login(credentials);

      if (success) {
        onNavigate("home");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const demoCredentials = {
    admin: { email: "admin@ilhub.uz", password: "admin123" },
    teacher: { email: "ozoda@ilhub.uz", password: "teacher123" },
    student: { studentId: "1234567890", password: "student123" },
  };

  const fillDemoCredentials = () => {
    if (loginType === "student") {
      setFormData({
        email: "",
        studentId: demoCredentials.student.studentId,
        password: demoCredentials.student.password,
      });
    } else {
      setFormData({
        email: demoCredentials[loginType].email,
        studentId: "",
        password: demoCredentials[loginType].password,
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <LogIn className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{t("auth.login")}</h1>
            <p className="text-muted-foreground">Welcome back to IlHub Coin</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Select Your Role</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={loginType}
                onValueChange={(value) => setLoginType(value)}
                className="mb-6"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger
                    value="student"
                    className="flex items-center gap-1"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Student
                  </TabsTrigger>
                  <TabsTrigger
                    value="teacher"
                    className="flex items-center gap-1"
                  >
                    <User className="w-4 h-4" />
                    Teacher
                  </TabsTrigger>
                  <TabsTrigger
                    value="admin"
                    className="flex items-center gap-1"
                  >
                    <Shield className="w-4 h-4" />
                    Admin
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {loginType === "student" ? (
                      <div>
                        <Label htmlFor="studentId">
                          {t("auth.student_id")}
                        </Label>
                        <div className="relative">
                          <Input
                            id="studentId"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            required
                            placeholder="Enter your 10-digit student ID"
                            className="pl-10"
                          />
                          <Key className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Label htmlFor="email">{t("auth.email")}</Label>
                        <div className="relative">
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                            className="pl-10"
                          />
                          <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                        </div>
                      </div>
                    )}

                    <div>
                      <Label htmlFor="password">{t("auth.password")}</Label>
                      <div className="relative">
                        <Input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={handleChange}
                          required
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                        />
                        <Key className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Signing in..." : t("auth.login")}
                    </Button>
                  </form>

                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      Demo credentials:
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={fillDemoCredentials}
                      className="w-full text-xs"
                    >
                      Use demo {loginType} credentials
                    </Button>
                    <div className="text-xs text-muted-foreground mt-2">
                      {loginType === "student" ? (
                        <>ID: {demoCredentials.student.studentId}</>
                      ) : (
                        <>Email: {demoCredentials[loginType].email}</>
                      )}
                      <br />
                      Password: {demoCredentials[loginType].password}
                    </div>
                  </div>
                </div>
              </Tabs>

              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <button
                    onClick={() => onNavigate("signup")}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Sign up here
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
