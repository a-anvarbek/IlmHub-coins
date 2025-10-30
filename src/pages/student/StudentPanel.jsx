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
  CheckCircle2,
  Plus,
  Minus,
} from "lucide-react";
import { toast } from "sonner";
import { useSelector, useDispatch } from "react-redux";

// Components
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Alert, AlertDescription } from "../../components/ui/alert";
import OverviewTab from "./OverviewTab";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogPortal,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";

// Redux
import { getMeAsync, selectAuth } from "../../utils/redux/authSlice";
import { getItemAsync, selectRewardItem } from "../../utils/redux/rewardItemSlice";
import { postRedemptionAsync } from "../../utils/redux/redemptionSlice";

const tabs = [
  { id: "overview", label: "Umumiy ma’lumot", icon: <Trophy className="w-4 h-4" /> },
  { id: "shop", label: "Do‘kon", icon: <ShoppingCart className="w-4 h-4" /> },
  { id: "achievements", label: "Yutuqlar", icon: <Star className="w-4 h-4" /> },
];

export default function StudentPanel() {
  const { t } = useSelector((state) => state.language) || {};
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("overview");

  const { user } = useSelector(selectAuth);
  const coins = user?.coins ?? user?.balance ?? 0;

  const { rewardItemList } = useSelector(selectRewardItem);

  const [selectedItem, setSelectedItem] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
    if (coins >= 50) return { level: "A’lo", color: "bg-green-500", badge: "default" };
    if (coins >= 30) return { level: "Yaxshi", color: "bg-blue-500", badge: "secondary" };
    if (coins >= 15) return { level: "O‘rtacha", color: "bg-yellow-500", badge: "outline" };
    return { level: "Yaxshilanish kerak", color: "bg-gray-500", badge: "outline" };
  };

  const performance = getPerformanceLevel(coins);

  const openBuyModal = (item) => {
    if (coins < item.cost) {
      toast.error("Not enough coins to purchase this item");
      return;
    }
    setSelectedItem(item);
    setQuantity(1);
    setShowBuyModal(true);
  };

  const closeBuyModal = () => {
    setShowBuyModal(false);
    setSelectedItem(null);
    setQuantity(1);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedItem) return;
    await dispatch(postRedemptionAsync({ data: { rewardItemId: selectedItem.id, quantity } }));
    setShowBuyModal(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccess = () => setShowSuccessModal(false);

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t?.("student.title") || "Talaba paneli"}</h1>
            <p className="text-muted-foreground">Xush kelibsiz, {user?.name || "Yuklanmoqda..."}! O‘rganishda davom eting va tangalarni to‘plang.</p>
          </div>

          {/* Coin Balance Card */}
          <Card className="mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 mb-2">Sizning tanga miqdoringiz</p>
                  <div className="flex items-center gap-2">
                    <Coins className="w-8 h-8 text-yellow-300" />
                    <span className="text-4xl font-bold">{coins}</span>
                    <span className="text-xl text-blue-100">tanga</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-100 mb-2">Faoliyat darajasi</p>
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
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rewardItemList && rewardItemList.length > 0 ? (
                  rewardItemList.map((item) => {
                    const canBuy = coins >= item.cost;
                    return (
                      <Card key={item.id} className="border border-muted p-4">
                        <CardContent>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <Badge variant={canBuy ? "secondary" : "outline"}>{item.cost} tanga</Badge>
                          </div>
                          <p className="mb-4 text-sm text-muted-foreground">{item.description ?? "Tavsif mavjud emas"}</p>
                          <Button disabled={!canBuy} onClick={() => openBuyModal(item)} className="w-full">
                            {canBuy ? "Sotib olish" : "Tangalar yetarli emas"}
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <Alert variant="destructive" className="col-span-full">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <AlertDescription>Do‘konda hozircha mahsulotlar mavjud emas.</AlertDescription>
                  </Alert>
                )}
              </div>

              {/* Buy Modal */}
              <Dialog open={showBuyModal} onOpenChange={setShowBuyModal}>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Xaridni tasdiqlang</DialogTitle>
                    <DialogDescription>
                      Mahsulotni ko‘rib chiqing va xarid tafsilotlarini tasdiqlang.
                    </DialogDescription>
                  </DialogHeader>

                  {selectedItem && (
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-muted/30">
                        <h3 className="text-lg font-semibold">{selectedItem.title}</h3>
                        <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
                        <div className="flex justify-between mt-2 text-sm">
                          <span>Har bir mahsulot narxi:</span>
                          <span className="font-semibold">{selectedItem.cost} tanga</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Miqdor:</span>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <Input
                            type="number"
                            value={quantity}
                            onChange={(e) =>
                              setQuantity(Math.min(Math.max(1, Number(e.target.value)), selectedItem.stock))
                            }
                            className="w-16 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setQuantity((q) => Math.min(selectedItem.stock, q + 1))}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Umumiy narx:</span>
                        <span className="font-semibold">{selectedItem.cost * quantity} tanga</span>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Xariddan keyingi balans:</span>
                        <span>{coins - selectedItem.cost * quantity} tanga</span>
                      </div>
                    </div>
                  )}

                  <DialogFooter className="mt-6 flex justify-end gap-2">
                    <Button variant="outline" onClick={closeBuyModal}>
                      Bekor qilish
                    </Button>
                    <Button onClick={handleConfirmPurchase}>Tasdiqlash</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Success Modal */}
              <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
                <DialogPortal>
                  <DialogContent className="max-w-md w-full mx-auto text-center py-8 rounded-lg shadow-lg bg-white/90 backdrop-blur-md">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                      </div>
                      <DialogTitle>Xarid muvaffaqiyatli amalga oshirildi!</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Siz mahsulotni muvaffaqiyatli xarid qildingiz. Admin so‘rovingizni ko‘rib chiqadi va tez orada sizga xabar beradi.
                      </DialogDescription>
                      <Button className="mt-4" onClick={() => setShowSuccessModal(false)}>
                        Yopish
                      </Button>
                    </div>
                  </DialogContent>
                </DialogPortal>
              </Dialog>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
