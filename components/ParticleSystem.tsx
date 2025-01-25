import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';
import { random } from 'lodash-es';

// 파티클 생성을 위한 헬퍼 함수
function generateParticles(count: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    // Random position in sphere
    const radius = random(5, 10);
    const theta = THREE.MathUtils.randFloatSpread(360);
    const phi = THREE.MathUtils.randFloatSpread(360);

    positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
    positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i3 + 2] = radius * Math.cos(theta);

    // Random colors
    colors[i3] = random(0.5, 1); // R
    colors[i3 + 1] = random(0.5, 1); // G
    colors[i3 + 2] = random(0.5, 1); // B
  }

  return { positions, colors };
}

interface ParticleSystemProps {
  count?: number;
  size?: number;
  speed?: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 1000,
  size = 0.1,
  speed = 0.1,
}) => {
  const points = useRef<THREE.Points>(null);
  const [particles] = useState(() => generateParticles(count));

  useFrame((state) => {
    if (!points.current) return;

    // Rotate the entire particle system
    points.current.rotation.x += speed * 0.01;
    points.current.rotation.y += speed * 0.02;

    // 각 파티클의 위치를 시간에 따라 조금씩 변경
    const positions = points.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      positions[i + 1] += Math.cos(state.clock.elapsedTime + i) * 0.001;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </Points>
  );
};
