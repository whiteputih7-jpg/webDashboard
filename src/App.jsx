import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from './auth/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import AppShellLayout from './components/AppShellLayout';
import LoginPage from './auth/LoginPage';
import DashboardPage from './dashboard/DashboardPage';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

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
    <MantineProvider>
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
