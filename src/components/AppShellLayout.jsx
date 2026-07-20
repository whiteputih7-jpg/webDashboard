import { useState } from 'react';
import { AppShell } from '@mantine/core';
import { useAuth } from '../auth/AuthProvider';
import Sidebar from './Sidebar';
import HeaderBar from './HeaderBar';

export default function AppShellLayout({ children, activeMenu, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  const sidebarW = collapsed ? 64 : 240;

  return (
    <AppShell
      navbar={{ width: sidebarW, breakpoint: 768 }}
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
          paddingTop: 0,
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
          padding: '32px 40px',
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
