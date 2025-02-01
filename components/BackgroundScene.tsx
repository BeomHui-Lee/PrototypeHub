'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'lodash-es';

// 파티클 시스템 컴포넌트
const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200; // 파티클 수 감소
  const [positions] = useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8; // y - 높이 제한
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15; // z
    }
    return pos;
  });

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const positions = particlesRef.current.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.01;
        positions[i + 1] += Math.cos(state.clock.elapsedTime * 0.1 + i) * 0.01;
        positions[i + 2] += Math.sin(state.clock.elapsedTime * 0.1 + i) * 0.01;
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
      // 부드러운 움직임
      textRef.current.position.y +=
        Math.sin(state.clock.elapsedTime + position[0]) * 0.001;
      textRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      textRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
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
      // 부드러운 회전
      const targetRotationY = (mousePosition.x * Math.PI) / 6; // 30도 제한
      const targetRotationX = (mousePosition.y * Math.PI) / 6;

      groupRef.current.rotation.y +=
        (targetRotationY - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x +=
        (targetRotationX - groupRef.current.rotation.x) * 0.1;
    }
  });

  // 주요 기술 스택 정의
  const technologies = [
    { name: 'HTML5', color: '#E34F26' },
    { name: 'TypeScript', color: '#3178C6' },
    { name: 'JavaScript', color: '#F7DF1E' },
    { name: 'ReScript', color: '#E6484F' },
    { name: 'Next.js', color: '#000000' },
    { name: 'React', color: '#61DAFB' },
    { name: 'Vue.js', color: '#4FC08D' },
    { name: 'Node.js', color: '#339933' },
    { name: 'Lodash', color: '#3492FF' },
    { name: 'React Query', color: '#FF4154' },
    { name: 'Swiper', color: '#6332F6' },
    { name: 'styled-components', color: '#DB7093' },
    { name: 'i18next', color: '#26A69A' },
    { name: 'CSS3', color: '#1572B6' },
    { name: 'TailwindCSS', color: '#06B6D4' },
    { name: 'Bootstrap', color: '#7952B3' },
    { name: 'Sass', color: '#CC6699' },
    { name: 'ChatGPT', color: '#74AA9C' },
    { name: 'Claude', color: '#A374AA' },
    { name: 'AI Assistant', color: '#AA7474' },
    { name: 'Gemini', color: '#74AAA3' },
    { name: 'RunwayML', color: '#AA7489' },
    { name: 'Sora', color: '#747AAA' },
    { name: 'DALL·E 3', color: '#AA9C74' },
    { name: 'SUNO', color: '#74AA8E' },
  ];
  // 기술 스택을 구형 배치로 배치
  const items = technologies.map((tech, index) => {
    const phi = Math.acos(-1 + (2 * index) / technologies.length);
    const theta = Math.sqrt(technologies.length * Math.PI) * phi;

    // 반경을 줄여서 더 조밀하게 배치
    const radius = 4;
    return (
      <TechStackItem
        key={tech.name}
        text={tech.name}
        position={[
          radius * Math.cos(theta) * Math.sin(phi),
          radius * Math.sin(theta) * Math.sin(phi) * 0.5, // y축 압축
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
  return (
    <div className="absolute inset-0 pointer-events-auto h-[500px]">
      {' '}
      {/* 높이 제한 */}
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default BackgroundScene;
