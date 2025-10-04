// StudentPanel.jsx
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

  const [modalItem, setModalItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");

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

  const openBuyModal = (item) => {
    if (coins < item.cost) {
      toast.error("Not enough coins to purchase this item");
      return;
    }
    setQuantity(1);
    setModalItem(item);
  };

  const closeBuyModal = () => {
    setModalItem(null);
    setQuantity(1);
  };

  const handleConfirmPurchase = async () => {
    if (!modalItem) return;
    if (quantity < 1 || quantity > modalItem.stock) {
      toast.error("Invalid quantity selected");
      return;
    }

    // API chaqirish
    await dispatch(postRedemptionAsync({ data: { rewardItemId: modalItem.id, quantity } }));

    closeBuyModal();

    // Success modalni chiqarish
    setSuccessMessage(
      "Siz ushbu mahsulotni sotib oldingiz va admin ushbu so‘rovni ko‘rib chiqqandan so‘ng habar beradi!"
    );
  };

  const handleCloseSuccess = () => setSuccessMessage("");

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
                        <Button disabled={!canBuy} onClick={() => openBuyModal(item)} className="w-full">
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

          {/* Buy Modal */}
          {modalItem && (
            <div
              className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center overflow-auto"
              onClick={closeBuyModal}
              role="dialog"
              aria-modal="true"
            >
              <div
                className="relative z-10 bg-white rounded-lg shadow-lg max-w-md w-full p-6 mx-4 my-20 min-h-[300px]"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-xl font-semibold mb-4">Buy {modalItem.title}</h2>
                <div className="mb-4">
                  <label htmlFor="quantity" className="block mb-1 font-medium">
                    Enter quantity (max {modalItem.stock}):
                  </label>
                  <input
                    id="quantity"
                    type="number"
                    min={1}
                    max={modalItem.stock}
                    value={quantity}
                    autoFocus
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (val >= 1 && val <= modalItem.stock) setQuantity(val);
                      else if (val < 1) setQuantity(1);
                      else if (val > modalItem.stock) setQuantity(modalItem.stock);
                    }}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={closeBuyModal}>Cancel</Button>
                  <Button onClick={handleConfirmPurchase}>Confirm Purchase</Button>
                </div>
              </div>
            </div>
          )}

          {/* Success Modal */}
          {successMessage && (
            <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4">
              <div className="bg-green-500 text-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
                <p className="mb-4">{successMessage}</p>
                <Button variant="outline" onClick={handleCloseSuccess}>OK</Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
