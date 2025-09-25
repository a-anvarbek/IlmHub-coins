// Libraries
import { createContext, useContext, useState } from "react";

const LanguageContext = createContext(undefined);

const translations = {
  uz: {
    // Header
    "nav.about": "Haqida",
    "nav.features": "Xususiyatlar",
    "nav.contact": "Aloqa",
    "nav.login": "Kirish",
    "nav.signup": "Ro'yxatdan o'tish",
    "nav.logout": "Chiqish",

    // Home page
    "home.title": "IlmHub o'quv markazi",
    "home.subtitle":
      "Ta'limga zamonaviy yondashuvlar. Ingliz tili, IT, Matematika va eng zamonaviy kurslarimiz bir maydonda o'rganish imkoniyati. Farzandingiz kelajagini birgalikda ilmhubda quramiz!",
    "home.phone": "94 671 50 60",
    "home.contact_button": "Ma'lumot olish",
    "home.register_text": "Registratsiya uchun",
    "home.call_now": "hoziroq qo'ng'iroq qiling",

    // About page
    "about.title": "Biz haqimizda",
    "about.description":
      "IlmHub - zamonaviy ta'lim markazidir. Biz o'quvchilarga yuqori sifatli ta'lim berish va ularning kelajagini shakllantirishga yordam beramiz.",

    // Features page
    "features.title": "Xususiyatlar",
    "features.admin_panel": "Admin paneli",
    "features.teacher_panel": "O'qituvchi paneli",
    "features.student_panel": "O'quvchi paneli",
    "features.coin_system": "Tanga tizimi",

    // Contact page
    "contact.title": "Aloqa",
    "contact.address": "Manzil",
    "contact.phone": "Telefon",
    "contact.email": "Email",

    // Auth
    "auth.login": "Kirish",
    "auth.signup": "Ro'yxatdan o'tish",
    "auth.student_id": "O'quvchi ID",
    "auth.password": "Parol",
    "auth.email": "Email",
    "auth.name": "Ism",
    "auth.role": "Rol",
    "auth.admin": "Admin",
    "auth.teacher": "O'qituvchi",
    "auth.student": "O'quvchi",

    // Panels
    "admin.title": "Admin Paneli",
    "admin.add_teacher": "O'qituvchi qo'shish",
    "admin.add_item": "Mahsulot qo'shish",
    "admin.teachers": "O'qituvchilar",
    "admin.items": "Mahsulotlar",

    "teacher.title": "O'qituvchi Paneli",
    "teacher.add_student": "O'quvchi qo'shish",
    "teacher.give_coins": "Tanga berish",
    "teacher.students": "O'quvchilar",

    "student.title": "O'quvchi Paneli",
    "student.my_coins": "Mening tangalarim",
    "student.shop": "Do'kon",
    "student.buy": "Sotib olish",

    // Common
    "common.save": "Saqlash",
    "common.cancel": "Bekor qilish",
    "common.edit": "Tahrirlash",
    "common.delete": "O'chirish",
    "common.add": "Qo'shish",
    "common.name": "Nomi",
    "common.price": "Narxi",
    "common.coins": "Tangalar",
    "common.amount": "Miqdori",
  },
  en: {
    // Header
    "nav.about": "About",
    "nav.features": "Features",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.signup": "Sign Up",
    "nav.logout": "Logout",

    // Home page
    "home.title": "IlmHub Learning Center",
    "home.subtitle":
      "Modern approaches to education. English, IT, Mathematics and our most modern courses in one place. Let's build your child's future together at IlmHub!",
    "home.phone": "94 671 50 60",
    "home.contact_button": "Get Information",
    "home.register_text": "For registration",
    "home.call_now": "call now",

    // About page
    "about.title": "About Us",
    "about.description":
      "IlmHub is a modern educational center. We help students receive high-quality education and shape their future.",

    // Features page
    "features.title": "Features",
    "features.admin_panel": "Admin Panel",
    "features.teacher_panel": "Teacher Panel",
    "features.student_panel": "Student Panel",
    "features.coin_system": "Coin System",

    // Contact page
    "contact.title": "Contact",
    "contact.address": "Address",
    "contact.phone": "Phone",
    "contact.email": "Email",

    // Auth
    "auth.login": "Login",
    "auth.signup": "Sign Up",
    "auth.student_id": "Student ID",
    "auth.password": "Password",
    "auth.email": "Email",
    "auth.name": "Name",
    "auth.role": "Role",
    "auth.admin": "Admin",
    "auth.teacher": "Teacher",
    "auth.student": "Student",

    // Panels
    "admin.title": "Admin Panel",
    "admin.add_teacher": "Add Teacher",
    "admin.add_item": "Add Item",
    "admin.teachers": "Teachers",
    "admin.items": "Items",

    "teacher.title": "Teacher Panel",
    "teacher.add_student": "Add Student",
    "teacher.give_coins": "Give Coins",
    "teacher.students": "Students",

    "student.title": "Student Panel",
    "student.my_coins": "My Coins",
    "student.shop": "Shop",
    "student.buy": "Buy",

    // Common
    "common.save": "Save",
    "common.cancel": "Cancel",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.add": "Add",
    "common.name": "Name",
    "common.price": "Price",
    "common.coins": "Coins",
    "common.amount": "Amount",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
