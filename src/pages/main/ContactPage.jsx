// Libraries
import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Globe,
  Facebook,
  Instagram,
  Youtube,
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
import { Textarea } from "../../components/ui/textarea";

// Contexts
import { useLanguage } from "../../contexts/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // contactInfo massivi endi komponent ichida va t bilan ishlaydi
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t("contact.address"),
      content: t("contact.address_full"),
      details: t("contact.metro"),
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t("contact.phone"),
      content: "+998 94 671 50 60",
      details: t("contact.phone_availability"),
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t("contact.email"),
      content: "info@ilmhub.uz",
      details: t("contact.email_response"),
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("contact.working_hours"),
      content: t("contact.working_days"),
      details: t("contact.working_sunday"),
    },
  ];

  const socialMedia = [
    { icon: <Facebook className="w-5 h-5" />, name: "Facebook", url: "#" },
    { icon: <Instagram className="w-5 h-5" />, name: "Instagram", url: "#" },
    { icon: <Youtube className="w-5 h-5" />, name: "YouTube", url: "#" },
    { icon: <Globe className="w-5 h-5" />, name: "Website", url: "#" },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-800 dark:to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-green-100 mb-6 sm:mb-8">
              {t("contact.subtitle")}
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300">
              <MessageSquare className="w-5 h-5" />
              <span>{t("contact.available_languages")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {t("contact.info_title")}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t("contact.info_desc")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 sm:mb-16">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow"
                >
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="text-blue-600 dark:text-blue-400">
                        {info.icon}
                      </div>
                    </div>
                    <h3 className="font-bold mb-2">{info.title}</h3>
                    <p className="text-lg mb-1">{info.content}</p>
                    <p className="text-sm text-muted-foreground">
                      {info.details}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form and Map */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    {t("contact.form_title")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium mb-1"
                        >
                          {t("contact.form_name")}
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium mb-1"
                        >
                          {t("contact.form_phone")}
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+998 XX XXX XX XX"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-1"
                      >
                        {t("contact.form_email")}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium mb-1"
                      >
                        {t("contact.form_subject")}
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium mb-1"
                      >
                        {t("contact.form_message")}
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      <Send className="w-4 h-4 mr-2" />
                      {t("contact.form_send")}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map and Additional Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{t("contact.visit_title")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg h-48 sm:h-56 md:h-64 flex items-center justify-center mb-4">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="w-12 h-12 mx-auto mb-2" />
                        <p>{t("contact.interactive_map")}</p>
                        <p className="text-sm">Yunusabad district, Tashkent</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {t("contact.visit_desc")}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t("contact.follow_us")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {t("contact.follow_us_desc")}
                    </p>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {socialMedia.map((social, index) => (
                        <Button key={index} variant="outline" size="sm" asChild>
                          <a
                            href={social.url}
                            className="flex items-center gap-2"
                          >
                            {social.icon}
                            {social.name}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
              {t("contact.faq_title")}
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">{t("contact.faq_q1")}</h3>
                  <p className="text-muted-foreground">
                    {t("contact.faq_a1")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">
                    {t("contact.faq_q2")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("contact.faq_a2")}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">
                    {t("contact.faq_q3")}
                  </h3>
                  <p className="text-muted-foreground">
                    {t("contact.faq_a3")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
