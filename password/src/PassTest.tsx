import { useState } from 'react';
import { Flex, TextInput, Text } from '@mantine/core';
import { useInfo } from './InfoContext';
import { useNavigate } from 'react-router';

export function PasswordTester() {
  const { name, setName, birthday, setBirthday, nickname, setNickName,password,setPassword } = useInfo();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheck = async () => {
    setIsLoading(true);
    
    //Time loaded
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsLoading(false);
    // Logic force type password
    if(password.trim() === ''){
    alert('Vui lặp nhập mật khẻu');
    return ; 
  }
  navigate('/result');
  };
  
  

  return (
    <>
      {/* Fullscreen Pyramid Loader */}
      {isLoading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          zIndex: 9999,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ textAlign: 'center' }}>
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
              mt="xl"
              style={{ 
                letterSpacing: '3px',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}
            >
              ANALYZING PASSWORD...
            </Text>
            <Text size="md" fw={500} c="white"> Your password is being crack</Text>
          </div>
        </div>
      )}

      {/* Main Content */}
      <Flex
        style={{ height: '100vh', width: '100vw' }}
        justify="center"
        align="center"
        direction="column"
        gap="md"
      >
        <Text
          size="40px"
          fw={900}
          variant="gradient"
          gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
        >
          Password Strength Tester
        </Text>

        <TextInput
          placeholder="Full Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
          style={{ width: '300px' }}
        />

        <TextInput
          placeholder="Birthday (VD: 10/12/2005)"
          value={birthday}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBirthday(e.target.value)}
          style={{ width: '300px' }}
        />

        <TextInput
          placeholder="NickName"
          value={nickname}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickName(e.target.value)}
          style={{ width: '300px' }}
        />

        <TextInput
          type="password"
          placeholder="Type your password..."
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
          style={{ width: '300px' }}
        />

        {/* Button với animation */}
        <button 
          className="btn" 
          onClick={handleCheck}
          disabled={isLoading}
        >
          <strong>{isLoading ? 'CHECKING...' : 'CHECK'}</strong>
          <div id="container-stars">
            <div id="stars"></div>
          </div>
          <div id="glow">
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </button>
      </Flex>
    </>
  );
}