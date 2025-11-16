import { Box, Text, Button, Group } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

export default function GithubCallToAction() {
  return (
    <Box
      p="md"
      mt="xl"
      style={{
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        textAlign: 'center',
      }}
    >
      <Text size="lg" fw={500} c="gray.0" mb="xs">
        If you see helpful, please give ⭐ on GitHub!
        or give feedback
        
      </Text>
      <Text fw={700} >Contact me : </Text>
      <Text>Email : ndangkhoi2811@gmail.com</Text>
      <Group justify="center">
        <Button
          component="a"
          href="https://github.com/ry2811/Password-Strength/"
          target="_blank"
          leftSection={<IconBrandGithub size={18} />}
          variant="light"
          color="gray"
        >
          Star Project
        </Button>
      </Group>
    </Box>
  );
}