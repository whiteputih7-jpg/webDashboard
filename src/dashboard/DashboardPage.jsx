import { useState, useEffect } from 'react';
import { Group, Button, Text, ScrollArea, Box } from '@mantine/core';
import { IconPlus, IconHistory, IconFolder, IconChecklist, IconAlertTriangle } from '@tabler/icons-react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
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

  // Stats card data
  const statsCards = [
    { label: 'TOTAL PROJECT', value: projects.length, color: '#00E5FF', icon: IconFolder },
    { label: 'TASK AKTIF', value: activeTasks.length, color: '#FFD600', icon: IconChecklist },
    { label: 'URGENT', value: urgentTasks.length, color: '#FF00FF', icon: IconAlertTriangle },
  ];

  // ---- Riwayat view ----
  if (activeMenu === 'history' && doneTasks.length === 0) {
    return (
      <Box ta="center" py={40} style={{ border: '3px solid #000', background: '#fff' }}>
        <Text fw={700} size="lg" c="#000">BELUM ADA TASK YANG SELESAI.</Text>
      </Box>
    );
  }

  if (showHistory) {
    return (
      <Box>
        <Group mb="md">
          <IconHistory size={22} stroke={2} color="#000" />
          <Text fw={800} size="xl" tt="uppercase" c="#000">RIWAYAT SELESAI ({doneTasks.length})</Text>
        </Group>
        {doneTasks.slice(0, 50).map(t => (
          <Box key={t.id} mb={4} style={{ border: '2px solid #000', padding: '8px 14px', background: '#fff' }}>
            <Text size="sm" fw={600} style={{ textDecoration: 'line-through' }} c="#000">{t.text}</Text>
            <Text size="xs" fw={700} c="#888">{projects.find(p => p.id === t.projectId)?.name || '?'}</Text>
          </Box>
        ))}
      </Box>
    );
  }

  // ---- Dashboard / Projects view ----
  return (
    <Box>
      {/* Stats Cards - horizontal row */}
      <Group gap="md" mb="xl" grow>
        {statsCards.map((item) => {
          const Icon = item.icon;
          return (
            <Box
              key={item.label}
              style={{
                border: '3px solid #000',
                background: '#fff',
                padding: '16px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                minWidth: 0,
              }}
            >
              <Box style={{ minWidth: 0 }}>
                <Text size="xs" c="#888" tt="uppercase" fw={700} mb={2}>
                  {item.label}
                </Text>
                <Text style={{ fontSize: 36, lineHeight: 1, fontWeight: 900 }} c="#000">
                  {item.value}
                </Text>
              </Box>
              <Box
                style={{
                  background: item.color,
                  border: '3px solid #000',
                  width: 44,
                  height: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={22} stroke={2} color="#000" />
              </Box>
            </Box>
          );
        })}
      </Group>

      {/* Toolbar */}
      <Group mb="md" justify="space-between">
        <Group>
          {activeMenu === 'projects' && (
            <Button
              leftSection={<IconPlus size={18} />}
              onClick={() => setModalOpened(true)}
              style={{
                background: '#00E5FF',
                color: '#000',
                border: '3px solid #000',
                fontWeight: 800,
                height: 40,
              }}
            >
              PROJECT BARU
            </Button>
          )}
          <Text fw={700} size="sm" c="#555" tt="uppercase">
            {activeMenu === 'projects'
              ? `${projects.length} PROJECT`
              : `${activeTasks.length} TASK AKTIF`}
          </Text>
        </Group>
      </Group>

      {/* Empty State or Project Cards */}
      {filteredProjects.length === 0 ? (
        <Box ta="center" py={32} style={{ border: '3px solid #000', background: '#fff' }}>
          <Text fw={800} size="lg" c="#000" tt="uppercase" mb="sm">BELUM ADA PROJECT</Text>
          <Text fw={600} c="#666" mb="md" size="sm">Klik "Project Baru" untuk memulai</Text>
          {activeMenu === 'projects' && (
            <Button
              leftSection={<IconPlus size={18} />}
              onClick={() => setModalOpened(true)}
              style={{ background: '#00E5FF', color: '#000', border: '3px solid #000', fontWeight: 800 }}
            >
              BUAT PROJECT PERTAMA
            </Button>
          )}
        </Box>
      ) : (
        <ScrollArea type="auto" scrollbars="x" offsetScrollbars>
          <Group gap="lg" wrap="nowrap" align="flex-start" py={4}>
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
            ))}
          </Group>
        </ScrollArea>
      )}

      <NewProjectModal opened={modalOpened} onClose={() => setModalOpened(false)} />
    </Box>
  );
}
