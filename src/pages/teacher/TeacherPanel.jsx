// Libraries
import { useState, useEffect } from "react";
import {
  Users,
  Coins,
  GraduationCap,
  Gift,
  BarChart3,
  DollarSign,
  LogOut,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout, selectAuth, getMeAsync } from "../../utils/redux/authSlice";
import { getMyGroupsAsync, selectGroup } from "../../utils/redux/groupSlice";
import { toast } from "sonner";

// Components
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import GroupsTab from "./GroupsTab";

// Contexts
import { useLanguage } from "../../contexts/LanguageContext";
// import OverviewTab from "./OverviewTab";

function MyGroupsTab() {
  return <GroupsTab />;
}

const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: <BarChart3 className="w-4 h-4" />,
  },

  {
    id: "coins",
    label: "Coin Management",
    icon: <Coins className="w-4 h-4" />,
  },
  {
    id: "myGroups",
    label: "My Groups",
    icon: <Users className="w-4 h-4" />,
  },
];

export default function TeacherPanel() {
  const { t } = useLanguage();
  const { students = [], user, token, role, groups = [] } = useSelector(selectAuth);
  const { groupList = [] } = useSelector(selectGroup);

  const [activeTab, setActiveTab] = useState("overview");
  const [studentForm, setStudentForm] = useState({ name: "" });
  const [coinForm, setCoinForm] = useState({ studentId: "", amount: "" });
  const [showStudentDialog, setShowStudentDialog] = useState(false);
  const [showCoinDialog, setShowCoinDialog] = useState(false);

  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  const [newStudentForm, setNewStudentForm] = useState({
    firstName: "",
    lastName: "",
    info: "",
    groupIds: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMyGroupsAsync());
  }, [dispatch]);

  // Fetch teacher info if not present
  useEffect(() => {
    if (!user) {
      dispatch(getMeAsync());
    }
  }, [user, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const { firstName, lastName, info, groupIds } = newStudentForm;
    if (firstName.trim() && lastName.trim()) {
      const groupIdsArray = Array.isArray(groupIds)
        ? groupIds
        : groupIds
            .split(",")
            .map((id) => id.trim())
            .filter((id) => id.length > 0);
      // dispatch(addStudentAction({ firstName: firstName.trim(), lastName: lastName.trim(), info, groupIds: groupIdsArray })) // TODO
      toast.success(`Student ${firstName} ${lastName} added successfully!`);
      setNewStudentForm({ firstName: "", lastName: "", info: "", groupIds: [] });
      setShowAddStudentDialog(false);
    } else {
      toast.error("First Name and Last Name are required");
    }
  };

  const handleGiveCoins = (e) => {
    e.preventDefault();
    if (coinForm.studentId && coinForm.amount) {
      const amount = parseInt(coinForm.amount);
      const student = students.find((s) => s.studentId === coinForm.studentId);
      if (student && amount > 0) {
        // dispatch(giveCoinsAction(coinForm.studentId, amount)) // TODO
        toast.success(`${amount} coins given to ${student.name}`);
        setCoinForm({ studentId: "", amount: "" });
        setShowCoinDialog(false);
      } else {
        toast.error("Invalid student ID or amount");
      }
    }
  };

  const totalCoins = students.reduce((sum, student) => sum + student.coins, 0);
  const averageCoins =
    students.length > 0 ? Math.round(totalCoins / students.length) : 0;
  const topStudent = students.reduce(
    (top, student) => (student.coins > (top?.coins || 0) ? student : top),
    null
  );


  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Teacher Panel</h1>
              <div className="text-lg text-muted-foreground space-y-1">
                <p>
                  <span className="font-semibold">Teacher Name:</span> {user?.fullName || "Unknown Teacher"}
                </p>
                <p>
                  <span className="font-semibold">Teacher Email:</span> {user?.email || "No Email"}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>

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
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Total Groups</p>
                        <p className="text-2xl font-bold">{groupList?.length || 0}</p>
                      </div>
                      <Users className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t("teacher.students")}</h2>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("common.name")}</TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>{t("common.coins")}</TableHead>
                        <TableHead>Performance</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {student.name}
                          </TableCell>
                          <TableCell className="font-mono text-sm">
                            {student.studentId}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                student.coins > 30
                                  ? "default"
                                  : student.coins > 15
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {student.coins} coins
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {student.coins > 30
                                ? "Excellent"
                                : student.coins > 15
                                ? "Good"
                                : "Needs improvement"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCoinForm((prev) => ({
                                  ...prev,
                                  studentId: student.studentId,
                                }));
                                setShowCoinDialog(true);
                              }}
                            >
                              <Coins className="w-4 h-4 mr-1" />
                              Give Coins
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Coins Tab */}
          {activeTab === "coins" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Coin Management</h2>
              </div>
            </div>
          )}

          {/* My Groups Tab */}
          {activeTab === "myGroups" && <MyGroupsTab />}
        </div>
      </div>
    </div>
  );
}
