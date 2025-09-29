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
import { useAuth } from "../../contexts/AuthContext";

import OverviewTab from "./OverviewTab";
import TeachersTab from "./TeachersTab";
import ItemsTab from "./ItemsTab";
import StudentsTab from "./StudentsTab";

export default function AdminPanel() {
  const { t } = useLanguage();
  const { teachers, items, students, addTeacher, addItem } = useAuth();
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
      addTeacher(teacherForm.name, teacherForm.email);
      setTeacherForm({ name: "", email: "" });
      setShowTeacherDialog(false);
    }
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (itemForm.name && itemForm.price) {
      addItem(itemForm.name, parseInt(itemForm.price), itemForm.description);
      setItemForm({ name: "", price: "", description: "" });
      setShowItemDialog(false);
    }
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
            <h1 className="text-3xl font-bold mb-2">{t("admin.title")}</h1>
            <p className="text-muted-foreground">
              Manage your educational platform and monitor system performance
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
              teachers={teachers}
              items={items}
              totalCoins={totalCoins}
              averageCoins={averageCoins}
            />
          )}

          {/* Teachers Tab */}
          {activeTab === "teachers" && (
            <TeachersTab
              teachers={teachers}
              t={t}
              showTeacherDialog={showTeacherDialog}
              setShowTeacherDialog={setShowTeacherDialog}
              teacherForm={teacherForm}
              setTeacherForm={setTeacherForm}
              handleAddTeacher={handleAddTeacher}
            />
          )}

          {/* Items Tab */}
          {activeTab === "items" && (
            <ItemsTab
              items={items}
              t={t}
              showItemDialog={showItemDialog}
              setShowItemDialog={setShowItemDialog}
              itemForm={itemForm}
              setItemForm={setItemForm}
              handleAddItem={handleAddItem}
            />
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <StudentsTab students={students} t={t} />
          )}
        </div>
      </div>
    </div>
  );
}
