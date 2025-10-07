// Libraries
import { Shield, Users, Package, DollarSign } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

// Redux
import { getStudentAsync, selectStudent } from "../../utils/redux/studentSlice";
import { getTeacherAsync, selectUser } from "../../utils/redux/userSlice";
import { selectRewardItem } from "../../utils/redux/rewardItemSlice";

export default function OverviewTab({ items, totalCoins, averageCoins }) {
  const dispatch = useDispatch();

  // Get Lists
  const { studentList } = useSelector(selectStudent);
  const { userList: teachers = [] } = useSelector(selectUser);
  const { rewardItemList } = useSelector(selectRewardItem);

  // Get Students all
  useEffect(() => {
    dispatch(getStudentAsync());
  }, [dispatch]);

  // Get teachers all
  useEffect(() => {
    dispatch(getTeacherAsync());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{studentList?.length || 0}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Teachers</p>
                <p className="text-2xl font-bold">{teachers?.length || 0}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Shop Items</p>
                <p className="text-2xl font-bold">
                  {rewardItemList?.length || 0}
                </p>
              </div>
              <Package className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Coins</p>
                <p className="text-2xl font-bold">{totalCoins}</p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span>Average coins per student</span>
              <Badge variant="secondary">{averageCoins} coins</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span>Active teachers</span>
              <Badge variant="secondary">{teachers?.length || 0} teachers</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
              <span>Available shop items</span>
              <Badge variant="secondary">{items.length} items</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
