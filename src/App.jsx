// Pages
import MainRouter from "./router/MainRouter";

// Components
import Header from "./components/Header";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <MainRouter />
    </>
  );
}
