import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/lib/auth';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import MenuPage from '@/pages/Menu';
import AboutPage from '@/pages/About';
import GalleryPage from '@/pages/Gallery';
import ContactPage from '@/pages/Contact';
import AdminLogin from '@/pages/admin/Login';
import AdminLayout from '@/components/admin/AdminLayout';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import Dashboard from '@/pages/admin/Dashboard';
import MenuManager from '@/pages/admin/MenuManager';
import GalleryManager from '@/pages/admin/GalleryManager';
import StoryEditor from '@/pages/admin/StoryEditor';
import SettingsEditor from '@/pages/admin/SettingsEditor';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
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
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
