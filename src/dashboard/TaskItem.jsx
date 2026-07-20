import { Checkbox, Group, Text, ActionIcon, Image, Paper } from '@mantine/core';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <Paper withBorder p="xs" mb={4} style={{ opacity: task.done ? 0.6 : 1 }}>
      <Group justify="space-between" wrap="nowrap">
        <Group wrap="nowrap" style={{ flex: 1 }}>
          <Checkbox
            checked={task.done}
            onChange={() => onToggle(task.id, !task.done)}
          />
          <div style={{ flex: 1 }}>
            <Text
              size="sm"
              style={{ textDecoration: task.done ? 'line-through' : 'none' }}
            >
              {task.text}
            </Text>
            {task.createdAt?.toDate && (
              <Text size="xs" c="dimmed">
                dibuat {task.createdAt.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}, {task.createdAt.toDate().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            )}
            {task.imageUrl && (
              <Image
                src={task.imageUrl}
                alt="Task image"
                height={80}
                width={120}
                fit="cover"
                radius="sm"
                mt={4}
                style={{ cursor: 'pointer' }}
                onClick={() => window.open(task.imageUrl, '_blank')}
              />
            )}
          </div>
          {task.urgent && (
            <Text c="red" fw={700} size="xs">URGENT</Text>
          )}
        </Group>
        <Group gap={4}>
          <ActionIcon
            size="sm"
            color={task.urgent ? 'red' : 'gray'}
            variant="subtle"
            onClick={() => onToggle(task.id, task.done, !task.urgent)}
          >
            🔴
          </ActionIcon>
          <ActionIcon size="sm" color="red" variant="subtle" onClick={() => onDelete(task.id)}>
            ✕
          </ActionIcon>
        </Group>
      </Group>
    </Paper>
  );
}
