import { Checkbox, Group, Text, ActionIcon, Image, Box } from '@mantine/core';
import { IconTrash, IconAlertTriangle, IconAlertTriangleFilled } from '@tabler/icons-react';

export default function TaskItem({ task, onToggle, onDelete }) {
  const isDone = task.done;

  return (
    <Box
      mb={6}
      style={{
        border: '2px solid #000',
        background: isDone ? '#eee' : (task.urgent ? '#FFD600' : '#fff'),
        opacity: isDone ? 0.6 : 1,
      }}
    >
      <Group justify="space-between" wrap="nowrap" p="xs" gap={8}>
        <Group wrap="nowrap" style={{ flex: 1 }} gap={8}>
          <Checkbox
            checked={isDone}
            onChange={() => onToggle(task.id, !isDone)}
            size="sm"
          />
          <Box style={{ flex: 1 }}>
            <Text
              size="sm"
              fw={600}
              c="#000"
              style={{ textDecoration: isDone ? 'line-through' : 'none' }}
            >
              {task.text}
            </Text>
            {task.createdAt?.toDate && (
              <Text size="xs" fw={600} c="#555" tt="uppercase">
                {task.createdAt.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })},{' '}
                {task.createdAt.toDate().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            )}
            {task.imageUrl && (
              <Image
                src={task.imageUrl}
                alt="Task image"
                height={60}
                width={90}
                fit="cover"
                mt={4}
                style={{
                  border: '2px solid #000',
                  cursor: 'pointer',
                }}
                onClick={() => window.open(task.imageUrl, '_blank')}
              />
            )}
          </Box>
        </Group>
        <Group gap={4} wrap="nowrap">
          <ActionIcon
            size="sm"
            variant="subtle"
            color="dark"
            onClick={() => onToggle(task.id, isDone, !task.urgent)}
            style={{
              border: '2px solid #000',
              borderRadius: 0,
              background: task.urgent ? '#FF00FF' : '#fff',
            }}
          >
            <IconAlertTriangle size={14} stroke={2} color="#000" />
          </ActionIcon>
          <ActionIcon
            size="sm"
            color="dark"
            variant="subtle"
            onClick={() => onDelete(task.id)}
            style={{ border: '2px solid #000', borderRadius: 0 }}
          >
            <IconTrash size={14} stroke={2} />
          </ActionIcon>
        </Group>
      </Group>
    </Box>
  );
}
