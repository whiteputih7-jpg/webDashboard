import { useState, useEffect } from 'react';
import { Container, Group, Button, Text, ScrollArea } from '@mantine/core';
import { useAuth } from '../auth/AuthProvider';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import StatsHeader from './StatsHeader';
import ProjectCard from './ProjectCard';
import NewProjectModal from './NewProjectModal';

export default function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'tasks'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const handleDeleteProject = async (projectId) => {
    // Hapus semua task di project ini dulu
    const taskSnap = await getDocs(query(collection(db, 'tasks'), where('projectId', '==', projectId)));
    const deletions = taskSnap.docs.map(d => deleteDoc(doc(db, 'tasks', d.id)));
    await Promise.all(deletions);
    await deleteDoc(doc(db, 'projects', projectId));
  };

  const activeTasks = tasks.filter(t => !t.done);
  const urgentTasks = activeTasks.filter(t => t.urgent);
  const doneTasks = tasks.filter(t => t.done);

  const displayTasks = showHistory ? doneTasks : activeTasks;

  return (
    <Container fluid p="md">
      {/* Header */}
      <StatsHeader
        projectCount={projects.length}
        activeTaskCount={activeTasks.length}
        urgentCount={urgentTasks.length}
      />

      {/* Toolbar */}
      <Group mb="md">
        <Button leftSection="+" onClick={() => setModalOpened(true)}>
          Project Baru
        </Button>
        <Button variant="outline" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? 'Task Aktif' : `Riwayat Selesai (${doneTasks.length})`}
        </Button>
        <Button variant="subtle" size="sm" onClick={logout} style={{ marginLeft: 'auto' }}>
          Logout ({user?.email})
        </Button>
      </Group>

      {/* Project Cards Grid */}
      <ScrollArea>
        <Group gap="md" wrap="nowrap" align="flex-start">
          {projects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))}
        </Group>
      </ScrollArea>

      {/* Riwayat Selesai Panel */}
      {showHistory && doneTasks.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <Text fw={600} mb="sm">Task yang sudah selesai:</Text>
          {doneTasks.map(t => (
            <Text key={t.id} size="sm" c="dimmed" style={{ textDecoration: 'line-through' }}>
              {t.text} — {projects.find(p => p.id === t.projectId)?.name || 'Unknown'}
            </Text>
          ))}
        </div>
      )}

      <NewProjectModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />

      <Text size="xs" c="dimmed" ta="right" mt="md">
        terakhir sync {new Date().toLocaleString('id-ID')}
      </Text>
    </Container>
  );
}
