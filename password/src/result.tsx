import { useState, useEffect } from 'react';
import { Text, Progress, Box, Stack, Container, Title, Paper, Group, Badge, Divider, List, ThemeIcon, Alert } from '@mantine/core';
import { useInfo } from './InfoContext';
import { useNavigate } from 'react-router-dom';
import './ThemeToggle.css';

interface AnalysisResult {
  score: number;
  feedback: {
    warning: string;
    suggestions: string[];
  };
  crackTime: string;
  crackTimeOnline: string;
  guesses: number;
  calcTime: number;
  matchSequence: Array<{
    pattern: string;
    token: string;
    dictionaryName: string;
    rank: string | number;
  }>;
}

export function Result() {
  const { name, birthday, nickname, password } = useInfo();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('result-theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('result-theme', theme);
  }, [theme]);

  useEffect(() => {
    // DEBUG: Log ra để kiểm tra
    console.log('🔍 Result Page - Kiểm tra dữ liệu:');
    console.log('Password:', password ? '✅ Có' : '❌ Không có');
    console.log('Name:', name);
    console.log('Birthday:', birthday);
    console.log('Nickname:', nickname);

    // Kiểm tra có đủ thông tin không
    if (!password || !name || !birthday || !nickname) {
      console.log('❌ Thiếu thông tin, quay về trang chủ');
      alert('Vui lòng nhập đầy đủ thông tin trước khi kiểm tra mật khẩu');
      navigate('/');
      return;
    }

    console.log('✅ Có đủ thông tin, bắt đầu phân tích...');
    checkPasswordStrength();
  }, []); // ← Dependency array rỗng là OK

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const checkPasswordStrength = async () => {
    console.log('📡 Đang gọi API...');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/check-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
          name: name,
          birthday: birthday,
          nickname: nickname,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Nhận được kết quả:', data);
      setResult(data);
    } catch (error) {
      console.error('❌ Lỗi khi gọi API:', error);
      alert('Không thể kết nối đến server. Vui lòng kiểm tra backend đang chạy.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={`result-page ${theme}`}>
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div className="pyramid-loader">
            <div className="wrapper">
              <span className="side side1"></span>
              <span className="side side2"></span>
              <span className="side side3"></span>
              <span className="side side4"></span>
              <span className="shadow"></span>
            </div>
          </div>
          <Text 
            size="xl" 
            fw={700} 
            c="white"
            style={{ 
              letterSpacing: '3px',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}
          >
            ANALYZING PASSWORD...
          </Text>
        </div>
      </div>
    );
  }

  // Kiểm tra có kết quả không
  if (!result) {
    return (
      <div className={`result-page ${theme}`}>
        <Container size="lg" style={{ paddingTop: '100px' }}>
          <Alert color="red" title="Lỗi">
            Không thể lấy kết quả phân tích. Vui lòng thử lại.
          </Alert>
          <Group justify="center" mt="xl">
            <button className="btn" onClick={() => navigate('/tester')}>
              <strong>QUAY LẠI</strong>
            </button>
          </Group>
        </Container>
      </div>
    );
  }

  const score = result?.score ?? 0;
  const feedback = result?.feedback?.warning;
  const suggestions = result?.feedback?.suggestions || [];
  const crackTime = result?.crackTime;
  const crackTimeOnline = result?.crackTimeOnline;
  const guesses = result?.guesses;
  const matchSequence = result?.matchSequence || [];

  const strength = (score / 4) * 100;
  const color = strength > 80 ? 'green' : strength > 50 ? 'yellow' : strength > 20 ? 'orange' : 'red';
  const strengthLabel = strength > 80 ? 'Very strength' : strength > 50 ? 'Medium' : strength > 20 ? 'Weak' : 'Very Weak';
  const commentMeme = strength > 80 ? 'Excellent bro ! Hackers will tired of you' : strength > 50 ? 'Gud! But you can do better' : strength > 20 ? '...You are hacked' : 'Hacker:Thanh you give password to me';

  return (
    <div className={`result-page ${theme}`}>
      {/* Toggle Button */}
      <label className="theme-switch">
        <input 
          type="checkbox" 
          checked={theme === 'dark'} 
          onChange={toggleTheme}
        />
        <span className="slider">
          <span className="icon sun">☀️</span>
          <span className="icon moon">🌙</span>
        </span>
      </label>

      <Container size="lg" className="result-content">
        <Title order={1} ta="center" mb="xl" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>
          🔐 Result of Password Analysis
        </Title>

        <Paper shadow="xl" p="xl" radius="lg" className="result-card">
          <Stack gap="xl">
            {/* Thông tin người dùng */}
            <Box>
              <Title order={3} mb="md">📋 Information </Title>
              <Stack gap="xs">
                <Text size="sm" >Name: {name}</Text>
                <Text size="sm">Birthday:{birthday}</Text>
                <Text size="sm">Nickname: {nickname}</Text>
                <Text size="sm">Password: {"•".repeat(password?.length || 0)} ({password?.length || 0} ký tự)</Text>
              </Stack>
            </Box>

            <Divider />

            {/* Strength Password */}
            <Box>
              <Group justify="space-between" mb="md">
                <Title order={3}>💪Strength Password</Title>
                <Badge color={color} size="xl" variant="filled">
                  {strengthLabel}
                </Badge>
              </Group>
              <Progress value={strength} color={color} size="xl" radius="md" animated />
              <Group justify="space-between" mt="xs">
                <Text size="sm" c="dimmed">Score: {score}/4</Text>
                <Text size="sm" c="dimmed">{strength.toFixed(0)}%</Text>
              </Group>
              <Text size="sm" c="dimmed">{commentMeme}</Text> 
            </Box>

            <Divider />

            {/* Thời gian bẻ khóa */}
            <Box>
              <Title order={3} mb="md">⏱️ Estimated Time Hacker Can Crack</Title>
              <Stack gap="sm">
                <Paper p="md" withBorder className="time-card">
                  <Text size="sm" fw={500} mb="xs">Offline attack (Fast Hashing):</Text>
                  <Text size="lg" c={color} fw={700}>{crackTime}</Text>
                </Paper>
                <Paper p="md" withBorder className="time-card">
                  <Text size="sm" fw={500} mb="xs">Online Attack (No Throttling):</Text>
                  <Text size="lg" c={color} fw={700}>{crackTimeOnline}</Text>
                </Paper>
                <Text size="xs" c="dimmed">Nummber of Attempt: {guesses?.toLocaleString()}</Text>
              </Stack>
            </Box>

            {/* Cảnh báo */}
            {feedback && feedback !== 'Không có cảnh báo' && (
              <>
                <Divider />
                <Alert color="orange" title="⚠️ Warning">
                  {feedback}
                </Alert>
              </>
            )}

            {/* Gợi ý cải thiện */}
            {suggestions.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Title order={3} mb="md">💡 Suggestions for improvement</Title>
                  <List
                    spacing="sm"
                    size="sm"
                    center
                    icon={
                      <ThemeIcon color="blue" size={24} radius="xl">
                        💡
                      </ThemeIcon>
                    }
                  >
                    {suggestions.map((suggestion, index) => (
                      <List.Item key={index}>
                        <Text size="sm">{suggestion}</Text>
                      </List.Item>
                    ))}
                  </List>
                </Box>
              </>
            )}

            {/* Chi tiết phân tích */}
            {matchSequence.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Title order={3} mb="md">🔍Analysis details</Title>
                  <Stack gap="xs">
                    {matchSequence.map((match, index) => (
                      <Paper key={index} p="sm" withBorder className="match-card">
                        <Group justify="space-between">
                          <Box>
                            <Text size="sm" fw={500}>Token: <code>{match.token}</code></Text>
                            <Text size="xs" c="dimmed">Pattern: {match.pattern}</Text>
                          </Box>
                          <Badge variant="light" size="sm">
                            {match.dictionaryName}
                          </Badge>
                        </Group>
                      </Paper>
                    ))}
                  </Stack>
                </Box>
              </>
            )}
          </Stack>
        </Paper>

        {/* Button reback */}
        <Group justify="center" mt="xl">
          <button 
            className="btn"
            onClick={() => navigate('/tester')}
          >
            <strong>Check Again</strong>
            <div id="container-stars">
              <div id="stars"></div>
            </div>
            <div id="glow">
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </button>
        </Group>
      </Container>
    </div>
  );
}