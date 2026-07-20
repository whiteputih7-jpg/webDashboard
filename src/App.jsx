import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import AppShellLayout from './components/AppShellLayout';
import LoginPage from './auth/LoginPage';
import DashboardPage from './dashboard/DashboardPage';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

const theme = createTheme({
  fontFamily: "'Inter', 'Segoe UI', -apple-system, sans-serif",
  defaultRadius: 'md',
  primaryColor: 'blue',
  primaryShade: 6,
  colors: {
    blue: [
      '#e8ecfc', '#d1d9f8', '#a3b3f1', '#758dea', '#4767e3',
      '#224abe', '#1a3a9e', '#132a7e', '#0c1a5e', '#060a3e'
    ],
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.1)',
    lg: '0 8px 24px rgba(0,0,0,0.12)',
  },
  components: {
    Paper: {
      defaultProps: {
        shadow: 'sm',
      },
    },
  },
});

function DashboardWrapper() {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const navigate = useNavigate();

  const handleNavigate = (menu) => {
    setActiveMenu(menu);
    if (menu === 'dashboard') navigate('/dashboard');
  };

  return (
    <AppShellLayout activeMenu={activeMenu} onNavigate={handleNavigate}>
      <DashboardPage activeMenu={activeMenu} />
    </AppShellLayout>
  );
}

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardWrapper /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </MantineProvider>
  );
}
