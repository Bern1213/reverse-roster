// src/App.jsx
import { useState } from 'react';
import CharacterCard from './components/CharacterCard';
import { characters } from './data'; // 분리한 진짜 데이터를 불러옵니다.
import './App.css';

function App() {
  const [selectedChars, setSelectedChars] = useState({});
  const [showSummary, setShowSummary] = useState(false);

  const toggleCharacter = (id) => {
    setSelectedChars((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getSelectedList = () => {
    // 이제 mockCharacters 대신 불러온 characters 배열을 필터링합니다.
    return characters.filter((char) => selectedChars[char.id]);
  };

  return (
    <div className="container">
      <header>
        <h1>Reverse Roster</h1>
        <p>리버스: 1999 마도학자 명함 생성기</p>
      </header>

      {!showSummary ? (
        <>
          <div className="filter-section">
            <span>필터 임시 영역: </span>
            <button>6성</button>
            <button>5성</button>
            <button>추가 공격</button>
            <button>중독</button>
          </div>

          <div className="character-grid">
            {characters.map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                isSelected={!!selectedChars[char.id]}
                onToggle={toggleCharacter}
              />
            ))}
          </div>

          <div className="action-section">
            <button className="primary-btn" onClick={() => setShowSummary(true)}>
              내 명함 정리하기
            </button>
          </div>
        </>
      ) : (
        <div className="summary-section">
          <h2>내 보유 현황</h2>
          <table className="summary-table">
            <thead>
              <tr>
                <th>이름</th>
                <th>성급</th>
                <th>주요 태그</th> {/* 영감 대신 태그로 변경 */}
              </tr>
            </thead>
            <tbody>
              {getSelectedList().length > 0 ? (
                getSelectedList().map((char) => (
                  <tr key={char.id}>
                    <td>{char.name}</td>
                    <td>{'★'.repeat(char.rarity)}</td>
                    {/* 태그 배열을 쉼표로 연결해서 텍스트로 보여줍니다 */}
                    <td>{char.tags.join(', ')}</td> 
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">선택된 캐릭터가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="action-section">
            <button className="secondary-btn" onClick={() => setShowSummary(false)}>
              다시 선택하기
            </button>
            <button className="primary-btn">이미지로 저장 (구현 예정)</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;