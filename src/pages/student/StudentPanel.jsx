// Libraries
import { useState, useEffect } from "react";
import {
  Coins,
  ShoppingCart,
  Trophy,
  Star,
  Gift,
  Badge as LucideBadge,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";

// Components
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Alert, AlertDescription } from "../../components/ui/alert";
import OverviewTab from "./OverviewTab";
import { InputNumber, Modal } from "antd";

// Redux
import { getMeAsync, selectAuth } from "../../utils/redux/authSlice";
import { getItemAsync, selectRewardItem } from "../../utils/redux/rewardItemSlice";
import { postRedemptionAsync } from "../../utils/redux/redemptionSlice";

const tabs = [
  { id: "overview", label: "Overview", icon: <Trophy className="w-4 h-4" /> },
  { id: "shop", label: "Shop", icon: <ShoppingCart className="w-4 h-4" /> },
  { id: "achievements", label: "Achievements", icon: <Star className="w-4 h-4" /> },
];

export default function StudentPanel() {
  const { t } = useSelector((state) => state.language) || {};
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("overview");

  const { user } = useSelector(selectAuth);
  const coins = user?.coins ?? user?.balance ?? 0;

  const { rewardItemList } = useSelector(selectRewardItem);

  useEffect(() => {
    if (!user) {
      dispatch(getMeAsync());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (activeTab === "shop") {
      dispatch(getItemAsync());
    }
  }, [activeTab, dispatch]);

  const getPerformanceLevel = (coins) => {
    if (coins >= 50) return { level: "Excellent", color: "bg-green-500", badge: "default" };
    if (coins >= 30) return { level: "Good", color: "bg-blue-500", badge: "secondary" };
    if (coins >= 15) return { level: "Average", color: "bg-yellow-500", badge: "outline" };
    return { level: "Needs Improvement", color: "bg-gray-500", badge: "outline" };
  };

  const performance = getPerformanceLevel(coins);

  const Crown = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m2 20 7-7" />
      <path d="m15 9 7 7" />
      <path d="m6 3 1 3 6-3 6 3 1-3" />
      <path d="m6 9 4-4 4 4" />
    </svg>
  );

  const handleBuyItem = (item) => {
    if (coins < item.cost) {
      toast.error("Not enough coins to purchase this item");
      return;
    }

    let quantity = 1;
    Modal.confirm({
      title: `Buy ${item.title}`,
      content: (
        <div>
          <p>Enter quantity:</p>
          <InputNumber min={1} max={item.stock} defaultValue={1} onChange={(value) => (quantity = value)} />
        </div>
      ),
      onOk: () => {
        dispatch(postRedemptionAsync({ data: { rewardItemId: item.id, quantity } }));
        toast.success(`Successfully purchased ${item.title} x${quantity}!`);
      },
    });
  };

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t?.("student.title") || "Student Panel"}</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name || "Loading..."}! Keep learning and earning coins.</p>
          </div>

          {/* Coin Balance Card */}
          <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 mb-2">Your Coin Balance</p>
                  <div className="flex items-center gap-2">
                    <Coins className="w-8 h-8 text-yellow-300" />
                    <span className="text-4xl font-bold">{coins}</span>
                    <span className="text-xl text-blue-100">coins</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 mb-2">Performance Level</p>
                  <Badge variant="secondary" className="text-lg px-4 py-2">{performance.level}</Badge>
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
                  activeTab === tab.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && user && (
            <OverviewTab user={user} achievements={user?.achievements ?? []} items={user?.items ?? []} />
          )}

          {/* Shop Tab */}
          {activeTab === "shop" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rewardItemList && rewardItemList.length > 0 ? (
                rewardItemList.map((item) => {
                  const canBuy = coins >= item.cost;
                  return (
                    <Card key={item.id} className="border border-muted p-4">
                      <CardContent>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <Badge variant={canBuy ? "secondary" : "outline"}>{item.cost} coins</Badge>
                        </div>
                        <p className="mb-4 text-sm text-muted-foreground">{item.description ?? "No description available"}</p>
                        <Button disabled={!canBuy} onClick={() => handleBuyItem(item)} className="w-full">
                          {canBuy ? "Buy" : "Insufficient Coins"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Alert variant="destructive" className="col-span-full">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  <AlertDescription>No items available in the shop.</AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}