// Libraries
import { Coins, ShoppingCart, Trophy } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";

export default function OverviewTab({ user = {}, achievements = [], items = [] }) {
  const totalCoins = user?.balance ?? user?.coins ?? 0;
  const totalAchievements = achievements.filter((a) => a.achieved).length;
  const totalGroups = user?.groups?.length ?? 0;
  const totalItems = items?.length ?? 0;
  const firstName = user?.firstName ?? user?.name?.split(" ")[0] ?? "";
  const lastName = user?.lastName ?? user?.name?.split(" ")[1] ?? "";

  return (
    <div className="space-y-6">
      {/* User Info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">First Name</p>
              <p className="text-2xl font-bold">{firstName}</p>
              <p className="text-sm text-muted-foreground mt-2">Last Name</p>
              <p className="text-2xl font-bold">{lastName}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Coins</p>
                <p className="text-2xl font-bold">{totalCoins}</p>
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
                <p className="text-2xl font-bold">{totalAchievements}</p>
              </div>
              <Trophy className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Groups</p>
                <p className="text-2xl font-bold">{totalGroups}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}