export interface Participant {
  number: number;
  name: string;
  rank?: number;
  active: boolean;
}

export interface WinnerCounts {
  first: number;
  second: number;
  third: number;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export interface WinnerCardProps {
  number: number;
  name: string;
  rank: 1 | 2 | 3;
}

export interface ParticipantCardProps {
  number: number;
  name: string;
  isWinner: boolean;
  rank?: 1 | 2 | 3;
  active: boolean;
  onToggle: () => void;
}