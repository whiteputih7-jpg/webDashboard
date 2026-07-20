import { useState } from 'react';
import { Modal, TextInput, Button, Stack, Text } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../auth/AuthProvider';

export default function NewProjectModal({ opened, onClose, onCreated }) {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, 'projects'), {
        name: name.trim(),
        createdAt: serverTimestamp(),
        createdBy: user.uid
      });
      setName('');
      onClose();
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="PROJECT BARU"
      centered
      size="sm"
    >
      <Stack>
        <Text fw={700} size="sm" c="#000" tt="uppercase" mb={4}>
          NAMA PROJECT
        </Text>
        <TextInput
          placeholder="CONTOH: JC HOUSE"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCreate()}
          data-autofocus
        />
        <Button
          onClick={handleCreate}
          loading={loading}
          fullWidth
          style={{
            background: '#00E5FF',
            color: '#000',
            border: '3px solid #000',
            boxShadow: '3px 3px 0px 0px #000',
            fontWeight: 800,
            height: 48,
          }}
        >
          <IconPlus size={18} stroke={2} style={{ marginRight: 6 }} />
          BUAT PROJECT
        </Button>
      </Stack>
    </Modal>
  );
}
