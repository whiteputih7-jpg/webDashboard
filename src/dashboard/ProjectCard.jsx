import { useState, useEffect } from 'react';
import { Box, Title, Group, ActionIcon, Text } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
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
    <Box
      style={{
        border: '3px solid #000',
        background: '#fff',
        minWidth: 300,
        maxWidth: 340,
        flex: 1,
        boxShadow: '4px 4px 0px 0px #000',
      }}
    >
      {/* Header Card */}
      <Group
        justify="space-between"
        p="sm"
        style={{
          borderBottom: '3px solid #000',
          background: urgentCount > 0 ? '#FF00FF' : '#fff',
        }}
      >
        <Group gap={6}>
          <Title order={5} fw={800} tt="uppercase" c={urgentCount > 0 ? '#fff' : '#000'}>
            {project.name}
          </Title>
          {urgentCount > 0 && (
            <Box
              style={{
                background: '#FFD600',
                border: '2px solid #000',
                padding: '2px 6px',
              }}
            >
              <Text fw={800} size="xs" c="#000">
                🔴 {urgentCount}
              </Text>
            </Box>
          )}
        </Group>
        <ActionIcon
          size="sm"
          color="dark"
          variant="subtle"
          onClick={() => onDelete(project.id)}
          style={{ border: '2px solid #000', borderRadius: 0 }}
        >
          <IconTrash size={14} stroke={2} />
        </ActionIcon>
      </Group>

      {/* Task List */}
      <Box p="sm">
        {tasks.length === 0 && (
          <Text fw={700} size="sm" c="#000" ta="center" py="md">
            BELUM ADA TASK.
          </Text>
        )}

        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDeleteTask}
          />
        ))}
      </Box>

      {/* Add Task Form */}
      <Box style={{ borderTop: '2px solid #000' }}>
        <AddTaskForm projectId={project.id} />
      </Box>
    </Box>
  );
}
