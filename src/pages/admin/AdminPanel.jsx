// Libraries
import { useState } from "react";
import { Users, Package, BarChart3, Shield } from "lucide-react";

// Contexts
import { useLanguage } from "../../contexts/LanguageContext";
import { useAuth } from "../../contexts/AuthContext";

// Tabs
import OverviewTab from "./OverviewTab";
import TeachersTab from "./TeachersTab";
import ItemsTab from "./ItemsTab";
import StudentsTab from "./StudentsTab";
import UsersTab from "./UsersTab";

export default function AdminPanel() {
  const { t } = useLanguage();
  const { teachers, items, students, addTeacher, addItem } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  // ✅ Users state
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@example.com" },
  ]);
  const [userForm, setUserForm] = useState({ name: "", email: "" });
  const [showUserDialog, setShowUserDialog] = useState(false);

  // ✅ Teacher form states
  const [teacherForm, setTeacherForm] = useState({ name: "", email: "" });
  const [showTeacherDialog, setShowTeacherDialog] = useState(false);

  // ✅ Item form states
  const [itemForm, setItemForm] = useState({
    name: "",
    price: "",
    description: "",
  });
  const [showItemDialog, setShowItemDialog] = useState(false);

  // ✅ Add user
  const handleAddUser = (e) => {
    e.preventDefault();
    if (userForm.name && userForm.email) {
      setUsers((prev) => [
        ...prev,
        { id: Date.now(), name: userForm.name, email: userForm.email },
      ]);
      setUserForm({ name: "", email: "" });
      setShowUserDialog(false);
    }
  };

  // ✅ Add teacher
  const handleAddTeacher = (e) => {
    e.preventDefault();
    if (teacherForm.name && teacherForm.email) {
      addTeacher(teacherForm.name, teacherForm.email);
      setTeacherForm({ name: "", email: "" });
      setShowTeacherDialog(false);
    }
  };

  // ✅ Add item
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
    { id: "users", label: "Users", icon: <Users className="w-4 h-4" /> },
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

          {/* Tabs Content */}
          {activeTab === "overview" && (
            <OverviewTab
              students={students}
              teachers={teachers}
              items={items}
              totalCoins={totalCoins}
              averageCoins={averageCoins}
            />
          )}

          {activeTab === "users" && (
            <UsersTab
              users={users}
              t={t}
              showUserDialog={showUserDialog}
              setShowUserDialog={setShowUserDialog}
              userForm={userForm}
              setUserForm={setUserForm}
              handleAddUser={handleAddUser}
            />
          )}

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

          {activeTab === "students" && (
            <StudentsTab students={students} t={t} />
          )}
        </div>
      </div>
    </div>
  );
}
