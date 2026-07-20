import { Group, Paper, Text, SimpleGrid } from '@mantine/core';

export default function StatsHeader({ projectCount, activeTaskCount, urgentCount }) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }} mb="md">
      <Paper withBorder shadow="sm" p="md" radius="md">
        <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Total Project</Text>
        <Text size="28" fw={700} c="blue">{projectCount}</Text>
      </Paper>
      <Paper withBorder shadow="sm" p="md" radius="md">
        <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Task Aktif</Text>
        <Text size="28" fw={700} c="blue">{activeTaskCount}</Text>
      </Paper>
      <Paper withBorder shadow="sm" p="md" radius="md">
        <Text size="xs" c="dimmed" tt="uppercase" fw={600}>Urgent</Text>
        <Text size="28" fw={700} c="red">{urgentCount}</Text>
      </Paper>
    </SimpleGrid>
  );
}
