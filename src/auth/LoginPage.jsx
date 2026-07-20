import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Title, TextInput, PasswordInput, Button, Stack, Divider, Alert, Group } from '@mantine/core';
import { useAuth } from './AuthProvider';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const { login, register, loginGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await register(email, password);
      } else {
        await login(email, password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container size={420} my={80}>
      <Title ta="center" mb="lg">webDashboard</Title>
      <Paper withBorder shadow="md" p={30} radius="md">
        <Title order={3} ta="center" mb="md">
          {isRegister ? 'Buat Akun' : 'Masuk'}
        </Title>

        {error && <Alert color="red" mb="sm">{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput label="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <PasswordInput label="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <Button type="submit" fullWidth>{isRegister ? 'Daftar' : 'Masuk'}</Button>
          </Stack>
        </form>

        <Divider label="atau" labelPosition="center" my="md" />

        <Button variant="outline" fullWidth onClick={handleGoogle}>
          Masuk dengan Google
        </Button>

        <Group justify="center" mt="md">
          <Button variant="subtle" size="sm" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
            {isRegister ? 'Sudah punya akun? Masuk' : 'Belum punya akun? Daftar'}
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
