import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Toast from "../ui/Toast";
import CookieConsentBanner from "../legal/CookieConsentBanner";

export default function Layout() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
      <Toast />
      <CookieConsentBanner />
    </div>
  );
}
