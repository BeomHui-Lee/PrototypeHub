import Image from 'next/image';

// AI 도구 인터페이스 정의
export interface AITool {
  name: string;
  description: string;
  iconPath: string;
  color: string;
}

// AI 도구 목록 정의
export const aiTools: AITool[] = [
  {
    name: 'GPT',
    description: '자연어 처리 및 코드 생성',
    iconPath: '/images/ai-icons/openai.png',
    color: '#10A37F',
  },
  {
    name: 'Claude',
    description: '자연어 처리 및 코드 생성',
    iconPath: '/images/ai-icons/anthropic.png',
    color: '#8A3BF6',
  },
  {
    name: 'AI Assistant',
    description: '개발 어시스턴트',
    iconPath: '/images/ai-icons/assistant.png',
    color: '#0070F3',
  },
  {
    name: 'Gemini',
    description: '멀티모달 AI 활용',
    iconPath: '/images/ai-icons/gemini.png',
    color: '#4285F4',
  },
  {
    name: 'DALL·E 3',
    description: '이미지 생성 및 편집',
    iconPath: '/images/ai-icons/dalle.png',
    color: '#FF5700',
  },
  {
    name: 'RunwayML',
    description: '동영상 생성 및 편집',
    iconPath: '/images/ai-icons/runway.png',
    color: '#F24E1E',
  },
  {
    name: 'SORA',
    description: '동영상 생성 및 편집',
    iconPath: '/images/ai-icons/sora.png',
    color: '#10A37F',
  },
  {
    name: 'SUNO',
    description: '노래 생성 및 편집',
    iconPath: '/images/ai-icons/suno.png',
    color: '#FF6B6B',
  },
  {
    name: 'Perplexity',
    description: '웹 검색 및 정보 수집',
    iconPath: '/images/ai-icons/perplexity.png',
    color: '#5E35B1',
  },
  {
    name: 'Cody',
    description: '개발 어시스턴트',
    iconPath: '/images/ai-icons/cody.png',
    color: '#FF9800',
  },
  {
    name: 'Pika',
    description: '사진 편집',
    iconPath: '/images/ai-icons/pika.png',
    color: '#FF4081',
  },
];

interface AIIconProps {
  tool: AITool;
  size?: number;
  className?: string;
}

export const AIIcon = ({ tool, size = 24, className = '' }: AIIconProps) => {
  return (
    <div
      className={`relative rounded-md overflow-hidden flex-shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src={tool.iconPath}
        alt={`${tool.name} 아이콘`}
        width={size}
        height={size}
        className="object-contain w-full h-full"
        onError={(e) => {
          // 이미지 로드 실패 시 백업 색상 배경 표시
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.style.backgroundColor =
            tool.color || '#cbd5e1';
          e.currentTarget.parentElement!.textContent = tool.name.charAt(0);
          e.currentTarget.parentElement!.style.display = 'flex';
          e.currentTarget.parentElement!.style.justifyContent = 'center';
          e.currentTarget.parentElement!.style.alignItems = 'center';
          e.currentTarget.parentElement!.style.color = '#ffffff';
          e.currentTarget.parentElement!.style.fontWeight = 'bold';
        }}
      />
    </div>
  );
};
