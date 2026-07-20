import { useState } from 'react';
import { AppShell, Group, Text, Avatar, Menu } from '@mantine/core';
import { useAuth } from '../auth/AuthProvider';
import Sidebar from './Sidebar';
import HeaderBar from './HeaderBar';

export default function AppShellLayout({ children, activeMenu, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  return (
    <AppShell
      navbar={{ width: collapsed ? 60 : 250, breakpoint: 768 }}
      header={{ height: 60 }}
      padding="md"
      styles={{
        main: {
          background: '#f5f7fb',
          minHeight: '100vh'
        }
      }}
    >
      {/* Header */}
      <AppShell.Header style={{ background: 'linear-gradient(135deg, #4e73df 0%, #224abe 100%)', border: 'none' }}>
        <HeaderBar
          user={user}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          onLogout={logout}
        />
      </AppShell.Header>

      {/* Sidebar */}
      <AppShell.Navbar p="xs" style={{ background: '#fff', borderRight: '1px solid #e3e6f0' }}>
        <Sidebar
          collapsed={collapsed}
          activeMenu={activeMenu}
          onNavigate={onNavigate}
        />
      </AppShell.Navbar>

      {/* Content */}
      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
