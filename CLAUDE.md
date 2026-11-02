# 프로젝트 개요

이 프로젝트는 회사 디자인 시스템(FME Design System) 기반 HTML 프로토타입 작업용입니다.

- Figma 디자인 시스템: https://www.figma.com/design/ZqMuxjOwmf9N3MU9kZXSHz/FME_Design-System

# 규칙

## 디자인 토큰

- 모든 색상(color), 여백(spacing), 타이포그래피(typography)는 `tokens/tokens.css`에 정의된 CSS 변수만 사용한다.
- 색상 값, px 값 등을 코드에 직접 하드코딩하지 않는다. 필요한 값이 토큰에 없다면 임의로 하드코딩하지 말고, 먼저 토큰 추가 여부를 확인한다.

## 컴포넌트 네이밍

- 컴포넌트 이름은 Figma 컴포넌트명과 최대한 일치시킨다.
- 추후 Figma로 역이관(코드 → 디자인) 예정이므로, 네이밍 일관성을 유지해야 한다.

## 폴더 구조

회사에서 여러 제품을 함께 관리하므로 컴포넌트를 다음 기준으로 분리한다.

- `components/shared/` — 여러 제품에서 공통으로 쓰는 컴포넌트 (버튼, 인풋, 카드 등)
- `components/ai-social-media/` — ai-social-media 제품 전용 컴포넌트
- `components/student-management-system/` — student-management-system 제품 전용 컴포넌트
- `components/hr-tool/` — hr-tool 제품 전용 컴포넌트
- `components/governance-platform/` — governance-platform 제품 전용 컴포넌트
- `prototypes/` — 실제 화면 시안

공통으로 쓸 수 있는 컴포넌트는 `shared`에, 특정 제품에만 쓰이는 컴포넌트는 해당 제품 폴더에 둔다.

## 제품별 스타일 레퍼런스

- AI Social Media 제품 화면 작업 시 `components/ai-social-media/style-reference.md`를 항상 참고할 것.

## Design QA

- 스테이징 vs Figma 원본 디자인 QA 작업 시 `docs/design-qa-guide.md`를 항상 먼저 읽고 그 규칙대로 진행할 것.
