// Libraries
import { createContext, useContext, useState } from "react";

// Context 
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [students, setStudents] = useState([
    { id: "1", name: "Ahmadjon Karimov", studentId: "1234567890", coins: 50 },
    { id: "2", name: "Malika Tosheva", studentId: "0987654321", coins: 30 },
  ]);

  const [teachers, setTeachers] = useState([
    { id: "1", name: "Ozoda Rahimova", email: "ozoda@ilhub.uz" },
    { id: "2", name: "Bobur Alimov", email: "bobur@ilhub.uz" },
  ]);

  const [items, setItems] = useState([
    {
      id: "1",
      name: "English Dictionary",
      price: 20,
      description: "Comprehensive English-Uzbek dictionary",
    },
    {
      id: "2",
      name: "Programming Book",
      price: 35,
      description: "Introduction to Programming",
    },
    {
      id: "3",
      name: "Math Calculator",
      price: 15,
      description: "Scientific calculator for math courses",
    },
  ]);

  const generateStudentId = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  // Login function
  const login = async (credentials) => {
    // Admin
    if (
      credentials.email === "admin@ilhub.uz" &&
      credentials.password === "admin123"
    ) {
      setUser({
        id: "admin",
        name: "Admin",
        email: "admin@ilhub.uz",
        role: "admin",
      });
      return true;
    }

    // Teacher
    if (credentials.email && credentials.password === "teacher123") {
      const teacher = teachers.find((t) => t.email === credentials.email);
      if (teacher) {
        setUser({
          id: teacher.id,
          name: teacher.name,
          email: teacher.email,
          role: "teacher",
        });
        return true;
      }
    }

    // Student
    if (credentials.studentId && credentials.password === "student123") {
      const student = students.find(
        (s) => s.studentId === credentials.studentId
      );
      if (student) {
        setUser({
          id: student.id,
          name: student.name,
          studentId: student.studentId,
          role: "student",
          coins: student.coins,
        });
        return true;
      }
    }

    return false;
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  // Signup
  const signup = async (data) => {
    const newUser = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: data.role,
    };

    if (data.role === "student") {
      newUser.studentId = generateStudentId();
      newUser.coins = 0;
      setStudents((prev) => [...prev, newUser]);
    }

    if (data.role === "teacher") {
      setTeachers((prev) => [...prev, newUser]);
    }

    setUser(newUser);
    return true;
  };

  const addStudent = (name) => {
    const studentId = generateStudentId();
    const newStudent = {
      id: Date.now().toString(),
      name,
      studentId,
      coins: 10, 
    };
    setStudents((prev) => [...prev, newStudent]);
    return studentId;
  };

  const addTeacher = (name, email) => {
    const newTeacher = {
      id: Date.now().toString(),
      name,
      email,
    };
    setTeachers((prev) => [...prev, newTeacher]);
  };

  const addItem = (name, price, description) => {
    const newItem = {
      id: Date.now().toString(),
      name,
      price,
      description,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const giveCoins = (studentId, amount) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.studentId === studentId
          ? { ...student, coins: student.coins + amount }
          : student
      )
    );

    if (user?.studentId === studentId) {
      setUser((prev) =>
        prev ? { ...prev, coins: (prev.coins || 0) + amount } : null
      );
    }
  };

  const buyItem = (itemId) => {
    if (!user || user.role !== "student") return false;

    const item = items.find((i) => i.id === itemId);
    const student = students.find((s) => s.studentId === user.studentId);

    if (!item || !student || student.coins < item.price) return false;

    setStudents((prev) =>
      prev.map((s) =>
        s.studentId === user.studentId
          ? { ...s, coins: s.coins - item.price }
          : s
      )
    );

    setUser((prev) =>
      prev ? { ...prev, coins: (prev.coins || 0) - item.price } : null
    );

    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        signup,
        students,
        teachers,
        items,
        addStudent,
        addTeacher,
        addItem,
        giveCoins,
        buyItem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
