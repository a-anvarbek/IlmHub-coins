// Libraries
import { useState } from "react";
import {
  Users,
  Coins,
  GraduationCap,
  Gift,
  BarChart3,
  DollarSign,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

// Contexts
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";
import OverviewTab from "./OverviewTab";

const tabs = [
  {
    id: "overview",
    label: "Overview",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    id: "students",
    label: "My Students",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "coins",
    label: "Coin Management",
    icon: <Coins className="w-4 h-4" />,
  },
  {
    id: "myStudents",
    label: "My Student",
    icon: <Users className="w-4 h-4" />,
  },
];

export default function TeacherPanel() {
  const { t } = useLanguage();
  const { students, addStudent, giveCoins, user } = useAuth();
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
      addStudent({ firstName: firstName.trim(), lastName: lastName.trim(), info, groupIds: groupIdsArray });
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
        giveCoins(coinForm.studentId, amount);
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t("teacher.title")}</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Manage your students and reward their
              achievements.
            </p>
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
                        <OverviewTab
                        students={students}
                        totalCoins={totalCoins}
                        averageCoins={averageCoins}
                        topStudent={topStudent}
                      />
            
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t("teacher.students")}</h2>
                <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
                  <DialogTrigger asChild>
                    <Button variant="default">Add Student</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Add New Student</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleAddStudent}
                      className="grid gap-4 py-4"
                    >
                      <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="firstName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          First Name
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          value={newStudentForm.firstName}
                          onChange={(e) =>
                            setNewStudentForm((prev) => ({
                              ...prev,
                              firstName: e.target.value,
                            }))
                          }
                          required
                          className="input"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="lastName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Last Name
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          value={newStudentForm.lastName}
                          onChange={(e) =>
                            setNewStudentForm((prev) => ({
                              ...prev,
                              lastName: e.target.value,
                            }))
                          }
                          required
                          className="input"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="info" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Info
                        </label>
                        <textarea
                          id="info"
                          value={newStudentForm.info}
                          onChange={(e) =>
                            setNewStudentForm((prev) => ({
                              ...prev,
                              info: e.target.value,
                            }))
                          }
                          className="textarea"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        <label htmlFor="groupIds" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Group IDs (comma separated)
                        </label>
                        <input
                          id="groupIds"
                          type="text"
                          value={Array.isArray(newStudentForm.groupIds) ? newStudentForm.groupIds.join(", ") : newStudentForm.groupIds}
                          onChange={(e) =>
                            setNewStudentForm((prev) => ({
                              ...prev,
                              groupIds: e.target.value,
                            }))
                          }
                          className="input"
                        />
                      </div>
                      <div className="flex justify-end pt-4">
                        <Button type="submit">Add Student</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("common.firstName")}</TableHead>
                        <TableHead>{t("common.lastName")}</TableHead>
                        <TableHead>Info</TableHead>
                        <TableHead>Group IDs</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {student.firstName}
                          </TableCell>
                          <TableCell className="font-medium">
                            {student.lastName}
                          </TableCell>
                          <TableCell>{student.info}</TableCell>
                          <TableCell>{Array.isArray(student.groupIds) ? student.groupIds.join(", ") : student.groupIds}</TableCell>
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

          {/* My Student Tab */}
          {activeTab === "myStudents" && <GroupsTab />}
        </div>
      </div>
    </div>
  );
}
