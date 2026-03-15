// src/App.jsx
import { useState } from "react";
import CharacterCard from "./components/CharacterCard";
import { characters } from "./data";
import "./App.css";

// FilterBar 컴포넌트를 함수 밖으로 이동
const FilterBar = ({ activeFilter, setActiveFilter }) => {
    const filters = [
        { id: "all", label: "전체" },
        { id: "6", label: "6성" },
        { id: "5", label: "5성" },
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
    const [activeFilter, setActiveFilter] = useState("all");
    const [isLarge, setIsLarge] = useState(false);
    // 1. 필터 창 열림/닫힘 상태 추가
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const toggleCharacter = (id) => {
        setSelectedChars((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const getFilteredCharacters = () => {
        if (activeFilter === "all") return characters;
        return characters.filter(
            (char) => char.rarity.toString() === activeFilter,
        );
    };

    const getSelectedList = () => {
        return characters.filter((char) => selectedChars[char.id]);
    };

    return (
        <div className="container">
            <header className="main-header">
                <h1 className="logo-text">Reverse Roster</h1>
                <p className="subtitle-text">
                    리버스: 1999 마도학자 명함 생성기
                </p>
            </header>

            {!showSummary ? (
                <>
                    {/* 2. 컨트롤 바 (필터 버튼 & 스위치) */}
                    <div className="control-bar">
                        <button
                            className="filter-toggle-btn"
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                            </svg>
                            필터 {isFilterOpen ? "닫기" : "열기"}
                        </button>

                        {/* iOS 스타일 토글 스위치 */}
                        <div className="toggle-wrapper">
                            <span className="toggle-label">크게 보기</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={isLarge}
                                    onChange={() => setIsLarge(!isLarge)}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>

                    {/* 3. 필터 창 (isFilterOpen이 true일 때만 보임) */}
                    {isFilterOpen && (
                        <div className="filter-panel">
                            <FilterBar
                                activeFilter={activeFilter}
                                setActiveFilter={setActiveFilter}
                            />
                        </div>
                    )}

                    <div
                        className={`character-grid ${isLarge ? "large" : "small"}`}
                    >
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
                                                    ? "★".repeat(
                                                          parseInt(char.rarity),
                                                      )
                                                    : "미분류"}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">
                                            선택된 캐릭터가 없습니다. 다시
                                            선택해주세요.
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
                        <button className="primary-btn">
                            이미지로 저장 (구현 예정)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
