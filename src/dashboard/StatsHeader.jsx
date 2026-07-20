import { Group, Paper, Text, SimpleGrid } from '@mantine/core';
import { IconFolder, IconChecklist, IconAlertTriangle } from '@tabler/icons-react';

const stats = [
  {
    label: 'Total Project',
    color: '#4e73df',
    bg: '#e8ecfc',
    icon: IconFolder,
    key: 'projectCount',
  },
  {
    label: 'Task Aktif',
    color: '#1cc88a',
    bg: '#e6faf2',
    icon: IconChecklist,
    key: 'activeTaskCount',
  },
  {
    label: 'Urgent',
    color: '#e74a3b',
    bg: '#fde8e6',
    icon: IconAlertTriangle,
    key: 'urgentCount',
  },
];

export default function StatsHeader({ projectCount, activeTaskCount, urgentCount }) {
  const values = { projectCount, activeTaskCount, urgentCount };

  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} mb="lg" spacing="lg">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <Paper
            key={item.key}
            withBorder
            shadow="sm"
            p="lg"
            radius="md"
            style={{
              borderLeft: `4px solid ${item.color}`,
              position: 'relative',
            }}
          >
            <Group justify="space-between" align="flex-start">
              <div>
                <Text size="xs" c="dimmed" tt="uppercase" fw={600} mb={4}>
                  {item.label}
                </Text>
                <Text style={{ fontSize: 32, lineHeight: 1 }} fw={700} c={item.color}>
                  {values[item.key]}
                </Text>
              </div>
              <Paper
                bg={item.bg}
                p="sm"
                radius="md"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <Icon size={28} stroke={1.5} color={item.color} />
              </Paper>
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
}
