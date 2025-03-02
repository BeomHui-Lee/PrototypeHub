'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';
import {
  Bot,
  BrainCircuit,
  Code2,
  Command,
  Cpu,
  GitBranch,
  Globe,
  Sparkles,
} from 'lucide-react';
import { ParticleSystem } from '@/components/MainPage/ParticleSystem';
import { FloatingText } from '@/components/MainPage/FloatingText';
import CodeEditorScene from '@/components/CodeEditorScene';

// AI DNA 더블 헬릭스 컴포넌트
const AIDNAHelix = () => {
  const dnaRef = useRef<THREE.Group>(null);
  const [points, setPoints] = useState<THREE.Vector3[]>([]);

  useEffect(() => {
    // DNA 구조 생성
    const newPoints = [];
    for (let i = 0; i < 50; i++) {
      const t = i * 0.3;
      // 두 개의 나선 구조 생성
      const radius = 2;
      const x1 = Math.sin(t) * radius;
      const y1 = t - 10; // 중앙에 위치하도록 조정
      const z1 = Math.cos(t) * radius;

      const x2 = Math.sin(t + Math.PI) * radius;
      const y2 = t - 10;
      const z2 = Math.cos(t + Math.PI) * radius;

      newPoints.push(
        new THREE.Vector3(x1, y1, z1),
        new THREE.Vector3(x2, y2, z2),
      );
    }
    setPoints(newPoints);
  }, []);

  useFrame((state) => {
    if (dnaRef.current) {
      // DNA 구조 회전
      dnaRef.current.rotation.y += 0.002;
      // 마우스 위치에 따른 기울기 효과
      const mouseX = (state.mouse.x * Math.PI) / 8;
      const mouseY = (state.mouse.y * Math.PI) / 8;
      dnaRef.current.rotation.x = mouseY;
      dnaRef.current.rotation.z = mouseX;
    }
  });

  return (
    <group ref={dnaRef}>
      {points.map((point, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={point}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#61dafb' : '#74aa9c'}
              emissive={i % 2 === 0 ? '#61dafb' : '#74aa9c'}
              emissiveIntensity={0.5}
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}
      {/* 나선을 연결하는 선 */}
      {points.map((point, i) => {
        if (i % 2 === 0 && i < points.length - 2) {
          return (
            <line key={`line-${i}`}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  count={2}
                  array={
                    new Float32Array([
                      point.x,
                      point.y,
                      point.z,
                      points[i + 1].x,
                      points[i + 1].y,
                      points[i + 1].z,
                    ])
                  }
                  itemSize={3}
                />
              </bufferGeometry>
              <lineBasicMaterial color="#61dafb" opacity={0.5} transparent />
            </line>
          );
        }
        return null;
      })}
    </group>
  );
};

// 3D 장면 컴포넌트
const Scene = () => {
  const keywords = [
    { text: 'React', position: [-8, 4, -5] },
    { text: 'TypeScript', position: [8, -4, -5] },
    { text: 'Next.js', position: [-6, -6, -8] },
    { text: 'AI', position: [6, 6, -8] },
    { text: 'Three.js', position: [-4, 8, -6] },
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 50 }}
      style={{ background: '#f8fafc' }}
    >
      <color attach="background" args={['#f8fafc']} />
      <ambientLight intensity={0.8} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* DNA 구조 */}
      <AIDNAHelix />

      {/* 배경 파티클 */}
      <ParticleSystem count={1500} size={0.05} speed={0.5} />

      {/* 3D 텍스트 - 기본 폰트 사용 */}
      {keywords.map((keyword, index) => (
        <Text
          key={index}
          position={keyword.position as [number, number, number]}
          color={index % 2 === 0 ? '#61dafb' : '#74aa9c'}
          fontSize={1.2}
          anchorX="center"
          anchorY="middle"
        >
          {keyword.text}
        </Text>
      ))}
    </Canvas>
  );

  {
    /* DNA 구조 */
  }
  <AIDNAHelix />;

  {
    /* 배경 파티클 */
  }
  <ParticleSystem count={1500} size={0.05} speed={0.5} />;

  {
    /* 3D 키워드 */
  }
  {
    keywords.map((keyword, index) => (
      <FloatingText
        key={index}
        text={keyword.text}
        position={keyword.position as [number, number, number]}
        color={index % 2 === 0 ? '#61dafb' : '#74aa9c'}
        size={1.2}
      />
    ));
  }
};

// 기술 스택 카드 컴포넌트
const TechCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}> = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300
        transform hover:-translate-y-2"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-50 rounded-lg text-blue-600">{icon}</div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

// AI 섹션의 프롬프트 타이핑 효과 컴포넌트
const TypingPrompt: React.FC<{ text: string }> = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length - 1) {
        setDisplayText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [text]);

  return (
    <div className="font-mono bg-gray-900 text-green-400 p-4 rounded-lg">
      <span className="opacity-50">$ </span>
      {displayText}
      <span className="animate-pulse">|</span>
    </div>
  );
};

// 메인 About 페이지 컴포넌트
const AboutPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  // 스크롤 기반 패럴랙스 효과
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  const aiPrompts = [
    'Analyzing frontend optimization patterns...',
    'Generating creative UI components...',
    'Optimizing user experience through AI...',
  ];

  return (
    <div ref={containerRef} className="min-h-screen pt-24 relative">
      {/* Hero Section with 3D Code Editor */}
      <div className="relative h-[calc(100vh-6rem)] overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="w-full h-full">
            <CodeEditorScene />
          </div>
        </motion.div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 pt-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold text-gray-800 mb-6"
          >
            AI × Frontend Developer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            프론트엔드 개발과 AI 엔지니어링의 결합으로 더 나은 웹 경험을
            만듭니다
          </motion.p>
        </div>
      </div>

      {/* AI Engineering Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              AI Engineering
            </h2>
            <p className="text-gray-600">
              최신 AI 기술을 활용한 개발 워크플로우 최적화
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechCard
              icon={<Bot size={24} />}
              title="AI Tools Integration"
              description="GPT, Claude 등 AI 도구를 활용한 개발 생산성 향상"
              delay={0.1}
            />
            <TechCard
              icon={<BrainCircuit size={24} />}
              title="Prompt Engineering"
              description="효율적인 프롬프트 설계로 AI 활용 최적화"
              delay={0.2}
            />
            <TechCard
              icon={<Sparkles size={24} />}
              title="AI-Powered Development"
              description="AI 기반 코드 리뷰 및 최적화 자동화"
              delay={0.3}
            />
          </div>

          {/* 프롬프트 타이핑 효과 */}
          <div className="mt-12 space-y-4">
            {aiPrompts.map((prompt, index) => (
              <TypingPrompt key={index} text={prompt} />
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Technical Expertise
            </h2>
            <p className="text-gray-600">
              최신 기술 스택을 활용한 효율적인 개발
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechCard
              icon={<Code2 size={24} />}
              title="Modern Frontend"
              description="React, TypeScript, Next.js를 활용한 현대적인 웹 개발"
              delay={0.1}
            />
            <TechCard
              icon={<Command size={24} />}
              title="Clean Architecture"
              description="확장 가능하고 유지보수가 용이한 아키텍처 설계"
              delay={0.2}
            />
            <TechCard
              icon={<Cpu size={24} />}
              title="Performance Optimization"
              description="웹 성능 최적화 및 사용자 경험 향상"
              delay={0.3}
            />
            <TechCard
              icon={<Globe size={24} />}
              title="International Service"
              description="다국어 지원 및 글로벌 서비스 개발 경험"
              delay={0.4}
            />
            <TechCard
              icon={<GitBranch size={24} />}
              title="Version Control"
              description="Git을 활용한 효율적인 협업 및 코드 관리"
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl font-bold text-gray-800 mb-8"
          >
            Let's Connect
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl p-8"
          >
            <p className="text-gray-600 mb-6">
              새로운 기회나 협업에 대해 이야기하고 싶으시다면 연락주세요
            </p>
            <a
              href="mailto:huina0901@naver.com"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg
                hover:bg-blue-700 transition-colors"
            >
              이메일 보내기
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
