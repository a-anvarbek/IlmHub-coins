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
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

// Contexts
import { useLanguage } from "../../contexts/LanguageContext";

export default function FeaturesPage() {
  const { t } = useLanguage();

  const adminFeatures = [
    {
      icon: <Users className="w-6 h-6" />,
      title: t("features.teacher_management"),
      description: t("features.teacher_management_desc"),
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: t("features.item_management"),
      description: t("features.item_management_desc"),
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: t("features.analytics_dashboard"),
      description: t("features.analytics_dashboard_desc"),
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: t("features.system_config"),
      description: t("features.system_config_desc"),
    },
  ];

  const teacherFeatures = [
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: t("features.student_management"),
      description: t("features.student_management_desc"),
    },
    {
      icon: <Coins className="w-6 h-6" />,
      title: t("features.coin_distribution"),
      description: t("features.coin_distribution_desc"),
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t("features.course_materials"),
      description: t("features.course_materials_desc"),
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: t("features.student_progress"),
      description: t("features.student_progress_desc"),
    },
  ];

  const studentFeatures = [
    {
      icon: <Coins className="w-6 h-6" />,
      title: t("features.coin_wallet"),
      description: t("features.coin_wallet_desc"),
    },
    {
      icon: <ShoppingCart className="w-6 h-6" />,
      title: t("features.shop_access"),
      description: t("features.shop_access_desc"),
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: t("features.achievements"),
      description: t("features.achievements_desc"),
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: t("features.learning_resources"),
      description: t("features.learning_resources_desc"),
    },
  ];

  const systemFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("features.security"),
      description: t("features.security_desc"),
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: t("features.responsive"),
      description: t("features.responsive_desc"),
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("features.realtime_updates"),
      description: t("features.realtime_updates_desc"),
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: t("features.role_based"),
      description: t("features.role_based_desc"),
    },
  ];

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
              {t("features.subtitle")}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {t("features.multi_role")}
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {t("features.coin_economy")}
              </Badge>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {t("features.real_time")}
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
                {t("features.admin_panel_desc")}
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
                {t("features.teacher_panel_desc")}
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
                {t("features.student_panel_desc")}
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
                {t("features.more")}
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
              {t("features.cta_title")}
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              {t("features.cta_desc")}
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Shield className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-bold mb-2">{t("features.secure_reliable")}</h3>
                <p className="text-sm text-blue-100">
                  {t("features.security_desc")}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-bold mb-2">{t("features.multi_role_support")}</h3>
                <p className="text-sm text-blue-100">
                  {t("features.multi_role_support")}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Coins className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-bold mb-2">{t("features.reward_system")}</h3>
                <p className="text-sm text-blue-100">
                  {t("features.coin_economy")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
