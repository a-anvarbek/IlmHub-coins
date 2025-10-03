// src/pages/main/Shop.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // 🔹 ikon qo‘shildi
import ROUTES from "../../router/routes"; 

const initialItems = [
  {
    id: 1,
    name: "Cool T-Shirt Design",
    description: "Futbolka dizayni – chiroyli rang va grafika bilan",
    price: 65,
    stock: 10,
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Motivational Poster",
    description: "Motivatsion sitata va zamonaviy dizayn",
    price: 40,
    stock: 5,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Book Voucher",
    description: "Kitob kuponi – ajoyib sovg'a",
    price: 100,
    stock: 3,
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Shop() {
  const [items, setItems] = useState(initialItems);
  const navigate = useNavigate();

  const handlePurchase = (item) => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN);
      return;
    }

    if (item.stock <= 0) {
      alert(`${item.name} hozirda mavjud emas!`);
      return;
    }

    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, stock: i.stock - 1 } : i))
    );
    alert(`${item.name} sotib olindi — ${item.price} coins`);
    navigate(ROUTES.CART);
  };

  const handleShopNow = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!isLoggedIn) {
      navigate(ROUTES.LOGIN);
    } else {
      navigate(ROUTES.CART);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-indigo-100 to-blue-100 py-8 px-6">
      {/* Header va umumiy button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-indigo-700">🛒 IlmHub Shop</h1>
        <button
          onClick={handleShopNow}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Shop Now
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex flex-col flex-1 justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
              <div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-indigo-600 font-bold">🪙 {item.price}</span>
                  <button
                    onClick={() => handlePurchase(item)}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                  >
                    <ShoppingCart size={18} />
                    Purchase
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">{item.stock} in stock</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}