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
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

// Contexts
import { useLanguage } from "../contexts/LanguageContext";

const socialMedia = [
  { icon: <Facebook className="w-5 h-5" />, name: "Facebook", url: "#" },
  { icon: <Instagram className="w-5 h-5" />, name: "Instagram", url: "#" },
  { icon: <Youtube className="w-5 h-5" />, name: "YouTube", url: "#" },
  { icon: <Globe className="w-5 h-5" />, name: "Website", url: "#" },
];

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
      content: "Tashkent, Yunusabad district, Abdulla Qahhor street 1A",
      details: "Metro station: Yunusabad, 5 minutes walk",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t("contact.phone"),
      content: "+998 94 671 50 60",
      details: "Available 24/7 for student support",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t("contact.email"),
      content: "info@ilmhub.uz",
      details: "We respond within 24 hours",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      content: "Mon - Sat: 8:00 AM - 8:00 PM",
      details: "Sunday: 9:00 AM - 6:00 PM",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-800 dark:to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("contact.title")}
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Get in touch with us. We're here to help you on your educational
              journey.
            </p>
            <div className="flex items-center justify-center gap-2 text-yellow-300">
              <MessageSquare className="w-5 h-5" />
              <span>Available in Uzbek and English</span>
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
                Contact Information
              </h2>
              <p className="text-muted-foreground text-lg">
                Multiple ways to reach us and get the information you need
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
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
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send us a Message
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
                          Name *
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
                          Phone
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
                        Email *
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
                        Subject
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
                        Message *
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
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map and Additional Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Visit Our Center</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg h-64 flex items-center justify-center mb-4">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="w-12 h-12 mx-auto mb-2" />
                        <p>Interactive Map</p>
                        <p className="text-sm">Yunusabad district, Tashkent</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Located in the heart of Yunusabad district, our modern
                      facility is easily accessible by public transport and has
                      parking available.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Follow Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Stay connected with us on social media for updates, tips,
                      and educational content.
                    </p>
                    <div className="flex gap-3">
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
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">What courses do you offer?</h3>
                  <p className="text-muted-foreground">
                    We offer courses in English, IT, Mathematics, and other
                    modern subjects. Our curriculum is designed to meet
                    international standards.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">
                    How does the coin system work?
                  </h3>
                  <p className="text-muted-foreground">
                    Students earn coins for achievements and good performance.
                    These coins can be used to purchase educational materials
                    and rewards from our shop.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-2">
                    What are the admission requirements?
                  </h3>
                  <p className="text-muted-foreground">
                    We welcome students of all levels. Contact us for a
                    consultation to determine the best course placement for your
                    educational goals.
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
