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
import './neo-style.css';

const theme = createTheme({
  defaultRadius: 0,
  fontFamily: "'Inter', 'Segoe UI', -apple-system, sans-serif",
  primaryColor: 'brutalTeal',
  colors: {
    brutalTeal: ['#e6ffff', '#b3f5ff', '#80ebff', '#4de0ff', '#00E5FF', '#00ccd6', '#00b3ad', '#009985', '#00805c', '#006633'],
  },
  headings: {
    fontWeight: '900',
  },
  components: {
    Paper: {
      defaultProps: {
        withBorder: true,
        shadow: 'none',
      },
      styles: {
        root: {
          border: '3px solid #000',
          borderRadius: 0,
        },
      },
    },
    Button: {
      defaultProps: {
        radius: 0,
      },
      styles: {
        root: {
          border: '3px solid #000',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontSize: 14,
          height: 44,
          padding: '0 24px',
          transition: 'none',
          '&:hover': {
            transform: 'translate(-2px, -2px)',
            boxShadow: '4px 4px 0px 0px #000',
          },
        },
      },
    },
    TextInput: {
      defaultProps: { radius: 0 },
      styles: {
        input: {
          border: '3px solid #000',
          borderRadius: 0,
          fontWeight: 600,
          '&:focus': {
            borderColor: '#000',
            outline: '4px solid #00E5FF',
            outlineOffset: 0,
          },
        },
        label: {
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: 12,
          marginBottom: 4,
        },
      },
    },
    PasswordInput: {
      styles: {
        input: {
          border: '3px solid #000',
          borderRadius: 0,
          '&:focus': {
            borderColor: '#000',
            outline: '4px solid #00E5FF',
            outlineOffset: 0,
          },
        },
        label: {
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: 12,
          marginBottom: 4,
        },
      },
    },
    Modal: {
      styles: {
        content: {
          border: '3px solid #000',
          borderRadius: 0,
          boxShadow: '7px 7px 0px 0px #000',
        },
        header: {
          borderBottom: '3px solid #000',
          padding: '16px 20px',
        },
        title: {
          fontWeight: 800,
          fontSize: 20,
          textTransform: 'uppercase',
        },
        body: {
          padding: 20,
        },
      },
    },
    Checkbox: {
      styles: {
        input: {
          border: '3px solid #000',
          borderRadius: 0,
          '&:checked': {
            background: '#00E5FF',
            borderColor: '#000',
          },
        },
      },
    },
    NavLink: {
      styles: {
        root: {
          borderRadius: 0,
          borderLeft: '4px solid transparent',
        },
      },
    },
    ScrollArea: {
      styles: {
        root: {
          '& .mantine-ScrollArea-viewport': {
            '& > div': {
              display: 'flex !important',
            },
          },
        },
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
