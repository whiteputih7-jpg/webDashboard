import { Group, Text, Avatar, Menu, ActionIcon, TextInput, Badge } from '@mantine/core';

export default function HeaderBar({ user, collapsed, onToggle, onLogout }) {
  return (
    <Group h="100%" px="md" justify="space-between">
      {/* Left: Toggle + Brand */}
      <Group>
        <ActionIcon variant="transparent" color="white" size="lg" onClick={onToggle}>
          ☰
        </ActionIcon>
        <Text c="white" fw={700} size="lg" visibleFrom="sm">webDashboard</Text>
      </Group>

      {/* Right: User */}
      <Group>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Group style={{ cursor: 'pointer' }} gap={8}>
              <Avatar
                src={user?.photoURL}
                color="blue"
                radius="xl"
                size="sm"
              >
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </Avatar>
              <Text c="white" size="sm" visibleFrom="sm">
                {user?.email?.split('@')[0] || 'User'}
              </Text>
            </Group>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{user?.email}</Menu.Label>
            <Menu.Divider />
            <Menu.Item color="red" onClick={onLogout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
