// Libraries
import { useState } from "react";
import {
  Users,
  Package,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Shield,
  Mail,
  DollarSign,
  LogOut,
} from "lucide-react";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

// Contexts
import { useLanguage } from "../../contexts/LanguageContext";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectAuth, logout } from "../../utils/redux/authSlice";

export default function AdminPanel() {
  const { t } = useLanguage();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teachers = [], items = [], students = [] } = useSelector(selectAuth);
  const [activeTab, setActiveTab] = useState("overview");
  const [teacherForm, setTeacherForm] = useState({ name: "", email: "" });
  const [itemForm, setItemForm] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [showTeacherDialog, setShowTeacherDialog] = useState(false);
  const [showItemDialog, setShowItemDialog] = useState(false);

  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (teacherForm.name && teacherForm.email) {
      // TODO: dispatch addTeacher action here
      setTeacherForm({ name: "", email: "" });
      setShowTeacherDialog(false);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (itemForm.name && itemForm.price) {
      // TODO: dispatch addItem action here
      setItemForm({ name: "", price: "", description: "" });
      setShowItemDialog(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const totalCoins = students.reduce((sum, student) => sum + student.coins, 0);
  const averageCoins =
    students.length > 0 ? Math.round(totalCoins / students.length) : 0;

  const tabs = [
    {
      id: "overview",
      label: "Overview",
      icon: <BarChart3 className="w-4 h-4" />,
    },
    { id: "teachers", label: "Teachers", icon: <Users className="w-4 h-4" /> },
    { id: "items", label: "Items", icon: <Package className="w-4 h-4" /> },
    { id: "students", label: "Students", icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">{t("admin.title")}</h1>
                <p className="text-muted-foreground">
                  Manage your educational platform and monitor system performance
                </p>
              </div>
             
            </div>
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
                        <p className="text-sm text-muted-foreground">
                          Total Students
                        </p>
                        <p className="text-2xl font-bold">{students.length}</p>
                      </div>
                      <Shield className="w-8 h-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Teachers
                        </p>
                        <p className="text-2xl font-bold">{teachers.length}</p>
                      </div>
                      <Users className="w-8 h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Shop Items
                        </p>
                        <p className="text-2xl font-bold">{items.length}</p>
                      </div>
                      <Package className="w-8 h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Total Coins
                        </p>
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
                      <Badge variant="secondary">
                        {teachers.length} teachers
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <span>Available shop items</span>
                      <Badge variant="secondary">{items.length} items</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Teachers Tab */}
          {activeTab === "teachers" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t("admin.teachers")}</h2>
                <Dialog
                  open={showTeacherDialog}
                  onOpenChange={setShowTeacherDialog}
                >
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      {t("admin.add_teacher")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("admin.add_teacher")}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddTeacher} className="space-y-4">
                      <div>
                        <Label htmlFor="teacherName">{t("common.name")}</Label>
                        <Input
                          id="teacherName"
                          value={teacherForm.name}
                          onChange={(e) =>
                            setTeacherForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="teacherEmail">Email</Label>
                        <Input
                          id="teacherEmail"
                          type="email"
                          value={teacherForm.email}
                          onChange={(e) =>
                            setTeacherForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <Button type="submit">{t("common.add")}</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("common.name")}</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {teachers.map((teacher) => (
                        <TableRow key={teacher.id}>
                          <TableCell className="font-medium">
                            {teacher.name}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              {teacher.email}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Items Tab */}
          {activeTab === "items" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{t("admin.items")}</h2>
                <Dialog open={showItemDialog} onOpenChange={setShowItemDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      {t("admin.add_item")}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{t("admin.add_item")}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleAddItem} className="space-y-4">
                      <div>
                        <Label htmlFor="itemName">{t("common.name")}</Label>
                        <Input
                          id="itemName"
                          value={itemForm.name}
                          onChange={(e) =>
                            setItemForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="itemPrice">
                          {t("common.price")} (coins)
                        </Label>
                        <Input
                          id="itemPrice"
                          type="number"
                          value={itemForm.price}
                          onChange={(e) =>
                            setItemForm((prev) => ({
                              ...prev,
                              price: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="itemDescription">Description</Label>
                        <Textarea
                          id="itemDescription"
                          value={itemForm.description}
                          onChange={(e) =>
                            setItemForm((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Button type="submit">{t("common.add")}</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("common.name")}</TableHead>
                        <TableHead>{t("common.price")}</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {item.price} coins
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {item.description || "No description"}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">All Students</h2>
              </div>

              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("common.name")}</TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>{t("common.coins")}</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            {student.name}
                          </TableCell>
                          <TableCell className="font-mono">
                            {student.studentId}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                student.coins > 20 ? "default" : "secondary"
                              }
                            >
                              {student.coins} coins
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">Active</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
