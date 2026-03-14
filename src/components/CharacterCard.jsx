// src/components/CharacterCard.jsx
import { useState } from 'react';

function CharacterCard({ character, isSelected, onToggle, isLarge }) {
  // id를 활용해 동적으로 이미지 경로 생성 (예: /images/characters/300301.png)
  const imageUrl = isLarge? `/images/characters/${character.displayImageId}.png` : `/images/characters_small/${character.id}.png`;
  const [imageError, setImageError] = useState(false);

  // 별 개수 렌더링 함수 (성급 데이터가 없을 경우를 대비해 예외 처리 추가)
  const renderRarity = (rarity) => {
    if (!rarity || isNaN(rarity)) return "미분류";
    return '★'.repeat(parseInt(rarity));
  };

  return (
    <div
      className={`char-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onToggle(character.id)}
    >
      <div className="char-image-container">
        {imageError ? (
          <div className="char-placeholder">
            <span>미분류</span>
            <span>({character.id})</span>
          </div>
        ) : (
          <img 
            src={imageUrl} 
            alt={character.name || character.id} 
            className="char-image" 
            onError={() => setImageError(true)} // 이미지 로딩 실패 시 placeholder 표시
          />
        )}
      </div>
      
      <div className="char-info">
        <strong className="char-name">
          {character.name || character.id} {/* 이름이 없으면 ID 표시 */}
        </strong>
        <span className="rarity">{renderRarity(character.rarity)}</span>
      </div>
    </div>
  );
}

export default CharacterCard;