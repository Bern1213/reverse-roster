// src/App.jsx

import { useState } from "react";
import CharacterCard from "./components/CharacterCard";
import { characters } from "./data"; // 새로 구성한 데이터를 불러옵니다.
import "./App.css";

// 필터 바 컴포넌트 (App 외부에 정의)
const FilterBar = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { id: "all", label: "전체" },
    { id: "6", label: "6성" },
    { id: "5", label: "5성" },
    // 향후 분류 시 4성, 3성 등 추가 가능
  ];

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`filter-btn ${activeFilter === filter.id ? "active" : ""}`}
          onClick={() => setActiveFilter(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

function App() {
  const [selectedChars, setSelectedChars] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all"); // 활성화된 필터 (all, 6, 5)
  const [isLarge, setIsLarge] = useState(false);

  const toggleCharacter = (id) => {
    setSelectedChars((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getFilteredCharacters = () => {
    if (activeFilter === "all") return characters;
    return characters.filter((char) => char.rarity.toString() === activeFilter);
  };

  const getSelectedList = () => {
    return characters.filter((char) => selectedChars[char.id]);
  };

  return (
    <div className="container">
      <header className="main-header">
        <h1 className="logo-text">Reverse Roster</h1>
        <p className="subtitle-text">리버스: 1999 마도학자 명함 생성기</p>
      </header>

      {!showSummary ? (
        <>
          <FilterBar
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />

          <button
            className={`toggle-btn ${isLarge ? "active" : ""}`}
            onClick={() => setIsLarge(!isLarge)}
          >
            {isLarge ? "🖼️ 크게 보는 중" : "📱 작게 보는 중"}
          </button>

          <div className="character-grid">
            {getFilteredCharacters().map((char) => (
              <CharacterCard
                key={char.id}
                character={char}
                isSelected={!!selectedChars[char.id]}
                onToggle={toggleCharacter}
                isLarge={isLarge}
              />
            ))}
          </div>

          <div className="action-area">
            <button
              className="primary-btn"
              onClick={() => setShowSummary(true)}
            >
              내 명함 정리하기
            </button>
          </div>
        </>
      ) : (
        <div className="summary-section">
          <h2>내 보유 현황</h2>

          <div className="summary-content">
            <table className="summary-table">
              <thead>
                <tr>
                  <th>이미지</th>
                  <th>ID / 이름</th>
                  <th>성급</th>
                </tr>
              </thead>
              <tbody>
                {getSelectedList().length > 0 ? (
                  getSelectedList().map((char) => (
                    <tr key={char.id}>
                      <td className="table-img-cell">
                        <img
                          src={`/images/characters/${char.id}.png`}
                          alt={char.name || char.id}
                          className="table-img"
                        />
                      </td>
                      <td>{char.name || char.id}</td>
                      <td>
                        {char.rarity
                          ? "★".repeat(parseInt(char.rarity))
                          : "미분류"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">
                      선택된 캐릭터가 없습니다. 다시 선택해주세요.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="action-area">
            <button
              className="secondary-btn"
              onClick={() => setShowSummary(false)}
            >
              다시 선택하기
            </button>
            {/* 이미지 저장 기능은 아래에서 별도로 설명합니다. */}
            <button className="primary-btn">이미지로 저장 (구현 예정)</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
