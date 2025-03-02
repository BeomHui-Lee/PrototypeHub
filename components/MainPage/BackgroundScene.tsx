'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'lodash-es';
import { useTheme } from '../Layouts/ThemeProvider';

// 파티클 시스템 컴포넌트
const ParticleField = () => {
  const { theme } = useTheme();
  const particlesRef = useRef<THREE.Points>(null);
  const count = 250; // 적절한 파티클 수로 조정

  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8; // y - 높이 제한
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
    }
    return pos;
  });

  const [colors] = useState(() => {
    const colors = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // 파티클마다 다른 색상 적용 (블루, 퍼플 계열)
      const r = 0.3 + Math.random() * 0.3; // 0.3-0.6
      const g = 0.4 + Math.random() * 0.3; // 0.4-0.7
      const b = 0.6 + Math.random() * 0.4; // 0.6-1.0

      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
    return colors;
  });

  useFrame((state) => {
    if (particlesRef.current) {
      // 전체 파티클 시스템 부드러운 회전
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;

      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        // 각 파티클마다 다른 시간 오프셋으로 부드러운 움직임 생성
        const idx = i / 3;
        const timeOffset = idx * 0.001;

        positions[i] +=
          Math.sin(state.clock.elapsedTime * 0.1 + timeOffset) * 0.01;
        positions[i + 1] +=
          Math.cos(state.clock.elapsedTime * 0.1 + timeOffset) * 0.01;
        positions[i + 2] +=
          Math.sin(state.clock.elapsedTime * 0.1 + timeOffset + Math.PI) * 0.01;
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
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// 기술 스택 아이템
const TechStackItem: React.FC<{
  text: string;
  position: [number, number, number];
  color: string;
}> = ({ text, position, color }) => {
  const textRef = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);

  useFrame((state) => {
    if (textRef.current) {
      // 더 부드러운 움직임
      textRef.current.position.y +=
        Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.002;
      textRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
      textRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2 + position[1]) * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={textRef}
        position={position}
        fontSize={0.4}
        color={color}
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hover ? 1.2 : 1}
      >
        {text}
      </Text>
    </Float>
  );
};

// 메인 장면 컴포넌트
const Scene = () => {
  const { theme } = useTheme();
  const groupRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // 부드러운 회전, 마우스 위치에 반응
      const targetRotationY = (mousePosition.x * Math.PI) / 6; // 30도 제한
      const targetRotationX = (mousePosition.y * Math.PI) / 6;

      groupRef.current.rotation.y +=
        (targetRotationY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x +=
        (targetRotationX - groupRef.current.rotation.x) * 0.05;
    }
  });

  // 주요 기술 스택 정의 - 더 간결하게 정리
  const technologies = [
    { name: 'React', color: '#61DAFB' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'Next.js', color: theme === 'dark' ? '#FFFFFF' : '#000000' },
    { name: 'TailwindCSS', color: '#06B6D4' },
    { name: 'Three.js', color: '#049EF4' },
    { name: 'Framer Motion', color: '#FF4154' },
    { name: 'AI Engineering', color: '#74AA9C' },
    { name: 'GPT', color: '#10A37F' },
    { name: 'Claude', color: '#A374AA' },
    { name: 'RunwayML', color: '#FF4154' },
    { name: 'Javascript', color: '#F9CF00' },
    { name: 'Vite', color: '#88CE02' },
  ];

  // 구형 배치로 기술 스택 배치
  const items = technologies.map((tech, index) => {
    const phi = Math.acos(-1 + (2 * index) / technologies.length);
    const theta = Math.sqrt(technologies.length * Math.PI) * phi;

    // 반경 조정
    const radius = 4.5;
    return (
      <TechStackItem
        key={tech.name}
        text={tech.name}
        position={[
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi) * 0.6, // y축 약간 압축
          radius * Math.cos(phi),
        ]}
        color={tech.color}
      />
    );
  });

  return (
    <group ref={groupRef}>
      <ParticleField />
      {items}
    </group>
  );
};

const BackgroundScene = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 pointer-events-auto h-[550px]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={theme === 'dark' ? 0.3 : 0.5} />
        <pointLight
          position={[10, 10, 10]}
          intensity={theme === 'dark' ? 0.5 : 1}
        />
        <Scene />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
