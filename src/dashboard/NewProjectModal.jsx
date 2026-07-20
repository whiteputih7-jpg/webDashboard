import { useState } from 'react';
import { Modal, TextInput, Button, Stack } from '@mantine/core';
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
      const docRef = await addDoc(collection(db, 'projects'), {
        name: name.trim(),
        createdAt: serverTimestamp(),
        createdBy: user.uid
      });
      setName('');
      onClose();
      if (onCreated) onCreated({ id: docRef.id, name: name.trim() });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Project Baru" centered>
      <Stack>
        <TextInput
          label="Nama Project"
          placeholder="Contoh: JC HOUSE"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCreate()}
          data-autofocus
        />
        <Button onClick={handleCreate} loading={loading}>Buat Project</Button>
      </Stack>
    </Modal>
  );
}
