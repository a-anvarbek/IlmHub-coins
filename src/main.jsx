// Libraries
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

// Redux
import { Provider } from "react-redux";
import { store } from "./utils/redux/store";

// Component
import App from "./App.jsx";

// Context Providers
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

// Style
import "./index.css";

// Root element
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={store}>
      <LanguageProvider>
        <AuthProvider>
          <ThemeProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
        </AuthProvider>
      </LanguageProvider>
    </Provider>
  </StrictMode>
);
