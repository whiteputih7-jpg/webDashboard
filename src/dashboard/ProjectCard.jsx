import { useState, useEffect } from 'react';
import { Paper, Title, Group, ActionIcon, Text } from '@mantine/core';
import { query, where, orderBy, onSnapshot, doc, deleteDoc, updateDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import TaskItem from './TaskItem';
import AddTaskForm from './AddTaskForm';

export default function ProjectCard({ project, onDelete }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'tasks'),
      where('projectId', '==', project.id),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, [project.id]);

  const handleToggle = async (taskId, done, urgent) => {
    try {
      const updates = {};
      if (done !== undefined) updates.done = done;
      if (urgent !== undefined) updates.urgent = urgent;
      await updateDoc(doc(db, 'tasks', taskId), updates);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
    } catch (err) {
      console.error(err);
    }
  };

  const activeTasks = tasks.filter(t => !t.done);
  const urgentCount = activeTasks.filter(t => t.urgent).length;

  return (
    <Paper withBorder shadow="sm" p="sm" radius="md" style={{ minWidth: 280, maxWidth: 320, flex: 1 }}>
      <Group justify="space-between" mb="xs">
        <Group gap={4}>
          <Title order={5}>{project.name}</Title>
          {urgentCount > 0 && <Text c="red" size="xs" fw={700}>{'🔴'.repeat(urgentCount)}</Text>}
        </Group>
        <ActionIcon size="sm" color="red" variant="subtle" onClick={() => onDelete(project.id)}>
          ✕
        </ActionIcon>
      </Group>

      {tasks.length === 0 && (
        <Text size="sm" c="dimmed" ta="center" py="md">Belum ada task.</Text>
      )}

      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={handleToggle}
          onDelete={handleDeleteTask}
        />
      ))}

      <AddTaskForm projectId={project.id} />
    </Paper>
  );
}
