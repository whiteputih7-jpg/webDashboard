import { useState, useRef } from 'react';
import { Group, TextInput, ActionIcon, FileButton, Box } from '@mantine/core';
import { IconPlus, IconPhoto } from '@tabler/icons-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../auth/AuthProvider';

const CLOUD_NAME = 's5izhmy9';
const UPLOAD_PRESET = 'webdashboard';

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
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);

      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (data.secure_url) {
        await handleSubmit(data.secure_url);
      } else {
        console.error('Cloudinary error:', data);
      }
    } catch (err) {
      console.error(err);
    }
    setUploading(false);
    if (resetRef.current) resetRef.current();
  };

  return (
    <Group gap={4} p="xs" wrap="nowrap">
      <TextInput
        placeholder="TASK BARU..."
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{ flex: 1 }}
        size="xs"
        disabled={uploading}
        styles={{
          input: {
            border: '2px solid #000',
            fontSize: 12,
            fontWeight: 600,
            height: 32,
            '&:focus': {
              outline: '3px solid #00E5FF',
              outlineOffset: 0,
            },
          },
        }}
      />
      <FileButton onChange={handleFileUpload} accept="image/*" resetRef={resetRef}>
        {(props) => (
          <ActionIcon
            {...props}
            size="sm"
            variant="subtle"
            loading={uploading}
            style={{
              border: '2px solid #000',
              borderRadius: 0,
              minWidth: 32,
              height: 32,
              background: '#FFD600',
            }}
          >
            <IconPhoto size={16} stroke={2} color="#000" />
          </ActionIcon>
        )}
      </FileButton>
      <ActionIcon
        size="sm"
        onClick={() => handleSubmit()}
        loading={uploading}
        style={{
          border: '2px solid #000',
          borderRadius: 0,
          minWidth: 32,
          height: 32,
          background: '#00E5FF',
        }}
      >
        <IconPlus size={16} stroke={2} color="#000" />
      </ActionIcon>
    </Group>
  );
}
