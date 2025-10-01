// Libraries
import { Route, Routes } from "react-router";

// Router
import ROUTES from "./routes";
import ProtectedRoute from "./ProtectedRoute";

// ===== Imported pages =====

// Main pages
import HomePage from "../pages/main/HomePage";
import AboutPage from "../pages/main/AboutPage";
import FeaturesPage from "../pages/main/FeaturesPage";
import ContactPage from "../pages/main/ContactPage";

// Auth
import SignupPage from "../pages/auth/SignupPage";
import LoginPage from "../pages/auth/LoginPage";

// Admin
import AdminPanel from "../pages/admin/AdminPanel";

// Teacher
import TeacherPanel from "../pages/teacher/TeacherPanel";

// Student
import StudentPanel from "../pages/student/StudentPanel";

const MainRouter = () => {
  return (
    <Routes>
      {/* Main Pages */}
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.FEATURES} element={<FeaturesPage />} />
      <Route path={ROUTES.CONTACT} element={<ContactPage />} />

      {/* Auth */}
      <Route path={ROUTES.SIGN_UP} element={<SignupPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />

      {/* Admin */}
      <Route
        path={ROUTES.ADMIN}
        element={
          <ProtectedRoute allowedRoles={[0]}>
            <AdminPanel />
          </ProtectedRoute>
        }
      />

      {/* Teacher */}
      <Route
        path={ROUTES.TEACHER}
        element={
          <ProtectedRoute allowedRoles={[1]}>
            <TeacherPanel />
          </ProtectedRoute>
        }
      />

      {/* Student */}
      <Route
        path={ROUTES.STUDENT}
        element={
          <ProtectedRoute allowedRoles={[2]}>
            <StudentPanel />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default MainRouter;
