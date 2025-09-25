// Libraries
import { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Alert, AlertDescription } from "./ui/alert";

// Contexts
import { useLanguage } from "../contexts/LanguageContext";
import { useAuth } from "../contexts/AuthContext";

export default function SignupPage({ onNavigate }) {
  const { t } = useLanguage();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (!formData.role) {
      setError("Please select a role");
      setLoading(false);
      return;
    }

    try {
      const successResponse = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (successResponse) {
        setSuccess("Account created successfully! You can now login.");
        setTimeout(() => {
          onNavigate("login");
        }, 2000);
      } else {
        setError("Failed to create account. Please try again.");
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

  const handleRoleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
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
            <p className="text-muted-foreground">Join IlHub Coin community</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Create Your Account</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">{t("auth.name")} *</Label>
                  <div className="relative">
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="pl-10"
                    />
                    <User className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </div>

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
                    />
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role">{t("auth.role")} *</Label>
                  <Select
                    value={formData.role}
                    onValueChange={handleRoleChange}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        {t("auth.student")}
                      </SelectItem>
                      <SelectItem value="teacher">
                        {t("auth.teacher")}
                      </SelectItem>
                      <SelectItem value="admin">{t("auth.admin")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                  <p className="text-xs text-muted-foreground mt-1">
                    Password must be at least 6 characters long
                  </p>
                </div>

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

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900 dark:text-green-200">
                    <CheckCircle className="w-4 h-4" />
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating Account..." : t("auth.signup")}
                </Button>
              </form>

              <div className="mt-6">
                <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                  <h4 className="font-medium mb-2">Role Information:</h4>
                  <ul className="space-y-1 text-xs">
                    <li>
                      <strong>Student:</strong> Access learning materials, earn
                      coins, shop for rewards
                    </li>
                    <li>
                      <strong>Teacher:</strong> Manage students, distribute
                      coins, track progress
                    </li>
                    <li>
                      <strong>Admin:</strong> Full system access, manage
                      teachers and items
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button
                    onClick={() => onNavigate("login")}
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
