import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CoursesListPage from './pages/CoursesListPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import VideoPlayerPage from './pages/VideoPlayerPage';
import ProfilePage from './pages/ProfilePage';
import MyCoursesPage from './pages/MyCoursesPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminStudentsPage from './pages/AdminStudentsPage';
import AdminVideosPage from './pages/AdminVideosPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PricingPage from './pages/PricingPage';
import NotFoundPage from './pages/NotFoundPage';
import { useAuth } from './context/AuthContext';
import { FlaskConical } from 'lucide-react';
import { motion } from 'motion/react';

// Protected Route component for admin
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <FlaskConical size={48} className="text-blue-600" />
        </motion.div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// Protected Route component for authenticated users
function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <FlaskConical size={48} className="text-blue-600" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        >
          <FlaskConical size={48} className="text-blue-600" />
        </motion.div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/courses" element={<CoursesListPage />} />
        <Route path="/courses/:courseId" element={<CourseDetailsPage />} />
        <Route path="/videos/:videoId?" element={<VideoPlayerPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* Protected Routes - Authenticated Users */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <PrivateRoute>
              <MyCoursesPage />
            </PrivateRoute>
          }
        />

        {/* Protected Routes - Admin Only */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboardPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <AdminRoute>
              <AdminStudentsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/videos"
          element={
            <AdminRoute>
              <AdminVideosPage />
            </AdminRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}