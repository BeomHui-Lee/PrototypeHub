import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useTransform } from 'framer-motion';
import { Float, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

// 3D 코드 라인 컴포넌트
const CodeLine: React.FC<{
  text: string;
  position: [number, number, number];
  color?: string;
  delay?: number;
}> = ({ text, position, color = '#61dafb', delay = 0 }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useFrame((state) => {
    if (ref.current && visible) {
      ref.current.position.x =
        position[0] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      ref.current.position.z =
        position[2] + Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  if (!visible) return null;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={ref}
        position={position}
        color={color}
        fontSize={0.4}
        maxWidth={10}
        lineHeight={1.2}
        letterSpacing={0.02}
        textAlign="left"
        // font="/fonts/Pretendard-Bold.woff"
        anchorX="left"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#1a1a1a"
      >
        {text}
      </Text>
    </Float>
  );
};

// 3D 커서 컴포넌트
const Cursor: React.FC = () => {
  const ref = useRef<THREE.Mesh>(null);
  const [blinkVisible, setBlinkVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlinkVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.001;
    }
  });

  if (!blinkVisible) return null;

  return (
    <mesh ref={ref} position={[2, 0, 0]}>
      <planeGeometry args={[0.1, 0.8]} />
      <meshBasicMaterial color="#61dafb" />
    </mesh>
  );
};

// 파티클 시스템 컴포넌트
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 500;
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  });

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i];
        const y = positions[i + 1];
        const z = positions[i + 2];

        positions[i] = x + Math.sin(state.clock.elapsedTime * 0.1 + y) * 0.01;
        positions[i + 1] =
          y + Math.cos(state.clock.elapsedTime * 0.1 + x) * 0.01;
        positions[i + 2] =
          z + Math.sin(state.clock.elapsedTime * 0.1 + z) * 0.01;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#61dafb"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// 코드 에디터 장면 컴포넌트
const CodeEditorScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  interface CodeSnippet {
    text: string;
    position: [number, number, number];
    color: string;
  }

  const codeSnippets: CodeSnippet[] = [
    {
      text: "import React from 'react';",
      position: [-5, 2, 0],
      color: '#c678dd',
    },
    {
      text: 'const App: React.FC = () => {',
      position: [-5, 1, 0],
      color: '#61afef',
    },
    {
      text: '  return (',
      position: [-5, 0, 0],
      color: '#abb2bf',
    },
    {
      text: "    <div className='app'>",
      position: [-5, -1, 0],
      color: '#98c379',
    },
    {
      text: '      <h1>Hello, World!</h1>',
      position: [-5, -2, 0],
      color: '#e06c75',
    },
    {
      text: '    </div>',
      position: [-5, -3, 0],
      color: '#98c379',
    },
    {
      text: '  );',
      position: [-5, -4, 0],
      color: '#abb2bf',
    },
    {
      text: '};',
      position: [-5, -5, 0],
      color: '#61afef',
    },
  ];

  return (
    <Canvas>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {codeSnippets.map((snippet, index) => (
        <CodeLine
          key={index}
          text={snippet.text}
          position={snippet.position}
          color={snippet.color}
          delay={index * 200}
        />
      ))}

      <Cursor />
      <ParticleField />

      <spotLight
        position={[-10, 0, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#61dafb"
      />
      <spotLight
        position={[10, 0, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#c678dd"
      />
    </Canvas>
  );
};

export default CodeEditorScene;
