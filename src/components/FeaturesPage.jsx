// Libraries
import {
  Shield,
  Users,
  GraduationCap,
  UserCheck,
  Coins,
  ShoppingCart,
  BarChart3,
  Settings,
  BookOpen,
  Trophy,
  Clock,
  Smartphone,
} from "lucide-react";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

// Contexts
import { useLanguage } from "../contexts/LanguageContext";

const adminFeatures = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Teacher Management",
    description: "Add, edit, and manage teacher accounts and permissions",
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Item Management",
    description: "Create and manage shop items that students can purchase",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics Dashboard",
    description: "View comprehensive reports and statistics",
  },
  {
    icon: <Settings className="w-6 h-6" />,
    title: "System Configuration",
    description: "Configure system settings and preferences",
  },
];

const teacherFeatures = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    title: "Student Management",
    description: "Add new students and generate unique 10-digit IDs",
  },
  {
    icon: <Coins className="w-6 h-6" />,
    title: "Coin Distribution",
    description: "Reward students with coins for achievements",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Course Materials",
    description: "Access and share educational resources",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Student Progress",
    description: "Track and monitor student performance",
  },
];

const studentFeatures = [
  {
    icon: <Coins className="w-6 h-6" />,
    title: "Coin Wallet",
    description: "View your coin balance and transaction history",
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Shop Access",
    description: "Purchase educational materials and rewards",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Achievements",
    description: "Track your learning milestones and accomplishments",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Learning Resources",
    description: "Access course materials and assignments",
  },
];

const systemFeatures = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Secure Authentication",
    description: "Multi-role authentication system with secure login",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Responsive Design",
    description: "Works perfectly on all devices - desktop, tablet, mobile",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Real-time Updates",
    description: "Instant notifications and live data synchronization",
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: "Role-based Access",
    description: "Different interfaces for admin, teachers, and students",
  },
];

export default function FeaturesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("features.title")}
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Discover the powerful features that make IlmHub Coin the perfect
              educational platform
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Multi-role System
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Coin Economy
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                Real-time
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Panel Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("features.admin_panel")}
              </h2>
              <p className="text-muted-foreground text-lg">
                Complete administrative control and management capabilities
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {adminFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-3">
                      <div className="text-red-600 dark:text-red-400">
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Panel Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("features.teacher_panel")}
              </h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive tools for educators to manage and engage students
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teacherFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-3">
                      <div className="text-green-600 dark:text-green-400">
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Student Panel Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("features.student_panel")}
              </h2>
              <p className="text-muted-foreground text-lg">
                Engaging features designed to motivate and reward learning
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studentFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3">
                      <div className="text-blue-600 dark:text-blue-400">
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* System Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("features.coin_system")} & More
              </h2>
              <p className="text-muted-foreground text-lg">
                Advanced system features ensuring security, reliability, and
                great user experience
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {systemFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-3">
                      <div className="text-purple-600 dark:text-purple-400">
                        {feature.icon}
                      </div>
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience These Features?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join  today and discover how our innovative platform can
              transform your learning experience.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Shield className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-bold mb-2">Secure & Reliable</h3>
                <p className="text-sm text-blue-100">
                  Enterprise-grade security
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-bold mb-2">Multi-role Support</h3>
                <p className="text-sm text-blue-100">
                  Admin, Teacher, Student panels
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Coins className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-bold mb-2">Reward System</h3>
                <p className="text-sm text-blue-100">
                  Motivational coin economy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
