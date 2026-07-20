import { Group, Text, Avatar, Menu, ActionIcon, TextInput } from '@mantine/core';
import { IconMenu2, IconSearch, IconBell, IconLogout } from '@tabler/icons-react';

export default function HeaderBar({ user, collapsed, onToggle, onLogout }) {
  return (
    <Group h="100%" px="md" justify="space-between" wrap="nowrap">
      {/* Left: Toggle + Brand */}
      <Group gap="xs" wrap="nowrap">
        <ActionIcon variant="transparent" color="white" size="lg" onClick={onToggle}>
          <IconMenu2 size={22} stroke={1.5} />
        </ActionIcon>
        <Text c="white" fw={700} size="lg" visibleFrom="sm">webDashboard</Text>
      </Group>

      {/* Right: User */}
      <Group gap="md" wrap="nowrap">
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <Group style={{ cursor: 'pointer' }} gap={8} wrap="nowrap">
              <Avatar
                src={user?.photoURL}
                color="blue"
                radius="xl"
                size="sm"
                style={{ border: '2px solid rgba(255,255,255,0.6)' }}
              >
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </Avatar>
              <Text c="white" size="sm" visibleFrom="sm" fw={500}>
                {user?.email?.split('@')[0] || 'User'}
              </Text>
            </Group>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{user?.email}</Menu.Label>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={16} />}
              onClick={onLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
