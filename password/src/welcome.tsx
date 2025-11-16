// src/pages/Welcome.tsx
import { Center, Title, Button,Flex } from '@mantine/core';
import { useNavigate } from 'react-router-dom'; //Import hook navigate
import './index.css';
import 'animate.css';

export function WelcomePage() {
  const navigate = useNavigate(); // Innitinal hook

  // Function no navigate
  const handleStart = () => {
    navigate('/info'); //navigate to /info
  };

  return (
   <Flex
  
  style={{ height: '100vh', width: '100vw' }}
      justify="center"
      align="center"
      direction="column"
      gap="md"
      className="matrix-background"
>
  
  <Title order={1} c="white" mb="md" className="dotted matrix-text animate__flash">
    Welcome to Password Tester
  </Title>
   
  <Button size="lg" onClick={handleStart} className="glitch">
    Get Started
  </Button>

  
</Flex>

  );
}