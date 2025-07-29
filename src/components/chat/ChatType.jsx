import { useState } from 'react';
import { CHAT_TYPE_LIST } from '@/constants/chatType';
import {
  ButtonRound,
  BUTTON_THEMES,
  BUTTON_SIZES,
} from '@/components/common/ButtonRound';

export const ChatType = ({ onTypeChange, initialType = 'ALL' }) => {
  const [selectedType, setSelectedType] = useState(initialType);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    onTypeChange?.(type);
  };

  return (
    <div className="flex w-full items-start gap-4">
      {CHAT_TYPE_LIST.map((type) => (
        <ButtonRound
          key={type.id}
          onClick={() => handleTypeChange(type.id)}
          theme={
            selectedType === type.id
              ? BUTTON_THEMES.SELECTED
              : BUTTON_THEMES.SHADOW_BORDER
          }
          size={BUTTON_SIZES.SHORT}
          text={type.name}
        />
      ))}
    </div>
  );
};
