// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import App from './App.tsx'; // Phải import App từ ./App.tsx
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="auto">
      <App /> {/* Đảm bảo nó đang render <App /> */}
    </MantineProvider>
  </React.StrictMode>,
);