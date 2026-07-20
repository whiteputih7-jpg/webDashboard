import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Title, TextInput, PasswordInput, Button, Stack, Divider, Alert, Group, Text } from '@mantine/core';
import { IconMail, IconLock } from '@tabler/icons-react';
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
      <Title
        ta="center"
        mb="lg"
        style={{
          fontSize: 48,
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: 2,
          borderBottom: '4px solid #000',
          paddingBottom: 12,
          display: 'inline-block',
          width: '100%',
        }}
      >
        webDashboard
      </Title>
      <Paper
        p={30}
        style={{
          border: '3px solid #000',
          borderRadius: 0,
          background: '#fff',
          boxShadow: '7px 7px 0px 0px #000',
        }}
      >
        <Title
          order={3}
          ta="center"
          mb="md"
          style={{ fontWeight: 800, textTransform: 'uppercase' }}
        >
          {isRegister ? 'BUAT AKUN' : 'MASUK'}
        </Title>

        {error && (
          <Alert
            color="red"
            mb="sm"
            style={{
              border: '2px solid #000',
              borderRadius: 0,
              background: '#FF00FF',
              color: '#000',
              fontWeight: 700,
            }}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="EMAIL"
              placeholder="EMAIL"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              leftSection={<IconMail size={16} stroke={2} />}
            />
            <PasswordInput
              label="PASSWORD"
              placeholder="PASSWORD"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              leftSection={<IconLock size={16} stroke={2} />}
            />
            <Button
              type="submit"
              fullWidth
              style={{
                background: '#00E5FF',
                color: '#000',
                border: '3px solid #000',
                boxShadow: '3px 3px 0px 0px #000',
                fontWeight: 800,
                height: 48,
                fontSize: 16,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              {isRegister ? 'DAFTAR' : 'MASUK'}
            </Button>
          </Stack>
        </form>

        <Divider
          label="ATAU"
          labelPosition="center"
          my="md"
          style={{ borderTop: '2px solid #000' }}
          styles={{ label: { fontWeight: 700, color: '#000' } }}
        />

        <Button
          variant="outline"
          fullWidth
          onClick={handleGoogle}
          style={{
            border: '3px solid #000',
            borderRadius: 0,
            fontWeight: 700,
            height: 44,
            color: '#000',
            background: '#fff',
          }}
        >
          MASUK DENGAN GOOGLE
        </Button>

        <Group justify="center" mt="md">
          <Button
            variant="subtle"
            size="sm"
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            style={{ fontWeight: 700, color: '#000', textDecoration: 'underline' }}
          >
            {isRegister ? 'SUDAH PUNYA AKUN? MASUK' : 'BELUM PUNYA AKUN? DAFTAR'}
          </Button>
        </Group>
      </Paper>
    </Container>
  );
}
