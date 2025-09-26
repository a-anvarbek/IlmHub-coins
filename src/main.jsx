import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Redux
import { Provider } from "react-redux";
import { store } from "./utils/redux/store"; // path to your store

// Context Providers (agar ishlatayotgan bo‘lsangiz)
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";

// Root element
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
      </LanguageProvider>
    </Provider>
  </StrictMode>
);
