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
          <Box
            key={item.key}
            style={{
              border: '3px solid #000',
              background: '#fff',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <Box>
              <Text
                size="xs"
                c="#888"
                tt="uppercase"
                fw={700}
                mb={2}
              >
                {item.label}
              </Text>
              <Text
                style={{ fontSize: 40, lineHeight: 1.1, fontWeight: 900 }}
                c="#000"
              >
                {values[item.key]}
              </Text>
            </Box>
            <Box
              style={{
                background: item.color,
                border: '3px solid #000',
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Icon size={24} stroke={2} color="#000" />
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}
