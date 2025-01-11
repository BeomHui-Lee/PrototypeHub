import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticipantManager from '../../components/LotterySimulator/ParticipantManager';
import {
  ButtonProps,
  CardProps,
  NumberInputProps,
  Participant,
  ParticipantCardProps,
  WinnerCardProps,
  WinnerCounts,
} from '../../types/game';

// 초기 참가자 데이터
const initialParticipants: Participant[] = Array.from(
  { length: 5 },
  (_, i) => ({
    number: i + 1,
    name: `참가자${i + 1}`,
    active: true,
  }),
);

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-lg ${className}`}>{children}</div>
);

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
  className = '',
  ...rest
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
    text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all 
    disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg
    transform hover:-translate-y-0.5 active:translate-y-0 
    mobile:w-full mobile:py-4 ${className}`}
    {...rest}
  >
    {children}
  </button>
);

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 50,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <input
      type="number"
      value={value}
      onChange={(e) => {
        const newValue = Math.max(
          min,
          Math.min(max, parseInt(e.target.value) || 0),
        );
        onChange(newValue);
      }}
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      mobile:text-lg mobile:py-3"
      min={min}
      max={max}
    />
  </div>
);

const WinnerCard: React.FC<WinnerCardProps> = ({ number, name, rank }) => {
  const rankColors = {
    1: 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-yellow-100',
    2: 'border-blue-200 bg-white',
    3: 'border-green-200 bg-white',
  };

  return (
    <div
      className={`
      px-4 py-3 rounded-lg border-2 text-center transition-all duration-300
      ${rankColors[rank]} shadow-sm hover:shadow-md
      mobile:py-4
    `}
    >
      <span className={`font-medium ${rank === 1 ? 'text-lg' : ''}`}>
        {number}번 {name}
      </span>
    </div>
  );
};

const ParticipantCard: React.FC<ParticipantCardProps> = ({
  number,
  name,
  isWinner,
  rank,
  active,
  onToggle,
}) => (
  <div
    onClick={onToggle}
    className={`
      px-3 py-2 rounded-md text-sm transition-all duration-200 cursor-pointer
      ${
        isWinner
          ? `bg-${rank === 1 ? 'yellow' : rank === 2 ? 'blue' : 'green'}-100 
           text-${rank === 1 ? 'yellow' : rank === 2 ? 'blue' : 'green'}-800 
           font-medium`
          : active
            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            : 'bg-gray-50 text-gray-400 hover:bg-gray-100'
      }
      mobile:py-3 mobile:text-base
    `}
  >
    {number}번 {name}
  </div>
);

const LotterySimulator: React.FC = () => {
  const navigate = useNavigate();
  const [participants, setParticipants] =
    useState<Participant[]>(initialParticipants);
  const [winners, setWinners] = useState<Participant[]>([]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [animationStep, setAnimationStep] = useState<number>(0);
  const [counts, setCounts] = useState<WinnerCounts>({
    first: 1,
    second: 2,
    third: 3,
  });

  const totalWinners = counts.first + counts.second + counts.third;

  const shuffle = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const drawWinners = () => {
    const activeParticipants = participants.filter((p) => p.active);
    if (totalWinners > activeParticipants.length) {
      alert('당첨자 수가 전체 참가자 수보다 많습니다!');
      return;
    }

    setIsAnimating(true);
    setWinners([]);

    const shuffled = shuffle(participants.filter((p) => p.active));
    const allWinners = shuffled.slice(0, totalWinners);

    const finalWinners = [
      ...shuffle(allWinners.slice(0, counts.first)).map((w) => ({
        ...w,
        rank: 1,
      })),
      ...shuffle(
        allWinners.slice(counts.first, counts.first + counts.second),
      ).map((w) => ({ ...w, rank: 2 })),
      ...shuffle(allWinners.slice(counts.first + counts.second)).map((w) => ({
        ...w,
        rank: 3,
      })),
    ];

    // 2초 동안의 애니메이션 효과
    let step = 0;
    const animationInterval = setInterval(() => {
      step++;
      setAnimationStep(step);

      if (step >= 8) {
        // 8단계의 애니메이션 (각 250ms)
        clearInterval(animationInterval);
        setWinners(finalWinners);
        setIsAnimating(false);
        setAnimationStep(0);
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pb-8">
      <header className="w-full bg-white shadow-md py-6 mb-8">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center mobile:px-2">
          <h1 className="text-3xl font-bold text-gray-800 mobile:text-2xl">
            추첨 시뮬레이터
          </h1>
          <Button
            onClick={() => navigate('/')}
            className="!px-4 !py-2 !text-base mobile:!px-3"
          >
            홈으로
          </Button>
        </div>
      </header>

      <div className="w-full max-w-4xl mx-auto px-4 space-y-8 mobile:px-2">
        <Card>
          <div className="p-6 space-y-8 mobile:p-4">
            {/* 참가자 관리 */}
            <ParticipantManager
              participants={participants}
              onUpdate={setParticipants}
            />

            {/* 인원수 설정 */}
            <div className="grid grid-cols-3 gap-4 mobile:grid-cols-1 mobile:gap-3 text-gray-800 placeholder:text-gray-400">
              <NumberInput
                label="1등 인원"
                value={counts.first}
                onChange={(value) =>
                  setCounts((prev) => ({ ...prev, first: value }))
                }
                min={0}
                max={50}
              />
              <NumberInput
                label="2등 인원"
                value={counts.second}
                onChange={(value) =>
                  setCounts((prev) => ({ ...prev, second: value }))
                }
                min={0}
                max={50}
              />
              <NumberInput
                label="3등 인원"
                value={counts.third}
                onChange={(value) =>
                  setCounts((prev) => ({ ...prev, third: value }))
                }
                min={0}
                max={50}
              />
            </div>

            {/* 총 인원 표시 */}
            <div className="text-center text-gray-600 mobile:text-lg">
              총 당첨 인원: {totalWinners}명
            </div>

            {/* 버튼 영역 */}
            <div className="flex justify-center gap-4 mobile:flex-col mobile:gap-3">
              <Button onClick={drawWinners} disabled={isAnimating}>
                {isAnimating
                  ? `추첨중... ${Math.round((animationStep / 8) * 100)}%`
                  : '추첨 시작'}
              </Button>
            </div>

            {/* 당첨자 결과 */}
            {winners.length > 0 && (
              <div className="space-y-6">
                {/* 1등 */}
                {counts.first > 0 && (
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border-2 border-yellow-200 mobile:p-4">
                    <h3 className="text-xl font-bold text-center mb-4 text-yellow-800">
                      1등 ({counts.first}명)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mobile:grid-cols-1">
                      {winners
                        .filter((w) => w.rank === 1)
                        .map((winner) => (
                          <WinnerCard
                            key={winner.number}
                            number={winner.number}
                            name={winner.name}
                            rank={1}
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* 2등 */}
                {counts.second > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 mobile:p-4">
                    <h3 className="text-xl font-bold text-center mb-4 text-blue-800">
                      2등 ({counts.second}명)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mobile:grid-cols-1">
                      {winners
                        .filter((w) => w.rank === 2)
                        .map((winner) => (
                          <WinnerCard
                            key={winner.number}
                            number={winner.number}
                            name={winner.name}
                            rank={2}
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* 3등 */}
                {counts.third > 0 && (
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-200 mobile:p-4">
                    <h3 className="text-xl font-bold text-center mb-4 text-green-800">
                      3등 ({counts.third}명)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mobile:grid-cols-1">
                      {winners
                        .filter((w) => w.rank === 3)
                        .map((winner) => (
                          <WinnerCard
                            key={winner.number}
                            number={winner.number}
                            name={winner.name}
                            rank={3}
                          />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 참가자 목록 */}
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">
                참가자 상태
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setParticipants((prev) =>
                      prev.map((p) => ({ ...p, active: true })),
                    )
                  }
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  전체 참여
                </button>
                <button
                  onClick={() =>
                    setParticipants((prev) =>
                      prev.map((p) => ({ ...p, active: false })),
                    )
                  }
                  className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  전체 제외
                </button>
              </div>
              <div className="grid grid-cols-2 mt-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mobile:grid-cols-1">
                {participants.map((participant) => {
                  const winner = winners.find(
                    (w) => w.number === participant.number,
                  );
                  return (
                    <ParticipantCard
                      key={participant.number}
                      number={participant.number}
                      name={participant.name}
                      isWinner={!!winner}
                      rank={winner?.rank as 1 | 2 | 3 | undefined}
                      active={participant.active}
                      onToggle={() => {
                        setParticipants((prev) =>
                          prev.map((p) =>
                            p.number === participant.number
                              ? { ...p, active: !p.active }
                              : p,
                          ),
                        );
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LotterySimulator;
