// src/data.js

// 이미지 파일명 기반으로 만든 캐릭터 데이터 템플릿입니다.
// 사용자님께서 수작업으로 이름(name)과 성급(rarity)을 채워 넣으시면 됩니다.
export const characters = [
  {
    id: "3003", // 캐릭터 고유 ID (앞 4자리)
    name: "드루비스",
    rarity: 6,
    // 현재 사용할 이미지 파일명 (나중에 스킨 선택 시 이 값만 02, 03으로 바꾸면 됨)
    displayImageId: "300301",
    tags: ["치명타", "열정 감소"],
  },
];
