// Libraries
import { Phone, Users, BookOpen, Award } from "lucide-react";

// components
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

// Contexts
import { useLanguage } from "../../contexts/LanguageContext";

const features = [
  {
    icon: <Users className="w-8 h-8 text-blue-500" />,
    title: "Expert Teachers",
    description: "Qualified and experienced instructors",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-green-500" />,
    title: "Modern Curriculum",
    description: "Up-to-date courses and materials",
  },
  {
    icon: <Award className="w-8 h-8 text-purple-500" />,
    title: "Coin System",
    description: "Reward-based learning approach",
  },
];

export default function HomePage({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 dark:from-blue-800 dark:via-blue-900 dark:to-gray-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t("home.title")}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100">
              {t("home.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-yellow-300">
                <Phone className="w-5 h-5" />
                <span className="text-xl font-bold">{t("home.phone")}</span>
              </div>
              <Button
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={() => onNavigate("contact")}
              >
                {t("home.contact_button")}
              </Button>
            </div>

            <p className="text-blue-200">
              {t("home.register_text")}{" "}
              <span className="text-yellow-300 font-bold">
                {t("home.call_now")}
              </span>
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Choose IlmHub?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  500+
                </div>
                <div className="text-muted-foreground">Students</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                  50+
                </div>
                <div className="text-muted-foreground">Teachers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
                  10+
                </div>
                <div className="text-muted-foreground">Courses</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">
                  95%
                </div>
                <div className="text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of students who are already learning with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => onNavigate("signup")}
            >
              {t("nav.signup")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => onNavigate("about")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
