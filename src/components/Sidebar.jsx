import { Stack, Text, NavLink, Divider } from '@mantine/core';
import { IconLayoutDashboard, IconFolder, IconHistory } from '@tabler/icons-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: IconLayoutDashboard },
  { id: 'projects', label: 'Project', icon: IconFolder },
  { id: 'history', label: 'Riwayat', icon: IconHistory },
];

export default function Sidebar({ collapsed, activeMenu, onNavigate }) {
  return (
    <Stack h="100%" justify="space-between">
      <div>
        {/* Brand */}
        <NavLink
          label={collapsed ? null : <Text fw={700} size="lg">webDashboard</Text>}
          leftSection={
            <div style={{ background: '#4e73df', borderRadius: 8, padding: 6, display: 'flex' }}>
              <IconLayoutDashboard size={20} color="white" stroke={1.5} />
            </div>
          }
          disabled
          style={{ cursor: 'default' }}
          mb="md"
        />

        <Divider mb="md" />

        {/* Menu Items */}
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          return (
            <NavLink
              key={item.id}
              label={collapsed ? null : item.label}
              leftSection={
                <Icon
                  size={20}
                  stroke={1.5}
                  color={isActive ? '#fff' : '#5a5c69'}
                />
              }
              active={isActive}
              onClick={() => onNavigate(item.id)}
              styles={{
                root: {
                  borderRadius: 8,
                  marginBottom: 4,
                  padding: '8px 12px',
                  '&:hover': {
                    background: '#f0f2f7',
                  },
                  '&[data-active]': {
                    background: '#4e73df',
                    color: '#fff',
                    '&:hover': { background: '#3a5fc8' },
                  },
                },
                label: {
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 14,
                },
              }}
            />
          );
        })}
      </div>

      {/* Version */}
      {!collapsed && (
        <Stack align="center" pb="md">
          <Divider w="100%" />
          <Text size="xs" c="dimmed">v1.0.0</Text>
        </Stack>
      )}
    </Stack>
  );
}
