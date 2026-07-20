import { useState } from 'react';
import { AppShell, Group, Text, Burger } from '@mantine/core';
import { useAuth } from '../auth/AuthProvider';
import Sidebar from './Sidebar';
import HeaderBar from './HeaderBar';

export default function AppShellLayout({ children, activeMenu, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  return (
    <AppShell
      navbar={{ width: collapsed ? 64 : 240, breakpoint: 768 }}
      header={{ height: 56 }}
      padding={0}
    >
      {/* Header */}
      <AppShell.Header
        style={{
          background: '#000',
          border: 'none',
          borderBottom: '3px solid #000',
          height: 56,
        }}
      >
        <HeaderBar
          user={user}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          onLogout={logout}
        />
      </AppShell.Header>

      {/* Sidebar */}
      <AppShell.Navbar
        p={0}
        style={{
          background: '#fff',
          borderRight: '3px solid #000',
          paddingTop: 8,
        }}
      >
        <Sidebar
          collapsed={collapsed}
          activeMenu={activeMenu}
          onNavigate={onNavigate}
        />
      </AppShell.Navbar>

      {/* Content */}
      <AppShell.Main
        style={{
          background: '#F5F5DC',
          minHeight: '100vh',
          padding: 24,
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
