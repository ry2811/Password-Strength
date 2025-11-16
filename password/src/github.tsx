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
        Nếu thấy dự án hữu ích, hãy ⭐ trên GitHub!
      </Text>
      <Group justify="center">
        <Button
          component="a"
          href="https://github.com/TenCuaBan/ctf-game-project"
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