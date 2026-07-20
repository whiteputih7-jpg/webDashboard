import { useState, useEffect } from 'react';
import { Group, Button, Text, ScrollArea, Box } from '@mantine/core';
import { IconPlus, IconHistory } from '@tabler/icons-react';
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

  const showHistory = activeMenu === 'history';
  const filteredProjects = projects;

  if (activeMenu === 'history' && doneTasks.length === 0) {
    return (
      <Box py="xl">
        <Text ta="center" fw={700} size="lg" c="#000" py="xl">
          BELUM ADA TASK YANG SELESAI.
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      {/* Stats muncul di Dashboard dan Project */}
      {!showHistory && (
        <StatsHeader
          projectCount={projects.length}
          activeTaskCount={activeTasks.length}
          urgentCount={urgentTasks.length}
        />
      )}

      {/* Toolbar */}
      <Group mb="lg" justify="space-between" align="center">
        <Group>
          {activeMenu === 'projects' && (
            <Button
              leftSection={<IconPlus size={18} />}
              color="brutalTeal"
              onClick={() => setModalOpened(true)}
              style={{
                background: '#00E5FF',
                color: '#000',
                border: '3px solid #000',
                boxShadow: '3px 3px 0px 0px #000',
              }}
            >
              PROJECT BARU
            </Button>
          )}
          {!showHistory && (
            <Text fw={700} size="sm" c="#000" tt="uppercase">
              {activeMenu === 'projects'
                ? `${projects.length} PROJECT`
                : `${activeTasks.length} TASK AKTIF`}
            </Text>
          )}
        </Group>
        {showHistory && (
          <Group gap={6}>
            <IconHistory size={18} stroke={2} color="#000" />
            <Text fw={700} size="sm" c="#000" tt="uppercase">
              TASK SELESAI ({doneTasks.length})
            </Text>
          </Group>
        )}
      </Group>

      {/* Content */}
      {showHistory ? (
        <Box>
          <Text fw={800} mb="md" size="xl" tt="uppercase" style={{ borderBottom: '3px solid #000', paddingBottom: 8 }}>
            RIWAYAT SELESAI
          </Text>
          {doneTasks.slice(0, 50).map(t => (
            <Box
              key={t.id}
              mb={6}
              style={{
                border: '2px solid #000',
                padding: '8px 12px',
                background: '#fff',
              }}
            >
              <Text size="sm" fw={600} style={{ textDecoration: 'line-through' }} c="#000">
                {t.text}
              </Text>
              <Text size="xs" fw={700} c="#666">
                {projects.find(p => p.id === t.projectId)?.name || '?'}
              </Text>
            </Box>
          ))}
        </Box>
      ) : filteredProjects.length === 0 ? (
        <Box
          ta="center"
          py="xl"
          style={{
            border: '3px solid #000',
            background: '#fff',
            padding: 60,
            boxShadow: '5px 5px 0px 0px #000',
          }}
        >
          <Text fw={900} size="32" c="#000" tt="uppercase" mb="sm">NO ITEMS YET</Text>
          <Text fw={600} c="#000" mb="lg">Belum ada project. Buat project pertama kamu!</Text>
          {activeMenu === 'projects' && (
            <Button
              leftSection={<IconPlus size={18} />}
              onClick={() => setModalOpened(true)}
              style={{
                background: '#00E5FF',
                color: '#000',
                border: '3px solid #000',
                boxShadow: '3px 3px 0px 0px #000',
                fontWeight: 800,
              }}
            >
              CREATE YOUR FIRST PROJECT
            </Button>
          )}
        </Box>
      ) : (
        <ScrollArea type="auto" scrollbars="x" style={{ paddingBottom: 8 }}>
          <Group gap="lg" wrap="nowrap" align="flex-start">
            {(activeMenu === 'projects' ? projects : projects).map(project => (
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
    </Box>
  );
}
