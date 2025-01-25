'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, Object3DProps } from '@react-three/fiber';
import { Float, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

interface TechStack {
  name: string;
  color: string;
}

interface TechStacks {
  language: TechStack[];
  framework: TechStack[];
  style: TechStack[];
  ai: TechStack[];
}

interface TechStackItemProps {
  text: string;
  color: string;
  position: [number, number, number];
}

// 기술 스택 데이터
const techStacks: TechStacks = {
  language: [
    { name: 'HTML5', color: '#E34F26' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'JavaScript', color: '#F7DF1E' },
    { name: 'ReScript', color: '#E6484F' },
  ],
  framework: [
    { name: 'Next.js', color: '#000000' },
    { name: 'React', color: '#61DAFB' },
    { name: 'Vue.js', color: '#4FC08D' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Lodash', color: '#3492FF' },
    { name: 'React Query', color: '#FF4154' },
    { name: 'Swiper', color: '#6332F6' },
    { name: 'styled-components', color: '#DB7093' },
    { name: 'i18next', color: '#26A69A' },
  ],
  style: [
    { name: 'CSS3', color: '#1572B6' },
    { name: 'TailwindCSS', color: '#06B6D4' },
    { name: 'Bootstrap', color: '#7952B3' },
    { name: 'Sass', color: '#CC6699' },
  ],
  ai: [
    { name: 'ChatGPT', color: '#74AA9C' },
    { name: 'Claude', color: '#A374AA' },
    { name: 'AI Assistant', color: '#AA7474' },
    { name: 'Gemini', color: '#74AAA3' },
    { name: 'RunwayML', color: '#AA7489' },
    { name: 'Sora', color: '#747AAA' },
    { name: 'DALL·E 3', color: '#AA9C74' },
    { name: 'SUNO', color: '#74AA8E' },
  ],
};

const lerp = (a: number, b: number, t: number): number => {
  return a + (b - a) * t;
};

// 개별 기술 스택 아이템 컴포넌트
const TechStackItem: React.FC<TechStackItemProps> = ({
  text,
  color,
  position,
}) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Text
        ref={ref}
        position={position}
        fontSize={0.5}
        color={color}
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.2 : 1}
      >
        {text}
      </Text>
    </Float>
  );
};

// 메인 장면 컴포넌트
const Scene = () => {
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
      const oscillation =
        (Math.sin(state.clock.elapsedTime * 0.5) * Math.PI) / 2;
      groupRef.current.rotation.y = oscillation;

      const maxRotation = Math.PI / 4;
      groupRef.current.rotation.x = lerp(
        groupRef.current.rotation.x,
        mousePosition.y * maxRotation,
        0.1,
      );
      groupRef.current.rotation.z = lerp(
        groupRef.current.rotation.z,
        -mousePosition.x * maxRotation,
        0.1,
      );
    }
  });

  const items: JSX.Element[] = [];
  let index = 0;

  Object.entries(techStacks).forEach(([, techs]) => {
    techs.forEach((tech: { name: string; color: string }) => {
      const phi = Math.acos(
        -1 + (2 * index) / (Object.keys(techStacks).length * 10),
      );
      const theta =
        Math.sqrt(Object.keys(techStacks).length * 10 * Math.PI) * phi;

      const x = 8 * Math.cos(theta) * Math.sin(phi);
      const y = 8 * Math.sin(theta) * Math.sin(phi);
      const z = 8 * Math.cos(phi);

      items.push(
        <TechStackItem
          key={tech.name}
          text={tech.name}
          color={tech.color}
          position={[x, y, z]}
        />,
      );

      index++;
    });
  });

  return <group ref={groupRef}>{items}</group>;
};

const BackgroundScene = () => {
  return (
    <div className="absolute inset-0 pointer-events-auto">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
