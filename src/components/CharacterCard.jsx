// src/components/CharacterCard.jsx

function CharacterCard({ character, isSelected, onToggle }) {
  // id를 활용해 동적으로 이미지 경로 생성 (예: /images/regulus.png)
//   const imageUrl = `/images/${character.id}.png`;

  return (
    <div
      className={`char-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onToggle(character.id)}
    >
      {/* 나중에 실제 이미지가 준비되면 주석을 풀고 img 태그를 사용하세요 */}
      {/* <img src={imageUrl} alt={character.name} className="char-image" /> */}
      
      {/* 현재는 임시 박스로 표시 */}
      <div className="char-placeholder">이미지</div>
      
      <div className="char-info">
        <strong>{character.name}</strong>
        <span className="rarity">{'★'.repeat(character.rarity)}</span>
        
        {/* 태그 중 첫 번째 것만 대표로 살짝 보여주기 (옵션) */}
        <span className="tag-preview">{character.tags[0]}</span>
      </div>
    </div>
  );
}

export default CharacterCard;