// Libraries
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  UserPlus,
  User,
  Mail,
  Key,
  Eye,
  EyeOff,
  CheckCircle,
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
import { Alert, AlertDescription } from "../../components/ui/alert";

// Redux
import { registerAsync, selectAuth } from "../../utils/redux/authSlice";

// Contexts
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";

export default function SignupPage() {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(selectAuth);
  const { updateUser } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      alert("❌ Password must be at least 6 characters long");
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    };

    console.log("📤 Yuborilayotgan payload:", payload);

    const resultAction = await dispatch(registerAsync(payload));

    if (registerAsync.fulfilled.match(resultAction)) {
      setSuccess("✅ Account created successfully! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      console.error("❌ Registration failed:", resultAction.payload);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{t("auth.signup")}</h1>
            <p className="text-muted-foreground">Join IlmHub Coin community</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <Label htmlFor="fullName">{t("auth.name")} *</Label>
                  <div className="relative">
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="pl-10"
                      autoComplete="name"
                    />
                    <User className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email">{t("auth.email")} *</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                      className="pl-10"
                      autoComplete="email"
                    />
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password">{t("auth.password")} *</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="Create a secure password"
                      className="pl-10 pr-10"
                      autoComplete="new-password" // ✅ qo‘shildi
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

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      autoComplete="new-password" // ✅ qo‘shildi
                    />
                    <Key className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {/* Success */}
                {success && (
                  <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900 dark:text-green-200">
                    <CheckCircle className="w-4 h-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-4 w-4 mr-2"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    t("auth.signup")
                  )}
                </Button>
              </form>

              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="text-purple-600 hover:underline font-medium"
                  >
                    Login here
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
