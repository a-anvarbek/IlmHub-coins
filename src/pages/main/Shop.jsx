// src/components/shop/Shop.jsx
"use client";

import React from "react";
import { Gift, Coins, AlertCircle, CreditCard } from "lucide-react";
import { toast } from "sonner";

// UI components
import { Card, CardContent } from "../../components/ui/card";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

// Contexts
import { useAuth } from "../../contexts/AuthContext";
import { useLanguage } from "../../contexts/LanguageContext";

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
    <div className="bg-black min-h-screen px-4 py-8">
      <div className="space-y-6">
        <div className=" flex justify-between items-center pt-6 mt-6">
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
    </div>
  );
}
