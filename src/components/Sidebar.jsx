import { Stack, Text, NavLink, Divider } from '@mantine/core';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'projects', label: 'Project', icon: '📋' },
  { id: 'history', label: 'Riwayat', icon: '🗂️' },
];

export default function Sidebar({ collapsed, activeMenu, onNavigate }) {
  return (
    <Stack h="100%" justify="space-between">
      <div>
        {/* Brand */}
        <NavLink
          label={collapsed ? null : <Text fw={700} size="lg">webDashboard</Text>}
          leftSection={<Text size="xl">📋</Text>}
          disabled
          style={{ cursor: 'default' }}
          mb="md"
        />

        <Divider mb="md" />

        {/* Menu Items */}
        {menuItems.map(item => (
          <NavLink
            key={item.id}
            label={collapsed ? null : item.label}
            leftSection={<Text size="lg">{item.icon}</Text>}
            active={activeMenu === item.id}
            onClick={() => onNavigate(item.id)}
            styles={{
              root: {
                borderRadius: 8,
                marginBottom: 4,
                '&[data-active]': {
                  background: '#4e73df',
                  color: '#fff',
                  '&:hover': { background: '#4e73df' }
                }
              }
            }}
          />
        ))}
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
