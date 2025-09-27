// Libraries
import { useState } from "react";
import {
  Coins,
  ShoppingCart,
  Trophy,
  Star,
  Gift,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

// Components
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Alert, AlertDescription } from "../../components/ui/alert";

// Contexts
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";

const tabs = [
  { id: "overview", label: "Overview", icon: <Trophy className="w-4 h-4" /> },
  { id: "shop", label: "Shop", icon: <ShoppingCart className="w-4 h-4" /> },
  { id: "achievements", label: "Achievements", icon: <Star className="w-4 h-4" /> },
];

export default function StudentPanel() {
  const { t } = useLanguage();
  const { user, items, buyItem } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const Crown = ({ className }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m2 20 7-7" />
      <path d="m15 9 7 7" />
      <path d="m6 3 1 3 6-3 6 3 1-3" />
      <path d="m6 9 4-4 4 4" />
    </svg>
  );

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Earned your first 10 coins",
      requirement: 10,
      achieved: (user?.coins || 0) >= 10,
      icon: <Star className="w-5 h-5" />,
    },
    {
      id: 2,
      title: "Good Student",
      description: "Accumulated 25 coins",
      requirement: 25,
      achieved: (user?.coins || 0) >= 25,
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      id: 3,
      title: "Star Performer",
      description: "Reached 50 coins milestone",
      requirement: 50,
      achieved: (user?.coins || 0) >= 50,
      icon: <Gift className="w-5 h-5" />,
    },
    {
      id: 4,
      title: "Champion",
      description: "Earned 100 coins - exceptional performance!",
      requirement: 100,
      achieved: (user?.coins || 0) >= 100,
      icon: <Crown className="w-5 h-5" />,
    },
  ];

  const handleBuyItem = (itemId) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    if ((user?.coins || 0) < item.price) {
      toast.error("Not enough coins to purchase this item");
      return;
    }

    const success = buyItem(itemId);
    if (success) {
      toast.success(`Successfully purchased ${item.name}!`);
    } else {
      toast.error("Failed to purchase item");
    }
  };

  const getPerformanceLevel = (coins) => {
    if (coins >= 50)
      return { level: "Excellent", color: "bg-green-500", badge: "default" };
    if (coins >= 30)
      return { level: "Good", color: "bg-blue-500", badge: "secondary" };
    if (coins >= 15)
      return { level: "Average", color: "bg-yellow-500", badge: "outline" };
    return { level: "Needs Improvement", color: "bg-gray-500", badge: "outline" };
  };

  const performance = getPerformanceLevel(user?.coins || 0);

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t("student.title")}</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Keep learning and earning coins.
            </p>
          </div>

          {/* Coin Balance Card */}
          <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 mb-2">Your Coin Balance</p>
                  <div className="flex items-center gap-2">
                    <Coins className="w-8 h-8 text-yellow-300" />
                    <span className="text-4xl font-bold">{user?.coins || 0}</span>
                    <span className="text-xl text-blue-100">coins</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 mb-2">Performance Level</p>
                  <Badge variant="secondary" className="text-lg px-4 py-2">
                    {performance.level}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-8 bg-muted p-1 rounded-lg w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Coins</p>
                        <p className="text-2xl font-bold">{user?.coins || 0}</p>
                      </div>
                      <Coins className="w-8 h-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Achievements</p>
                        <p className="text-2xl font-bold">
                          {achievements.filter((a) => a.achieved).length}
                        </p>
                      </div>
                      <Trophy className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Available Items</p>
                        <p className="text-2xl font-bold">{items.length}</p>
                      </div>
                      <ShoppingCart className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Shop Tab */}
          {activeTab === "shop" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t("student.shop")}</h2>
                <Alert className="max-w-md">
                  <CreditCard className="w-4 h-4" />
                  <AlertDescription>
                    You have {user?.coins || 0} coins available to spend
                  </AlertDescription>
                </Alert>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => {
                  const canAfford = (user?.coins || 0) >= item.price;
                  return (
                    <Card key={item.id} className={`${!canAfford ? "opacity-60" : ""}`}>
                      <CardContent className="pt-6">
                        <div className="mb-4">
                          <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center mb-3">
                            <Gift className="w-12 h-12 text-muted-foreground" />
                          </div>
                          <h3 className="font-bold text-lg">{item.name}</h3>
                          <p className="text-muted-foreground text-sm">{item.description}</p>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-1">
                            <Coins className="w-4 h-4 text-yellow-500" />
                            <span className="font-bold">{item.price} coins</span>
                          </div>
                          {canAfford ? (
                            <Badge variant="secondary">Available</Badge>
                          ) : (
                            <Badge variant="outline">
                              Need {item.price - (user?.coins || 0)} more
                            </Badge>
                          )}
                        </div>

                        <Button
                          onClick={() => handleBuyItem(item.id)}
                          disabled={!canAfford}
                          className="w-full"
                        >
                          {canAfford ? (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              {t("student.buy")}
                            </>
                          ) : (
                            <>
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Not enough coins
                            </>
                          )}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
