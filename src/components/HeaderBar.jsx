import { Group, Text, Avatar, Menu, ActionIcon } from '@mantine/core';
import { IconMenu2, IconLogout } from '@tabler/icons-react';

export default function HeaderBar({ user, collapsed, onToggle, onLogout }) {
  return (
    <Group h="100%" px="md" justify="space-between" wrap="nowrap">
      {/* Left: Toggle + Brand */}
      <Group gap={6} wrap="nowrap">
        <ActionIcon
          variant="transparent"
          color="white"
          size="lg"
          onClick={onToggle}
          style={{ border: 'none' }}
        >
          <IconMenu2 size={22} stroke={2} color="#fff" />
        </ActionIcon>
        <Text c="white" fw={900} size="xl" tt="uppercase" visibleFrom="sm" style={{ letterSpacing: 1 }}>
          webDashboard
        </Text>
      </Group>

      {/* Right: User */}
      <Group gap="md" wrap="nowrap">
        <Menu shadow="none" width={200} offset={4}>
          <Menu.Target>
            <Group
              style={{
                cursor: 'pointer',
                border: '2px solid #fff',
                padding: '2px 8px 2px 2px',
              }}
              gap={6}
              wrap="nowrap"
            >
              <Avatar
                src={user?.photoURL}
                color="cyan"
                radius={0}
                size="sm"
                style={{
                  background: '#00E5FF',
                  border: 'none',
                  fontWeight: 900,
                }}
              >
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </Avatar>
              <Text c="white" size="sm" visibleFrom="sm" fw={700}>
                {user?.email?.split('@')[0] || 'User'}
              </Text>
            </Group>
          </Menu.Target>
          <Menu.Dropdown
            style={{
              border: '3px solid #000',
              borderRadius: 0,
              boxShadow: '4px 4px 0px 0px #000',
              padding: 0,
            }}
          >
            <Menu.Label style={{ fontWeight: 700, fontSize: 12, textTransform: 'uppercase' }}>
              {user?.email}
            </Menu.Label>
            <Menu.Divider style={{ borderTop: '2px solid #000' }} />
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={16} />}
              onClick={onLogout}
              style={{ fontWeight: 700 }}
            >
              LOGOUT
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
}
