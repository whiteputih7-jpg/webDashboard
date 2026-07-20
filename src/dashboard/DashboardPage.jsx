import { useState, useEffect } from 'react';
import { Group, Button, Text, ScrollArea, Container } from '@mantine/core';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import StatsHeader from './StatsHeader';
import ProjectCard from './ProjectCard';
import NewProjectModal from './NewProjectModal';

export default function DashboardPage({ activeMenu }) {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [modalOpened, setModalOpened] = useState(false);

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
    const taskSnap = await getDocs(query(collection(db, 'tasks'), where('projectId', '==', projectId)));
    const deletions = taskSnap.docs.map(d => deleteDoc(doc(db, 'tasks', d.id)));
    await Promise.all(deletions);
    await deleteDoc(doc(db, 'projects', projectId));
  };

  const activeTasks = tasks.filter(t => !t.done);
  const urgentTasks = activeTasks.filter(t => t.urgent);
  const doneTasks = tasks.filter(t => t.done);

  // Filter berdasarkan menu aktif
  const showHistory = activeMenu === 'history';
  const filteredProjects = activeMenu === 'projects' ? projects : projects;

  if (activeMenu === 'history' && doneTasks.length === 0) {
    return (
      <Container>
        <Text ta="center" c="dimmed" py="xl">Belum ada task yang selesai.</Text>
      </Container>
    );
  }

  return (
    <div>
      {/* Stats */}
      {!showHistory && (
        <StatsHeader
          projectCount={projects.length}
          activeTaskCount={activeTasks.length}
          urgentCount={urgentTasks.length}
        />
      )}

      {/* Toolbar */}
      <Group mb="md">
        <Button leftSection="+" color="blue" onClick={() => setModalOpened(true)}>
          Project Baru
        </Button>
        <Text size="sm" c="dimmed">
          {showHistory
            ? `Task Selesai (${doneTasks.length})`
            : `${activeTasks.length} task aktif`}
        </Text>
        <Text size="xs" c="dimmed" style={{ marginLeft: 'auto' }}>
          sync {new Date().toLocaleTimeString('id-ID')}
        </Text>
      </Group>

      {/* Content */}
      {showHistory ? (
        <div>
          <Text fw={600} mb="sm" size="lg">Riwayat Selesai</Text>
          {doneTasks.slice(0, 50).map(t => (
            <Text key={t.id} size="sm" c="dimmed" style={{ textDecoration: 'line-through' }} mb={4}>
              {t.text} — <Text span c="gray">{projects.find(p => p.id === t.projectId)?.name || '?'}</Text>
            </Text>
          ))}
        </div>
      ) : (
        <ScrollArea>
          <Group gap="md" wrap="nowrap" align="flex-start">
            {filteredProjects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={handleDeleteProject}
              />
            ))}
          </Group>
        </ScrollArea>
      )}

      <NewProjectModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
      />
    </div>
  );
}
