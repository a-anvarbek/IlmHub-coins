// Libraries
import {
  Target,
  Eye,
  Heart,
  Users,
  BookOpen,
  Award,
  Globe,
  Lightbulb,
} from "lucide-react";

// Components
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

// Contexts
import { useLanguage } from "../contexts/LanguageContext";

const values = [
  {
    icon: <Target className="w-8 h-8 text-blue-500" />,
    title: "Our Mission",
    description:
      "To provide high-quality education and empower students with knowledge and skills for their future success.",
  },
  {
    icon: <Eye className="w-8 h-8 text-green-500" />,
    title: "Our Vision",
    description:
      "To become the leading educational center in Uzbekistan, fostering innovation and excellence in learning.",
  },
  {
    icon: <Heart className="w-8 h-8 text-red-500" />,
    title: "Our Values",
    description:
      "Excellence, integrity, innovation, and student-centered approach guide everything we do.",
  },
];

const achievements = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "500+ Students Graduated",
    description: "Successfully trained and graduated over 500 students",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "20+ Courses Available",
    description: "Comprehensive curriculum covering various subjects",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "95% Success Rate",
    description: "High achievement rate in student outcomes",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "International Standards",
    description: "Following global best practices in education",
  },
];

const team = [
  {
    name: "Dr. Aziz Karimov",
    role: "Director",
    experience: "15 years in education",
    specialization: "Educational Leadership",
  },
  {
    name: "Ozoda Rahimova",
    role: "Senior English Teacher",
    experience: "10 years in language teaching",
    specialization: "IELTS & Academic English",
  },
  {
    name: "Bobur Alimov",
    role: "IT Instructor",
    experience: "8 years in programming",
    specialization: "Web Development & Programming",
  },
  {
    name: "Malika Tosheva",
    role: "Math Teacher",
    experience: "12 years in mathematics",
    specialization: "Advanced Mathematics",
  },
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("about.title")}
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {t("about.description")}
            </p>
            <Badge variant="secondary" className="text-lg px-6 py-2">
              Established 2018
            </Badge>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">{value.icon}</div>
                    <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Achievements
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievements.map((achievement, index) => (
                <Card
                  key={index}
                  className="p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        {achievement.icon}
                      </div>
                      <h3 className="font-bold">{achievement.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {achievement.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <h3 className="font-bold mb-1">{member.name}</h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      {member.experience}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {member.specialization}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-blue-600 dark:bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              Why Choose IlmHub?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">
                      Innovative Teaching Methods
                    </h3>
                    <p className="text-blue-100">
                      Modern and interactive approaches to learning
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Experienced Faculty</h3>
                    <p className="text-blue-100">
                      Qualified teachers with proven track records
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Award className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">Proven Results</h3>
                    <p className="text-blue-100">
                      High success rates and student satisfaction
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <h3 className="font-bold mb-1">International Standards</h3>
                    <p className="text-blue-100">
                      Curriculum aligned with global best practices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
