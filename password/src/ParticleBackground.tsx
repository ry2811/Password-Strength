import { useState, useEffect } from 'react'; // Thêm useEffect
import { Box } from '@mantine/core';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
const particleOptions: ISourceOptions = {

  autoPlay: true,
  background: {
    //Copy option in tsparticles
    color: {
      value: "#000000"
    }
  },
  fullScreen: {
    enable: true,
    zIndex: 0
  },
  detectRetina: true,
  fpsLimit: 120,
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: {
        enable: true,
        mode: "push"
      },
      onHover: {
        enable: true,
        mode: "repulse"
      },
      resize: {
        delay: 0.5,
        enable: true
      }
    },
    modes: {
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: "#ff0000",
      animation: {
        h: {
          enable: true,
          speed: 20,
          sync: true
        }
      }
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.4,
      width: 1
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "out"
      },
      random: false,
      speed: 6,
      straight: false
    },
    number: {
      density: {
        enable: true
      },
      value: 80
    },
    opacity: {
      value: 0.5
    },
    shape: {
      type: "circle"
    },
    size: {
      value: { min: 1, max: 3 }
    }
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true
};
//SET UP LOGIC ABOUT PARTICLE BACKGROUND
export function ParticleBackground({ children }: { children: React.ReactNode }) {
  const [init, setInit] = useState(false);

  // use useEffect(react)
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  if (!init) {
    return null; 
  }

  return (
    <Box style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={particleOptions}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />
      
      <Box style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </Box>
    </Box>
  );
}