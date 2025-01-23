import React, { useState } from 'react';
import {
  Badge,
  Beef,
  Boxes,
  Building,
  Building2,
  Carrot,
  Fence,
  GalleryVerticalEnd,
  Grid,
  Home,
  LayoutGrid,
  MinusCircle,
  PawPrint,
  Plus,
  PlusCircle,
  RotateCcw,
  Save,
  Trophy,
  Users,
  Wheat,
  X,
} from 'lucide-react';

interface ScoreCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  calculateScore: (count: number) => number;
  defaultValue?: number;
  color?: string;
}

const categories: ScoreCategory[] = [
  {
    id: 'fields',
    title: '밭 타일',
    icon: <Grid className="w-5 h-5" />,
    description: '농장에 있는 밭 타일의 개수를 입력하세요',
    color: 'from-amber-200 to-amber-300',
    calculateScore: (count) => {
      if (count <= 1) return -1;
      if (count === 2) return 1;
      if (count === 3) return 2;
      if (count === 4) return 3;
      return 4;
    },
  },
  {
    id: 'pastures',
    title: '우리',
    icon: <Fence className="w-5 h-5" />,
    description: '울타리로 구분된 우리의 개수를 입력하세요',
    color: 'from-emerald-200 to-emerald-300',
    calculateScore: (count) => {
      if (count === 0) return -1;
      return Math.min(count, 4);
    },
  },
  {
    id: 'grain',
    title: '곡식',
    icon: <Wheat className="w-5 h-5" />,
    description: '보유한 곡식의 개수를 입력하세요',
    color: 'from-yellow-200 to-yellow-300',
    calculateScore: (count) => {
      if (count === 0) return -1;
      if (count >= 8) return 4;
      if (count >= 6) return 3;
      if (count >= 4) return 2;
      return 1;
    },
  },
  {
    id: 'vegetables',
    title: '채소',
    icon: <Carrot className="w-5 h-5" />,
    description: '보유한 채소의 개수를 입력하세요',
    color: 'from-orange-200 to-orange-300',
    calculateScore: (count) => {
      if (count === 0) return -1;
      return Math.min(count, 4);
    },
  },
  {
    id: 'sheep',
    title: '양',
    icon: <Badge className="w-5 h-5" />,
    description: '보유한 양의 수를 입력하세요',
    color: 'from-blue-200 to-blue-300',
    calculateScore: (count) => {
      if (count === 0) return -1;
      if (count >= 8) return 4;
      if (count >= 6) return 3;
      if (count >= 4) return 2;
      return 1;
    },
  },
  {
    id: 'boar',
    title: '멧돼지',
    icon: <PawPrint className="w-5 h-5" />,
    description: '보유한 멧돼지의 수를 입력하세요',
    color: 'from-rose-200 to-rose-300',
    calculateScore: (count) => {
      if (count === 0) return -1;
      if (count >= 7) return 4;
      if (count >= 5) return 3;
      if (count >= 3) return 2;
      return 1;
    },
  },
  {
    id: 'cattle',
    title: '소',
    icon: <Beef className="w-5 h-5" />,
    description: '보유한 소의 수를 입력하세요',
    color: 'from-brown-200 to-brown-300',
    calculateScore: (count) => {
      if (count === 0) return -1;
      if (count >= 6) return 4;
      if (count >= 4) return 3;
      if (count >= 2) return 2;
      return 1;
    },
  },
  {
    id: 'unusedSpaces',
    title: '사용하지 않는 빈칸',
    icon: <LayoutGrid className="w-5 h-5" />,
    description: '사용하지 않는 빈칸의 개수를 입력하세요 (각 -1점)',
    color: 'from-red-200 to-red-300',
    calculateScore: (count) => -count,
  },
  {
    id: 'fencedStables',
    title: '울타리 친 외양간',
    icon: <Home className="w-5 h-5" />,
    description: '우리 안에 있는 외양간의 개수를 입력하세요',
    color: 'from-violet-200 to-violet-300',
    calculateScore: (count) => Math.min(count, 4),
  },
  {
    id: 'clayRooms',
    title: '흙집 방',
    icon: <Building className="w-5 h-5" />,
    description: '흙집 방의 개수를 입력하세요',
    color: 'from-amber-100 to-amber-200',
    calculateScore: (count) => count,
  },
  {
    id: 'stoneRooms',
    title: '돌집 방',
    icon: <Building2 className="w-5 h-5" />,
    description: '돌집 방의 개수를 입력하세요',
    color: 'from-slate-200 to-slate-300',
    calculateScore: (count) => count * 2,
  },
  {
    id: 'familyMembers',
    title: '가족 구성원',
    icon: <Users className="w-5 h-5" />,
    description: '가족 구성원의 수를 입력하세요 (각 3점)',
    color: 'from-pink-200 to-pink-300',
    calculateScore: (count) => count * 3,
    defaultValue: 2,
  },
  {
    id: 'cardPoints',
    title: '설비 점수',
    icon: <Boxes className="w-5 h-5" />,
    description: '설비 카드의 총 점수를 입력하세요',
    color: 'from-indigo-200 to-indigo-300',
    calculateScore: (count) => count,
  },
  {
    id: 'bonusPoints',
    title: '추가 점수',
    icon: <Trophy className="w-5 h-5" />,
    description: '기타 추가 점수를 입력하세요',
    color: 'from-yellow-200 to-yellow-300',
    calculateScore: (count) => count,
  },
];

interface Player {
  name: string;
  scores: Record<string, number>;
}

const AgricolaScoreCalculator = () => {
  const [players, setPlayers] = useState<Player[]>([
    {
      name: '플레이어 1',
      scores: Object.fromEntries(
        categories.map((cat) => [cat.id, cat.defaultValue || 0]),
      ),
    },
  ]);

  const [editingCell, setEditingCell] = useState<{
    playerId: number;
    categoryId: string;
  } | null>(null);

  const calculateTotal = (player: Player) => {
    return categories.reduce((total, category) => {
      return total + category.calculateScore(player.scores[category.id]);
    }, 0);
  };

  const addPlayer = () => {
    if (players.length < 4) {
      setPlayers([
        ...players,
        {
          name: `플레이어 ${players.length + 1}`,
          scores: Object.fromEntries(
            categories.map((cat) => [cat.id, cat.defaultValue || 0]),
          ),
        },
      ]);
    }
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
    setEditingCell(null);
  };

  const updateScore = (playerId: number, categoryId: string, value: number) => {
    const newPlayers = [...players];
    newPlayers[playerId].scores[categoryId] = Math.max(0, value);
    setPlayers(newPlayers);
  };

  const resetScores = () => {
    if (window.confirm('모든 점수를 초기화하시겠습니까?')) {
      setPlayers(
        players.map((player) => ({
          ...player,
          scores: Object.fromEntries(
            categories.map((cat) => [cat.id, cat.defaultValue || 0]),
          ),
        })),
      );
    }
  };

  const ScoreEditor = ({
    playerId,
    categoryId,
  }: {
    playerId: number;
    categoryId: string;
  }) => {
    const category = categories.find((c) => c.id === categoryId)!;
    const currentValue = players[playerId].scores[categoryId];
    const score = category.calculateScore(currentValue);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-xl bg-gradient-to-r ${category.color} text-white`}
              >
                {category.icon}
              </div>
              <h3 className="text-2xl font-bold">{category.title}</h3>
            </div>
            <button
              onClick={() => setEditingCell(null)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <p className="text-gray-600 mb-8">{category.description}</p>

          <div className="flex items-center justify-center gap-8 mb-8">
            <button
              onClick={() =>
                updateScore(playerId, categoryId, currentValue - 1)
              }
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={currentValue <= 0}
            >
              <MinusCircle size={32} />
            </button>

            <div className="text-center">
              <div className="text-6xl font-bold mb-2">{currentValue}</div>
              <div
                className={`text-xl font-semibold ${score < 0 ? 'text-red-500' : 'text-blue-600'}`}
              >
                점수: {score}
              </div>
            </div>

            <button
              onClick={() =>
                updateScore(playerId, categoryId, currentValue + 1)
              }
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <PlusCircle size={32} />
            </button>
          </div>

          <button
            onClick={() => setEditingCell(null)}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white
              rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all
              font-semibold text-lg shadow-lg hover:shadow-xl"
          >
            완료
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 pb-8 pt-24">
      <div className="max-w-6xl mx-auto p-4 pb-20">
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold mb-3 bg-gradient-to-r from-violet-500 to-indigo-500
          text-transparent bg-clip-text"
          >
            아그리콜라 점수 계산기
          </h1>
          <p className="text-gray-500">
            게임 종료 후 각 항목별 점수를 계산하고 기록해보세요
          </p>
        </div>

        {/* 플레이어 카드 */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-4 mb-8">
            {players.map((player, index) => (
              <div
                key={index}
                className="flex-1 relative bg-white rounded-2xl p-6 min-w-[200px]
                shadow-[0_10px_20px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)]
                border border-gray-100/50 backdrop-blur-sm transition-all duration-300"
              >
                <input
                  type="text"
                  value={player.name}
                  onChange={(e) => {
                    const newPlayers = [...players];
                    newPlayers[index].name = e.target.value;
                    setPlayers(newPlayers);
                  }}
                  className="w-full text-xl font-bold mb-3 bg-transparent outline-none border-b-2
                  border-transparent hover:border-gray-200 focus:border-violet-300 transition-colors"
                />
                <div
                  className="text-3xl font-bold bg-gradient-to-r from-violet-500 to-indigo-500
                text-transparent bg-clip-text"
                >
                  {calculateTotal(player)} 점
                </div>
                {players.length > 1 && (
                  <button
                    onClick={() => removePlayer(index)}
                    className="absolute -top-3 -right-3 bg-white text-red-400 rounded-xl p-2
                    hover:text-red-500 transition-colors shadow-lg hover:shadow-xl
                    border border-red-100 group"
                  >
                    <MinusCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </button>
                )}
              </div>
            ))}
            {players.length < 4 && (
              <button
                onClick={addPlayer}
                className="p-6 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500
                text-white hover:from-violet-600 hover:to-indigo-600 transition-all
                min-w-[80px] flex items-center justify-center shadow-lg hover:shadow-xl
                hover:scale-105 transform"
              >
                <Plus className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* 점수표 */}
          <div
            className="relative bg-white/80 rounded-2xl overflow-hidden backdrop-blur-sm
          shadow-[0_10px_20px_-10px_rgba(0,0,0,0.1)] border border-gray-100/50"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80">
                    <th
                      className="p-4 text-left font-bold text-gray-700 sticky left-0
                    bg-gray-50/90 backdrop-blur-sm border-r border-gray-200/50"
                    >
                      항목
                    </th>
                    {players.map((player, index) => (
                      <th
                        key={index}
                        className="p-4 text-gray-700 text-center min-w-[150px]
                      font-medium"
                      >
                        {player.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100/50">
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td
                        className="p-4 sticky left-0 bg-white/95 backdrop-blur-sm font-medium
                      border-r border-gray-100/50 flex items-center gap-3"
                      >
                        <div
                          className={`p-2.5 rounded-xl bg-gradient-to-r ${category.color} 
                        text-gray-700 shadow-sm`}
                        >
                          {category.icon}
                        </div>
                        {category.title}
                      </td>
                      {players.map((player, playerId) => (
                        <td
                          key={playerId}
                          onClick={() =>
                            setEditingCell({
                              playerId,
                              categoryId: category.id,
                            })
                          }
                          className="p-4 text-center cursor-pointer transition-all duration-200
                          hover:bg-violet-50/50 group relative"
                        >
                          <div className="font-bold text-lg mb-1">
                            {player.scores[category.id]}
                          </div>
                          <div
                            className={`text-sm font-medium ${
                              category.calculateScore(
                                player.scores[category.id],
                              ) < 0
                                ? 'text-red-400'
                                : 'text-violet-500'
                            }`}
                          >
                            {category.calculateScore(
                              player.scores[category.id],
                            )}{' '}
                            점
                          </div>
                          <div
                            className="absolute inset-1 border border-violet-200 opacity-0
                          group-hover:opacity-100 transition-all duration-300 rounded-xl
                          scale-95 group-hover:scale-100"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 font-bold">
                    <td
                      className="p-4 sticky left-0 bg-gray-50/90 backdrop-blur-sm border-r
                    border-gray-200/50 flex items-center gap-3"
                    >
                      <div
                        className="p-2.5 rounded-xl bg-gradient-to-r from-violet-200
                      to-indigo-200 text-gray-700 shadow-sm"
                      >
                        <GalleryVerticalEnd className="w-5 h-5" />
                      </div>
                      총점
                    </td>
                    {players.map((player, index) => (
                      <td key={index} className="p-4 text-center">
                        <div
                          className="text-2xl font-bold bg-gradient-to-r from-violet-500
                        to-indigo-500 text-transparent bg-clip-text"
                        >
                          {calculateTotal(player)} 점
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 하단 버튼 */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={resetScores}
              className="px-6 py-3 rounded-xl bg-white text-red-400 border border-red-100
              hover:bg-red-50 hover:text-red-500 transition-all shadow-sm hover:shadow
              flex items-center gap-2 group"
            >
              <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-180" />
              초기화
            </button>
            <button
              onClick={() => {
                alert('점수가 저장되었습니다!');
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500
              text-white hover:from-violet-600 hover:to-indigo-600 transition-all shadow-lg
              hover:shadow-xl flex items-center gap-2 group hover:scale-105 transform"
            >
              <Save className="w-5 h-5 transition-transform group-hover:scale-110" />
              저장
            </button>
          </div>
        </div>

        {/* 점수 수정 모달 */}
        {editingCell && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center
          justify-center z-50"
          >
            <div
              className="bg-white/95 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl
            border border-gray-100/50 backdrop-blur-sm"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${
                      categories.find((c) => c.id === editingCell.categoryId)
                        ?.color
                    } shadow-sm`}
                  >
                    {
                      categories.find((c) => c.id === editingCell.categoryId)
                        ?.icon
                    }
                  </div>
                  <h3 className="text-2xl font-bold text-gray-700">
                    {
                      categories.find((c) => c.id === editingCell.categoryId)
                        ?.title
                    }
                  </h3>
                </div>
                <button
                  onClick={() => setEditingCell(null)}
                  className="p-2 hover:bg-gray-100/80 rounded-xl transition-colors group"
                >
                  <X className="w-6 h-6 transition-transform group-hover:scale-110" />
                </button>
              </div>

              <p className="text-gray-600 mb-8">
                {
                  categories.find((c) => c.id === editingCell.categoryId)
                    ?.description
                }
              </p>

              <div className="flex items-center justify-center gap-8 mb-8">
                <button
                  onClick={() =>
                    updateScore(
                      editingCell.playerId,
                      editingCell.categoryId,
                      players[editingCell.playerId].scores[
                        editingCell.categoryId
                      ] - 1,
                    )
                  }
                  className="p-3 rounded-xl bg-gray-100/80 hover:bg-gray-200/80 transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed group"
                  disabled={
                    players[editingCell.playerId].scores[
                      editingCell.categoryId
                    ] <= 0
                  }
                >
                  <MinusCircle className="w-8 h-8 transition-transform group-hover:scale-110" />
                </button>

                <div className="text-center">
                  <div className="text-6xl font-bold mb-2 text-gray-700">
                    {
                      players[editingCell.playerId].scores[
                        editingCell.categoryId
                      ]
                    }
                  </div>
                  <div
                    className={`text-xl font-semibold ${
                      categories
                        .find((c) => c.id === editingCell.categoryId)
                        ?.calculateScore(
                          players[editingCell.playerId].scores[
                            editingCell.categoryId
                          ],
                        )! < 0
                        ? 'text-red-400'
                        : 'text-violet-500'
                    }`}
                  >
                    점수:{' '}
                    {categories
                      .find((c) => c.id === editingCell.categoryId)
                      ?.calculateScore(
                        players[editingCell.playerId].scores[
                          editingCell.categoryId
                        ],
                      )}
                  </div>
                </div>

                <button
                  onClick={() =>
                    updateScore(
                      editingCell.playerId,
                      editingCell.categoryId,
                      players[editingCell.playerId].scores[
                        editingCell.categoryId
                      ] + 1,
                    )
                  }
                  className="p-3 rounded-xl bg-gray-100/80 hover:bg-gray-200/80
                  transition-all group"
                >
                  <PlusCircle className="w-8 h-8 transition-transform group-hover:scale-110" />
                </button>
              </div>

              <button
                onClick={() => setEditingCell(null)}
                className="w-full py-4 bg-gradient-to-r from-violet-500 to-indigo-500
                text-white rounded-xl hover:from-violet-600 hover:to-indigo-600
                transition-all font-semibold text-lg shadow-lg hover:shadow-xl
                hover:scale-105 transform group"
              >
                <span className="relative inline-flex items-center gap-2">
                  완료
                  <X className="w-5 h-5 transition-transform group-hover:rotate-180" />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgricolaScoreCalculator;
