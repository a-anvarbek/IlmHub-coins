// src/components/shop/Shop.jsx
import React from "react";
import { Gift, Coins, ShoppingCart, AlertCircle, CreditCard } from "lucide-react";
import { toast } from "sonner";

// UI components (project ichidagi)
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Alert, AlertDescription } from "../../components/ui/alert";

// Contexts (projectdagi)
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";

/**
 * Premium-looking standalone Shop component.
 * Talab: project ichidagi ui komponentlar va context lar mavjud bo'lishi kerak.
 */
export default function Shop() {
  const { user, items = [], buyItem } = useAuth();
  const { t } = useLanguage();

  const handleBuyItem = (itemId) => {
    const item = items.find((i) => i.id === itemId);
    if (!item) return;

    if ((user?.coins || 0) < item.price) {
      toast.error(t ? t("shop.not_enough_coins") || "Not enough coins" : "Not enough coins");
      return;
    }

    const success = buyItem(itemId);
    if (success) {
      toast.success(
        t
          ? t("shop.purchase_success", { name: item.name }) || `Successfully purchased ${item.name}!`
          : `Successfully purchased ${item.name}!`
      );
    } else {
      toast.error(t ? t("shop.purchase_failed") || "Failed to purchase item" : "Failed to purchase item");
    }
  };

  return (
    <div className="space-y-10 px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-sm">
          {t ? t("student.shop") || "Shop" : "Shop"}
        </h2>

        <Alert className="max-w-sm border border-blue-300/40 shadow-lg bg-white/70 dark:bg-gray-800/40 backdrop-blur-md rounded-2xl">
          <CreditCard className="w-5 h-5 text-blue-500" />
          <AlertDescription className="text-base font-medium">
            {t ? t("shop.coins_available") || "You have" : "You have"}{" "}
            <span className="font-bold text-yellow-500 text-lg">{user?.coins || 0}</span>{" "}
            {t ? t("shop.coins") || "coins" : "coins"}
          </AlertDescription>
        </Alert>
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item) => {
          const canAfford = (user?.coins || 0) >= item.price;
          return (
            <Card
              key={item.id}
              className={`relative group overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl ${
                canAfford
                  ? "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950 dark:via-purple-950 dark:to-pink-950"
                  : "opacity-60 border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-transparent"
              }`}
            >
              {/* subtle glow on hover */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity blur-sm rounded-2xl" />

              <CardContent className="relative pt-6 pb-6">
                {/* Icon block */}
                <div className="w-full h-32 rounded-xl flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 shadow-inner mb-4">
                  <Gift className="w-14 h-14 text-purple-600 dark:text-purple-300" />
                </div>

                {/* Title + desc */}
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">{item.description}</p>

                {/* Price and badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-500" />
                    <span className="font-semibold">{item.price} {t ? t("shop.coins_label") || "coins" : "coins"}</span>
                  </div>

                  {canAfford ? (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full">
                      {t ? t("shop.available") || "Available" : "Available"}
                    </Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-3 py-1 rounded-full">
                      {t ? t("shop.need_more", { n: item.price - (user?.coins || 0) }) || `Need ${item.price - (user?.coins || 0)} more` : `Need ${item.price - (user?.coins || 0)} more`}
                    </Badge>
                  )}
                </div>

                {/* Buy button */}
                <Button
                  onClick={() => handleBuyItem(item.id)}
                  disabled={!canAfford}
                  className={`w-full py-3 font-semibold rounded-xl transition-all ${
                    canAfford
                      ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md hover:scale-[1.01]"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {canAfford ? (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2 inline-block" />
                      {t ? t("student.buy") || "Buy" : "Buy"}
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 mr-2 inline-block" />
                      {t ? t("shop.not_enough") || "Not enough coins" : "Not enough coins"}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
