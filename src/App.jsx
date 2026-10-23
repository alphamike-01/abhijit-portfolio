import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CMSProvider } from "./context/CMSContext";

// Layout
import Layout from "./components/layout/Layout";

// Public Pages
import Home from "./pages/Home";
import ServicesPage from "./pages/services/ServicesPage";
import ServiceDetailPage from "./pages/services/ServiceDetailPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import AboutPage from "./pages/about/AboutPage";
import QuotePage from "./pages/quote/QuotePage";
import BlogPage from "./pages/blog/BlogPage";
import BlogPostPage from "./pages/blog/BlogPostPage";
import NotFound from "./pages/NotFound";

// Legal Pages
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiePolicy from "./pages/legal/CookiePolicy";
import Disclaimer from "./pages/legal/Disclaimer";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminQuotes from "./pages/admin/AdminQuotes";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminBlogEditor from "./pages/admin/AdminBlogEditor";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminAdSense from "./pages/admin/AdminAdSense";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Protected Route Guard for Admin Panel
function ProtectedAdminRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CMSProvider>
          <ScrollToTop />
          <Routes>
            {/* Public Client & Publishing Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="services/:slug" element={<ServiceDetailPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="quote" element={<QuotePage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogPostPage />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="terms" element={<TermsOfService />} />
              <Route path="cookies" element={<CookiePolicy />} />
              <Route path="disclaimer" element={<Disclaimer />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Admin Authentication */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin CMS Dashboard */}
            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="quotes" element={<AdminQuotes />} />
              <Route path="blog" element={<AdminBlog />} />
              <Route path="blog/new" element={<AdminBlogEditor />} />
              <Route path="blog/edit/:id" element={<AdminBlogEditor />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="adsense" element={<AdminAdSense />} />
            </Route>
          </Routes>
        </CMSProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
