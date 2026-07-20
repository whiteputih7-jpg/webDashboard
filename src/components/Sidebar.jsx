import { Stack, Text, NavLink, Box } from '@mantine/core';
import { IconLayoutDashboard, IconFolder, IconHistory } from '@tabler/icons-react';

const menuItems = [
  { id: 'dashboard', label: 'DASHBOARD', icon: IconLayoutDashboard },
  { id: 'projects', label: 'PROJECT', icon: IconFolder },
  { id: 'history', label: 'RIWAYAT', icon: IconHistory },
];

export default function Sidebar({ collapsed, activeMenu, onNavigate }) {
  return (
    <Stack h="100%" justify="space-between" gap={0}>
      <div>
        {/* Brand */}
        <Box
          px="md"
          py="sm"
          mb={8}
          style={{
            borderBottom: '3px solid #000',
            margin: '0 8px',
          }}
        >
          <Text
            fw={900}
            size={collapsed ? 'sm' : 'lg'}
            tt="uppercase"
            ta={collapsed ? 'center' : 'left'}
            style={{ letterSpacing: 1 }}
          >
            {collapsed ? 'WD' : 'webDashboard'}
          </Text>
        </Box>

        {/* Menu Items */}
        <Stack gap={2} px={8}>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <Box
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: collapsed ? '10px 0' : '10px 12px',
                  cursor: 'pointer',
                  background: isActive ? '#000' : 'transparent',
                  color: isActive ? '#fff' : '#000',
                  border: '2px solid #000',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  transition: 'none',
                  userSelect: 'none',
                }}
              >
                <Icon
                  size={20}
                  stroke={2.5}
                  color={isActive ? '#fff' : '#000'}
                />
                {!collapsed && (
                  <Text fw={isActive ? 800 : 700} size="sm" tt="uppercase" style={{ letterSpacing: 0.5 }}>
                    {item.label}
                  </Text>
                )}
              </Box>
            );
          })}
        </Stack>
      </div>

      {/* Version */}
      {!collapsed && (
        <Box pb="md" px="md">
          <Box
            style={{
              borderTop: '2px solid #000',
              paddingTop: 12,
              textAlign: 'center',
            }}
          >
            <Text size="xs" fw={700} tt="uppercase" c="dimmed">
              v1.0.0
            </Text>
          </Box>
        </Box>
      )}
    </Stack>
  );
}
