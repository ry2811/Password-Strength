import { Stack, Title, TextInput, Button, Flex, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useInfo } from './InfoContext';
import { useState, useEffect } from 'react';

export function PersonalInfoPage() {
  const navigate = useNavigate();
  const { name, setName, birthday, setBirthday, nickname, setNickName } = useInfo();
  
  const [errors, setErrors] = useState({
    name: '',
    birthday: '',
    nickname: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('hasSeenInfoPopup');
    if (!hasSeenPopup) {
      setShowPopup(true);
      localStorage.setItem('hasSeenInfoPopup', 'true');
    }
  }, []);

  const handleNext = () => {
    const newErrors = {
      name: '',
      birthday: '',
      nickname: ''
    };
    
    let hasError = false;
    
    if (name.trim() === '') {
      newErrors.name = 'Please provide your name';
      hasError = true;
    }
    
    if (birthday.trim() === '') {
      newErrors.birthday = 'Birthday ???';
      hasError = true;
    }
    
    if (nickname.trim() === '') {
      newErrors.nickname = 'What is your nickname??';
      hasError = true;
    }
    
    setErrors(newErrors);
    
    if (hasError) {
      return;
    }
    
    navigate('/tester');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (errors.name) {
      setErrors({...errors, name: ''});
    }
  };

  const handleBirthdayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthday(e.target.value);
    if (errors.birthday) {
      setErrors({...errors, birthday: ''});
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
    if (errors.nickname) {
      setErrors({...errors, nickname: ''});
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {/* Custom Popup */}
      {showPopup && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 99999,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={closePopup}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative',
              animation: 'slideUp 0.3s ease',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '28px',
                cursor: 'pointer',
                color: '#666',
                width: '35px',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#f0f0f0';
                e.currentTarget.style.color = '#000';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#666';
              }}
            >
              ✕
            </button>

            {/* Header */}
            <div style={{
              padding: '30px 30px 20px 30px',
              borderBottom: '1px solid #e0e0e0'
            }}>
              <Text size="24px" fw={700} c="black">
                🔒 Why do we need your personal information?
              </Text>
            </div>

            {/* Body */}
            <div style={{ padding: '30px' }}>
              <Text size="sm" c="black" mb="md">
                We request your personal information to:
              </Text>

              {/* Item 1 */}
              <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '20px',
                alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>✅</span>
                <div>
                  <Text fw={500} c="black" size="sm">
                    Check if your password contains personal information
                  </Text>
                  <Text size="xs" c="dimmed">
                    Many people use their name or birthday in passwords - this is very easy to hack
                  </Text>
                </div>
              </div>

              {/* Item 2 */}
              <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '20px',
                alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>✅</span>
                <div>
                  <Text fw={500} c="black" size="sm">
                    Detect weak password patterns
                  </Text>
                  <Text size="xs" c="dimmed">
                    For example: "NguyenKhoi2007" or "KhoiLoveManCity" are very predictable
                  </Text>
                </div>
              </div>

              {/* Item 3 */}
              <div style={{
                display: 'flex',
                gap: '15px',
                marginBottom: '20px',
                alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: '22px', flexShrink: 0 }}>✅</span>
                <div>
                  <Text fw={500} c="black" size="sm">
                    Provide personalized improvement suggestions
                  </Text>
                  <Text size="xs" c="dimmed">
                    Help you create stronger and more secure passwords
                  </Text>
                </div>
              </div>

              {/* Warning Box */}
              <div style={{
                backgroundColor: 'rgba(255, 165, 0, 0.1)',
                borderLeft: '4px solid orange',
                padding: '15px',
                borderRadius: '8px',
                marginTop: '20px'
              }}>
                <Text size="sm" c="orange" fw={500}>
                  ⚠️ Note: Your information is only used for password analysis and is not stored.
                </Text>
              </div>

              {/* Button */}
              <Button 
                onClick={closePopup}
                fullWidth
                size="md"
                style={{ marginTop: '20px' }}
              >
                I Understand
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <Flex 
        style={{ height: '100vh', width: '100vw' }}
        justify="center"
        align="center"
        direction="column"
        gap="md"
      >
        <Stack p="md" style={{ backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 8, minWidth: 400 }}>
          <Title order={2} c="white">
            Please provide information
          </Title>

          {/* Button open popup */}
          <Button 
            variant="subtle" 
            size="xs" 
            c="cyan"
            onClick={() => setShowPopup(true)}
            style={{ alignSelf: 'flex-end' }}
          >
            ❓ Why do we need this info?
          </Button>
          
          <div>
            <TextInput
              label="What's your name" 
              c="white"
              value={name}
              onChange={handleNameChange}
              placeholder='Example: Nguyen Dang Khoi'
              error={errors.name}
              styles={{
                input: {
                  borderColor: errors.name ? '#fa5252' : undefined,
                  borderWidth: errors.name ? '2px' : undefined,
                }
              }}
            />
          </div>

          <div>
            <TextInput
              label="Birthday" 
              c="white"
              value={birthday}
              onChange={handleBirthdayChange}
              placeholder='Format: DD/MM/YYYY'
              error={errors.birthday}
              styles={{
                input: {
                  borderColor: errors.birthday ? '#fa5252' : undefined,
                  borderWidth: errors.birthday ? '2px' : undefined,
                }
              }}
            />
          </div>

          <div>
            <TextInput
              label="Nickname" 
              c="white"
              placeholder='Example: Ry'
              value={nickname}
              onChange={handleNicknameChange}
              error={errors.nickname}
              styles={{
                input: {
                  borderColor: errors.nickname ? '#fa5252' : undefined,
                  borderWidth: errors.nickname ? '2px' : undefined,
                }
              }}
            />
          </div>

          <Button onClick={handleNext}>
            Continue
          </Button>
        </Stack>
      </Flex>
    </>
  );
}