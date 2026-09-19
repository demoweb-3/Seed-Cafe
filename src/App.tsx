import { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import ErrorBoundary from '@/components/ErrorBoundary';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';

const MenuPage = lazy(() => import('@/pages/Menu'));
const AboutPage = lazy(() => import('@/pages/About'));
const GalleryPage = lazy(() => import('@/pages/Gallery'));
const ContactPage = lazy(() => import('@/pages/Contact'));
const AdminLogin = lazy(() => import('@/pages/admin/Login'));
const AdminLayout = lazy(() => import('@/components/admin/AdminLayout'));
const ProtectedRoute = lazy(() => import('@/components/admin/ProtectedRoute'));
const Dashboard = lazy(() => import('@/pages/admin/Dashboard'));
const MenuManager = lazy(() => import('@/pages/admin/MenuManager'));
const GalleryManager = lazy(() => import('@/pages/admin/GalleryManager'));
const StoryEditor = lazy(() => import('@/pages/admin/StoryEditor'));
const SettingsEditor = lazy(() => import('@/pages/admin/SettingsEditor'));

function PageFallback() {
  return (
    <div className="min-h-screen bg-ivory-50 flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-ink-200 border-t-botanical-500 animate-spin" />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
    <HashRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Public website */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Admin login (no auth required) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin panel (auth required) */}
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="menu" element={<MenuManager />} />
              <Route path="gallery" element={<GalleryManager />} />
              <Route path="story" element={<StoryEditor />} />
              <Route path="settings" element={<SettingsEditor />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
