import { Group, Paper, Text, SimpleGrid, Box } from '@mantine/core';
import { IconFolder, IconChecklist, IconAlertTriangle } from '@tabler/icons-react';

const stats = [
  {
    label: 'TOTAL PROJECT',
    color: '#00E5FF',
    icon: IconFolder,
    key: 'projectCount',
  },
  {
    label: 'TASK AKTIF',
    color: '#FFD600',
    icon: IconChecklist,
    key: 'activeTaskCount',
  },
  {
    label: 'URGENT',
    color: '#FF00FF',
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
            p="lg"
            style={{
              border: '3px solid #000',
              borderRadius: 0,
              background: '#fff',
              boxShadow: '5px 5px 0px 0px #000',
            }}
          >
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              <Box style={{ flex: 1 }}>
                <Text
                  size="xs"
                  c="#000"
                  tt="uppercase"
                  fw={800}
                  mb={4}
                  style={{ letterSpacing: 0.5 }}
                >
                  {item.label}
                </Text>
                <Text
                  style={{ fontSize: 42, lineHeight: 1, fontWeight: 900 }}
                  c="#000"
                >
                  {values[item.key]}
                </Text>
              </Box>
              <Box
                style={{
                  background: item.color,
                  border: '3px solid #000',
                  padding: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: 52,
                  minHeight: 52,
                }}
              >
                <Icon size={28} stroke={2} color="#000" />
              </Box>
            </Group>
          </Paper>
        );
      })}
    </SimpleGrid>
  );
}
