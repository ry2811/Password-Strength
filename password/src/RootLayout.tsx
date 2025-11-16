// src/RootLayout.tsx
import { Outlet } from 'react-router-dom';
import { ParticleBackground } from './ParticleBackground';
import { InfoProvider } from './InfoContext';

export function RootLayout() {
  return (
    <ParticleBackground>

      <InfoProvider>
        <Outlet />
      </InfoProvider>
    </ParticleBackground>
  );
}