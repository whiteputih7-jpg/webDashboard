import { useState, useRef } from 'react';
import { Group, TextInput, ActionIcon, FileButton } from '@mantine/core';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../firebase';
import { useAuth } from '../auth/AuthProvider';

export default function AddTaskForm({ projectId, onAdded }) {
  const [text, setText] = useState('');
  const [uploading, setUploading] = useState(false);
  const resetRef = useRef(null);
  const { user } = useAuth();

  const handleSubmit = async (imageUrl) => {
    if (!text.trim() && !imageUrl) return;

    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        projectId,
        text: text.trim() || '(gambar)',
        done: false,
        urgent: false,
        imageUrl: imageUrl || null,
        createdAt: serverTimestamp(),
        createdBy: user.uid
      });
      setText('');
      if (onAdded) onAdded(docRef.id);
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !uploading) {
      handleSubmit();
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `tasks/${projectId}/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      await handleSubmit(url);
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
    if (resetRef.current) resetRef.current();
  };

  return (
    <Group gap={4} mt="xs">
      <TextInput
        placeholder="Task baru... (Enter untuk simpan)"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ flex: 1 }}
        size="xs"
        disabled={uploading}
      />
      <FileButton onChange={handleFileUpload} accept="image/*" resetRef={resetRef}>
        {(props) => (
          <ActionIcon {...props} size="sm" variant="subtle" loading={uploading}>
            📎
          </ActionIcon>
        )}
      </FileButton>
      <ActionIcon size="sm" color="blue" onClick={() => handleSubmit()} loading={uploading}>
        +
      </ActionIcon>
    </Group>
  );
}
