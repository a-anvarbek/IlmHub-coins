// Libraries
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Alert, AlertDescription } from "../../components/ui/alert";

// Redux
import { loginAsync, selectAuth } from "../../utils/redux/authSlice";

// Routes
import ROUTES from "../../router/routes";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, role, status } = useSelector(selectAuth);

  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    studentId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect after successful login
  useEffect(() => {
    if (status === "succeeded" && token && role !== null) {
      const numericRole = Number(role);
      if (numericRole === 0) navigate(ROUTES.ADMIN);
      else if (numericRole === 1) navigate(ROUTES.TEACHER);
      else if (numericRole === 2) navigate(ROUTES.STUDENT);
    }
  }, [status, token, role, navigate]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const credentials = {
        identifier:
          loginType === "student" ? formData.studentId : formData.email,
        password: formData.password,
      };

      const resultAction = await dispatch(loginAsync(credentials));
      const result = resultAction.payload;

      if (!result) {
        setError("Incorrect credentials");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
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
            <h1 className="text-3xl font-bold mb-2">Login</h1>
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

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                  {loginType === "student" ? (
                    <div>
                      <Label htmlFor="studentId">Student ID</Label>
                      <div className="relative">
                        <Input
                          id="studentId"
                          name="studentId"
                          value={formData.studentId}
                          onChange={handleChange}
                          required
                          placeholder="Enter your Student ID"
                          className="pl-10"
                          autoComplete="off"
                        />
                        <Key className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <Label htmlFor="email">Email</Label>
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
                          autoComplete="off"
                        />
                        <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="pl-10 pr-10"
                        placeholder="Enter your password"
                        autoComplete="new-password"
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
                    {loading ? "Signing in..." : "Login"}
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                      onClick={() => navigate(ROUTES.SIGN_UP)}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Sign up here
                    </button>
                  </p>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
