import { Group, Paper, Text } from '@mantine/core';

export default function StatsHeader({ projectCount, activeTaskCount, urgentCount }) {
  return (
    <Paper withBorder shadow="sm" p="md" mb="md">
      <Group justify="space-between">
        <div>
          <Text size="xl" fw={700}>webDashboard</Text>
          <Text size="sm" c="dimmed">tersambung ke Firebase</Text>
        </div>
        <Group>
          <Paper withBorder p="xs" px="md" style={{ minWidth: 100, textAlign: 'center' }}>
            <Text size="28" fw={700}>{projectCount}</Text>
            <Text size="xs" c="dimmed">PROJECT</Text>
          </Paper>
          <Paper withBorder p="xs" px="md" style={{ minWidth: 100, textAlign: 'center' }}>
            <Text size="28" fw={700}>{activeTaskCount}</Text>
            <Text size="xs" c="dimmed">TASK AKTIF</Text>
          </Paper>
          <Paper withBorder p="xs" px="md" style={{ minWidth: 100, textAlign: 'center' }}>
            <Text size="28" fw={700} c="red">{urgentCount}</Text>
            <Text size="xs" c="dimmed">URGENT</Text>
          </Paper>
        </Group>
      </Group>
    </Paper>
  );
}
