import { useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface FloatingTextProps {
  text: string;
  position: [number, number, number];
  color?: string;
  size?: number;
}

export const FloatingText: React.FC<FloatingTextProps> = ({
  text,
  position,
  color = '#ffffff',
  size = 1,
}) => {
  const textRef = useRef<Group>(null);

  useFrame((state) => {
    if (!textRef.current) return;

    // 부드러운 floating 애니메이션
    textRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime) * 0.2;

    // 마우스 위치에 따른 회전
    const mouseX = (state.mouse.x * Math.PI) / 10;
    const mouseY = (state.mouse.y * Math.PI) / 10;

    textRef.current.rotation.x = mouseY;
    textRef.current.rotation.y = mouseX;
  });

  return (
    <group ref={textRef} position={position}>
      <Text
        color={color}
        fontSize={size}
        maxWidth={100}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="/fonts/Pretendard-Bold.woff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};
