import React from 'react';
import { PlusCircle, Trash2, User } from 'lucide-react';
import { Participant } from '../../types/game';

interface ParticipantManagerProps {
  participants: Participant[];
  onUpdate: (participants: Participant[]) => void;
}

const ParticipantManager: React.FC<ParticipantManagerProps> = ({
  participants,
  onUpdate,
}) => {
  const addParticipant = () => {
    const newNumber =
      participants.length > 0
        ? Math.max(...participants.map((p) => p.number)) + 1
        : 1;

    onUpdate([
      ...participants,
      {
        number: newNumber,
        name: `참가자${newNumber}`,
        active: true,
      },
    ]);
  };

  const removeParticipant = (number: number) => {
    onUpdate(participants.filter((p) => p.number !== number));
  };

  const updateParticipantName = (number: number, name: string) => {
    onUpdate(
      participants.map((p) => (p.number === number ? { ...p, name } : p)),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
          <User size={20} />
          참가자 목록
        </h3>
        <button
          onClick={addParticipant}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-green-500 text-white rounded-lg
            hover:bg-green-600 transition-colors"
        >
          <PlusCircle size={16} />
          추가
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {participants.map((participant) => (
          <div
            key={participant.number}
            className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-200"
          >
            <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-medium text-gray-700">
              {participant.number}
            </div>
            <input
              type="text"
              value={participant.name}
              onChange={(e) =>
                updateParticipantName(participant.number, e.target.value)
              }
              className="flex-1 px-2 py-1 border border-gray-200 rounded focus:outline-none focus:ring-2
                focus:ring-blue-500 focus:border-transparent"
              placeholder="이름 입력"
            />
            <button
              onClick={() => removeParticipant(participant.number)}
              className="p-1 text-red-500 hover:text-red-600 transition-colors"
              title="참가자 제거"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantManager;
