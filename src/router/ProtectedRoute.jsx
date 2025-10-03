import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { selectAuth } from "../utils/redux/authSlice";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { token, role } = useSelector(selectAuth);

  // login qilinmagan bo‘lsa → /login ga yo‘naltiramiz
  if (!token) return <Navigate to="/login" replace />;

  // role mos kelmasa → home ga qaytaramiz
  if (!allowedRoles.includes(Number(role))) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;