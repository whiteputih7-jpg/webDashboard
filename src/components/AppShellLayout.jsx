import { useState } from 'react';
import { useAuth } from '../auth/AuthProvider';
import Sidebar from './Sidebar';
import HeaderBar from './HeaderBar';

const HEADER_H = 56;
const SIDEBAR_W = 240;
const SIDEBAR_W_COLLAPSED = 64;

export default function AppShellLayout({ children, activeMenu, onNavigate }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();

  const sw = collapsed ? SIDEBAR_W_COLLAPSED : SIDEBAR_W;

  return (
    <div style={{ minHeight: '100vh', background: '#F5F5DC' }}>
      {/* Header */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_H,
        background: '#000',
        borderBottom: '3px solid #000',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
      }}>
        <HeaderBar
          user={user}
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          onLogout={logout}
        />
      </div>

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: HEADER_H,
        left: 0,
        width: sw,
        height: `calc(100vh - ${HEADER_H}px)`,
        background: '#fff',
        borderRight: '3px solid #000',
        zIndex: 100,
        overflowY: 'auto',
        transition: 'width 0.15s ease',
      }}>
        <Sidebar
          collapsed={collapsed}
          activeMenu={activeMenu}
          onNavigate={onNavigate}
        />
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: sw,
        marginTop: HEADER_H,
        minHeight: `calc(100vh - ${HEADER_H}px)`,
        background: '#F5F5DC',
        padding: '32px 40px',
        transition: 'margin-left 0.15s ease',
      }}>
        {children}
      </div>
    </div>
  );
}
