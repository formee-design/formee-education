# Design QA 가이드 (스테이징 vs Figma 원본)

AI Social Media (Pulse) 디자인 QA를 어느 컴퓨터에서든 같은 방식으로 이어서 하기 위한 규칙 모음.
Claude Code에서 QA를 시작할 때 이 파일을 먼저 읽게 한다.

- Figma 파일: `FME_AI-Social-Media` (fileKey `N8AXYZVtz82rgHcCRHKzEl`)
- QA 작업 위치: `Design QA` 페이지 > `Design QA` 섹션 > 화면별 섹션 (예: `Image editing` > `01 Elements`, `02 Text`, `03 brand`, `Uploads`, `Overall`)
- 디자인팀 컴포넌트 파일: `FME_AI-Social-Media_For-Design-Team` (fileKey `mbVD7hkDkQGb0wU8NsmOKX`)

---

## 1. 작업 흐름

1. 사용자가 **스테이징 캡처 노드 링크**와 **Figma 원본 노드 링크**를 준다. (스테이징은 html-to-figma 플러그인으로 가져온 프레임 또는 스크린샷)
2. 두 노드를 플러그인 스크립트로 덤프해서 실제 값을 비교한다.
   - 텍스트: 글자, fontSize, fontName(style), fill 변수 이름
   - 박스: 크기, cornerRadius, padding, itemSpacing, fill/stroke 변수 이름, strokeWeight, dashPattern
   - 간격은 요소 위치 차이로 계산한다 (예: 타이틀 bottom → 다음 요소 top)
3. 스크린샷으로 눈으로도 확인한다. (`get_screenshot` 또는 slice + `screenshot()`)
4. 차이를 영역별로 묶어서 노트를 단다 (아래 규칙).
5. 결과를 스크린샷으로 확인하고, 채팅에는 한국어로 요약 보고한다.

---

## 2. 무엇을 적고 무엇을 빼는가

**적는 것**: 크기, 텍스트 크기/굵기, 색상(토큰), 보더, Radius, Padding, Gap, 레이아웃/순서, 누락되거나 추가해야 할 요소, 아이콘 교체.

**빼는 것**
- **같은 색인 토큰 별칭**: 아래는 같은 값이므로 `[Colour]` 줄을 쓰지 않는다.
  - `text/primary` = `neutral/900`
  - `text/secondary` = `neutral/500`
  - 값이 실제로 바뀌는 경우만 적는다 (예: `text/primary → neutral/800` 은 적는다).
- **데이터 차이**: 브랜드 데이터, 컬러 개수, 사진 개수, 파일명 등 콘텐츠만 다른 것.
- **캡처 아티팩트**: 플러그인 캡처가 sticky footer 등을 잘못 배치한 것. 실제 화면 문제인지 확인 전에는 적지 않는다.
- 이전 화면에서 이미 정리한 내용은 반복하지 않고 `Same fixes as the X screen` 한 줄로 처리.
- 다른 디자이너 작업, 사용자가 직접 쓴 노트는 건드리지 않는다.

**확인 질문으로 남기는 것**: Figma 원본에서 한 셀에만 보이는 ··· 버튼, 체크박스, 선택 상태처럼 hover/selected 상태로 보이는 요소. 노트에는 넣지 않거나 사용자에게 물어본 뒤 `on hover` 를 붙인다.

---

## 3. 노트 라벨 형식

- 언어: **영어** (채팅 보고는 한국어)
- **em dash(—), en dash(–) 절대 사용 금지.** `-`, `:`, `·`, 쉼표를 쓴다.
- 영역 제목 1줄(Bold) + 변경 1줄씩(태그는 SemiBold, 나머지 Medium)
- 형식: `[Tag] Element · staging → Figma` 또는 제목이 요소를 말해주면 `[Tag] staging → Figma`

```
Edit in Brand Kit button
[Size] 203×32 → 292×38
[Radius] 6 → 8
[Border] 0.5px border/subtle → 1px neutral/400
[Text size] 11 Regular → 13 SemiBold
```

**태그 목록**: `[Size]` `[Text size]` `[Font weight]` `[Line height]` `[Padding]` `[Gap]` `[Radius]` `[Colour]` `[Border]` `[Layout]` `[Remove]` `[Add]` `[Content]`

- 텍스트 크기와 굵기가 같이 바뀌면 `[Text size]` 한 줄에 같이 쓴다 (`11 Medium → 14 SemiBold`).
- 색상은 토큰 이름으로 쓴다. 스테이징이 hex 하드코딩이면 hex 그대로 (`#F8F9FC → neutral/25`).
- 한 줄이 너무 길어 화면 요소(영상 등)를 덮으면 요소 이름을 줄이거나 두 줄로 나눈다. 토큰 이름은 줄이지 않는다.

---

## 4. 표시 스타일 (메인 QA, 빨강)

| 요소 | 스펙 |
|---|---|
| 색상 | 빨강, `error/text` 변수에 바인딩 (VariableID:7:3298). 파랑 금지 (제품 UI가 파란 톤이라 안 보임) |
| 영역 박스 `QA mark` | Rectangle, fill 없음, stroke 1.5, radius 4 |
| 누락 영역 | 들어갈 위치에 빨간 점선 가로선 (stroke 2) |
| 연결선 `QA leader` | Vector 1px, dashPattern [4,4] |
| 번호 배지 `QA area N` | 48×48 원, 빨강 fill, 숫자 DM Sans Bold 24, 흰색(`neutral/0`) |
| 라벨 `QA label` | DM Sans 14, 제목 Bold, 태그 SemiBold, 나머지 Medium, 빨강 |

**배치 규칙**
- 스테이징 화면: 영역별 빨간 박스 + 번호 배지 + **번호 바로 옆에 수정 내용**.
- Figma 원본: 같은 영역에 **빨간 점선 박스 + 같은 번호 배지만** (노트 없음).
- 번호는 화면(스크린)마다 1부터 다시 시작.
- 노트 공간이 없으면 Figma 원본 패널(및 이후 화면 묶음)을 옆으로 옮기고 섹션 폭을 늘린다. 다른 페이지로는 옮기지 않는다.
- 노트가 길어 다음 영역과 겹치면 다음 배지를 아래로 내리고, 연결선은 꺾은선(박스 → 꺾임 → 배지)으로. 꺾이는 x 위치를 영역마다 다르게 해서 세로선이 합쳐지지 않게 한다.
- 배지/노트가 화면 UI(예: `+ Add` 버튼)나 검은 영상 영역을 덮지 않게 한다.
- 결과를 그룹으로 묶는다: `<화면명> · QA` (예: `Brand Logos tab · QA`, `Uploads panel · QA`)

---

## 5. 확대 비교 (Close-up, 파랑)

메인 화면에 다 쓰기엔 복잡한 컴포넌트는 따로 프레임으로 뺀다.

- 이름: 컴포넌트명 프레임 + 그룹 `<컴포넌트> · QA`, 왼쪽 위에 파란 글자 배지 (`QA close-up A`)
- 글자는 화면마다 A부터 다시 시작.
- 확대 비교 관련 표시는 모두 **파랑 #2663EB** (변수 없음, hex).
- 메인 스테이징 화면에는 해당 컴포넌트에 파란 박스 + 연결선 1개 + 파란 글자 배지만 단다 (필요하면 `Brand Fonts · see close-up A below` 라벨).
- 프레임 구성
  - 흰 배경 프레임, 상단에 `As is` / `To be` 캡션 (24), 가운데 화살표
  - As is: 스테이징 컴포넌트 복제, To be: Figma 원본 복제 (clip 프레임으로 필요한 부분만)
  - 높이: `[` 브래킷 (`M 4 0 L 0 0 L 0 h L 4 h`) + 왼쪽에 `56px` 라벨 (13 Medium)
  - 폭: 위쪽 치수선 (`M 0 4 L 0 0 L w 0 L w 4`) + `74px` 라벨
  - 수치 라벨: 13 Medium 파랑, 연결선 1px dash [3,3]
- **선이 겹치지 않게**: 대상이 작아서 연결선이 한 점으로 몰리면, 전체에 해당하는 수치는 연결선 없이 컴포넌트 아래 `Sizes` 블록으로 모으고, 특정 줄(아이콘, 선택 상태)만 그 높이에서 곧은 수평선으로 연결한다.
- 바뀌어야 하는 부분(아이콘 교체, 선택 상태 색상)은 해당 요소에 파란 박스/점선 박스를 치고 라벨 앞부분을 SemiBold로 강조.

---

## 6. Figma 작업 공통 규칙

- 색상/텍스트는 파일의 실제 변수와 텍스트 스타일에 바인딩한다. 하드코딩은 해당 토큰이 없을 때만.
- 사용자가 둔 섹션/페이지 위치를 마음대로 바꾸지 않는다 (같은 섹션 안 배치 조정은 OK).
- 다른 사람(예: Jeong) 작업, 사용자가 직접 만든 노트는 수정하지 않는다. 필요하면 말로 알린다.
- 내가 만든 이전 QA 노트를 다시 만들 때는 기존 그룹을 지우고 새로 만든다. 사용자가 그룹을 풀어버린 경우가 있으니 같은 위치에 흩어진 `QA mark/area/leader/label` 이 남아 있는지 확인한다.
- 지우기 전에 대상이 내 노트인지 꼭 확인한다 (점선 필터로 다른 프레임의 점선까지 지운 적 있음).

**Plugin API 주의사항**
- 텍스트에 U+2028 문자가 있으면 JSON 응답이 깨진다. 이스케이프/치환.
- 오토레이아웃 안에 넣는 표시 요소는 `layoutPositioning = 'ABSOLUTE'`.
- 그룹 자식을 clone하면 위치가 틀어질 수 있다. 새로 만드는 게 안전.
- slice 스크린샷에서 image fill은 안 보일 수 있다.
- `fontSize`, `fontName` 이 mixed(symbol)일 수 있으니 문자열 변환 전에 처리.
- 그룹 자식 좌표는 그룹의 부모(섹션) 기준.

---

## 7. 기타 노트 스타일

**핸드오프 노트 (Notes 프레임)**: 짧은 영어 제목 + 1~3줄 + `[KR]` 블록. 숫자/ID/파일명 없이. 프레임 이름은 2단계 (`Notes · Meta Ads Performance`).

**변경 표시**: 필요 없는 섹션은 연한 빨강, 필요 없는 화면은 파란 점선 + 섹션 끝으로 이동, 새 화면은 파란 실선 + 파란 노트. 큰 구조 변경은 텍스트 계획을 먼저 보여주고 OK 받은 뒤 작업.

**UI 문구**: "Paid" 대신 "Meta Ads".

---

## 8. 업무 보고 양식

불렛 목록형, 영어, em dash 금지.

```
AI Social Media (Pulse): <범위> Design QA

* <화면/영역>: Reviewed ..., documenting approximately N issues across ...
* <화면/영역>:
   * <하위>: ...
* QA Documentation & Handoff: Created N As-Is / To-Be comparisons, ...
* Overall: Reviewed N screens ..., documenting approximately N UI issues and N detailed component comparisons.
```

---

## 9. 다른 컴퓨터에서 이어서 하기

1. 이 저장소를 받는다: `git clone git@github.com:formee-design/formee-education.git` (이미 있으면 `git pull`)
2. Claude Code에서 Figma MCP 연결을 확인한다.
3. 시작 메시지 예시:
   > `docs/design-qa-guide.md` 규칙대로 QA 해줘. 스테이징: <노드 링크>, Figma 원본: <노드 링크>
4. 채팅 보고는 한국어, Figma 노트는 영어.
