# Design QA 가이드 (스테이징 vs Figma 원본)

AI Social Media (Pulse) 디자인 QA를 어느 컴퓨터에서든 같은 방식으로 이어서 하기 위한 규칙 모음.
Claude Code에서 QA를 시작할 때 이 파일을 먼저 읽게 한다. (CLAUDE.md에 안내되어 있음)

- Figma 파일: `FME_AI-Social-Media` (fileKey `N8AXYZVtz82rgHcCRHKzEl`)
- QA 작업 위치: `Design QA` 페이지 > `Design QA` 섹션 > 화면별 섹션
  - 예: `[Design QA] New content_step3(Image editing)` > `Overall`, `01 Elements`, `02 Text`, `03 brand`, `04 Uploads`, `05 AI improve`
- 디자인팀 라이브러리 파일: `FME_AI-Social-Media_For-Design-Team` (fileKey `mbVD7hkDkQGb0wU8NsmOKX`, 컴포넌트는 `♻️ components` 페이지)

---

## 1. 작업 흐름

1. 사용자가 **스테이징 캡처 노드 링크**와 **Figma 원본 노드 링크**를 준다. (스테이징은 html-to-figma 플러그인으로 가져온 프레임 또는 스크린샷)
2. 두 노드를 플러그인 스크립트로 덤프해서 실제 값을 비교한다.
   - 텍스트: 글자, fontSize, fontName(style), fill 변수 이름
   - 박스: 크기, cornerRadius, fill/stroke 변수 이름, strokeWeight, dashPattern
3. 스크린샷으로 눈으로도 확인한다. (`get_screenshot` 또는 slice + `screenshot()`)
4. 차이를 영역별로 묶어서 노트를 단다 (아래 규칙).
5. 결과를 스크린샷으로 확인하고, 채팅에는 한국어로 요약 보고한다.
6. 사용자가 이미 만들어둔 빈 노트/프레임에 써달라고 하면 그 안에 쓴다. 노트에 다른 화면 문구가 복사돼 남아 있으면 교체한다.

---

## 2. 무엇을 적고 무엇을 빼는가

**중심으로 적는 것 (2026-11-04 기준)**
- 텍스트 크기 (굵기 포함, 예: `11 Medium → 14 SemiBold`)
- 전체적인 색상 (텍스트, 배경, 보더 색 토큰)
- 눈에 띄게 다른 크기, Radius, 보더 두께, 형태(텍스트만 → 칩 등), 아이콘 교체
- 누락/추가/삭제할 요소, 레이아웃/순서 변경, 표시 내용 변경

**적지 않는 것**
- **Gap, Padding** (요소 사이 간격, 위 간격, 안쪽 여백 전부)
- **같은 색인 토큰 별칭**: 아래는 같은 값이므로 `[Colour]` 줄을 쓰지 않는다.
  - `text/primary` = `neutral/900`
  - `text/secondary` = `neutral/500`
  - 값이 실제로 바뀌는 경우만 적는다 (예: `text/primary → neutral/800`).
- **데이터 차이**: 브랜드 데이터, 컬러 개수, 사진 개수, 파일명 등 콘텐츠만 다른 것.
- **캡처 아티팩트**: 플러그인 캡처가 sticky footer 등을 잘못 배치한 것.
- 이전 화면에서 이미 정리한 내용은 반복하지 않고 `Same fixes as the X screen` 한 줄로 처리.
- 다른 디자이너 작업, 사용자가 직접 쓴 노트는 건드리지 않는다.

**확인 질문으로 남기는 것**: Figma 원본에서 한 셀에만 보이는 ··· 버튼, 체크박스, 선택 상태처럼 hover/selected 상태로 보이는 요소. 사용자에게 물어본 뒤 `on hover` 를 붙인다.

---

## 3. 노트 라벨 형식

- Figma 노트 언어: **영어** (채팅 보고는 한국어)
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

**태그 목록**: `[Size]` `[Text size]` `[Font weight]` `[Line height]` `[Radius]` `[Colour]` `[Border]` `[Layout]` `[Remove]` `[Add]` `[Content]` `[Icon]`
(`[Gap]`, `[Padding]` 은 더 이상 쓰지 않음)

- 색상은 토큰 이름으로 쓴다. 스테이징이 hex 하드코딩이면 hex 그대로 (`#F8F9FC → neutral/25`).
- 한 줄이 너무 길어 화면 요소(영상 등)를 덮으면 요소 이름을 줄이거나 두 줄로 나눈다. 토큰 이름은 줄이지 않는다.
- 사용자가 쓴 한국어 노트를 영어로 바꿔달라고 하면 뜻만 그대로 옮기고 글꼴/스타일은 유지한다.

---

## 4. 표시 스타일 (메인 QA, 빨강)

| 요소 | 스펙 |
|---|---|
| 색상 | 빨강, `error/text` 변수에 바인딩 (VariableID:7:3298). 파랑 금지 (제품 UI가 파란 톤이라 안 보임) |
| 영역 박스 `QA mark` | Rectangle, fill 없음, stroke 1.5, radius 4 |
| 누락 영역 | 들어갈 위치에 빨간 점선 가로선 (stroke 2) |
| 연결선 `QA leader` | Vector 1px, dashPattern [4,4] |
| 번호 배지 `QA area N` | 48×48 원, 빨강 fill, 숫자 DM Sans Bold 24, 흰색(`neutral/0`). 공간이 좁은 팝오버 등은 22px 원 + 12 Bold |
| 라벨 `QA label` | DM Sans 14, 제목 Bold, 태그 SemiBold, 나머지 Medium, 빨강 |

**배치 규칙**
- **수정 내용은 스테이징 쪽에 적는다.** 스테이징 화면: 영역별 빨간 박스 + 번호 배지 + **번호 바로 옆에 수정 내용**.
- Figma 원본: 같은 영역에 **빨간 점선 박스 + 같은 번호 배지만** (노트 없음).
- 번호는 화면(스크린)마다 1부터. 항목을 지우면 남은 번호를 다시 매기고, 양쪽(스테이징/원본) 배지를 같이 바꾼다.
- 노트 공간이 없으면 Figma 원본 패널(및 이후 화면 묶음)을 옆으로 옮기고 섹션 크기를 늘린다. 다른 페이지로는 옮기지 않는다.
- 노트가 화면 UI(예: `+ Add` 버튼)나 검은 영상 영역, 섹션 테두리를 덮지 않게 한다.
- 요소별로 따로 표시해달라고 하면: 요소마다 박스 + 바로 옆(빈 쪽)에 짧은 노트. 오른쪽 정렬 라벨을 패널 왼쪽 빈 공간에 두는 방식도 OK.
- 결과를 그룹으로 묶는다: `<화면명> · QA`

**연결선이 겹치지 않게**
- 수평/수직 직선 위주. 꺾은선이 필요하면 꺾이는 x 위치를 영역마다 다르게.
- 여러 박스가 한 줄(예: 하단 바)에 붙어 있으면: 박스 가운데에서 **아래로 곧게** 내리고, 노트를 계단식으로 쌓는다 (오른쪽 박스 노트가 맨 위). 각 노트는 자기 선 바로 오른쪽에서 시작.
- 그래도 교차하면 연결선 대신 박스 옆과 노트 앞에 **같은 작은 번호(1, 2, 3...)** 를 붙여 짝을 맞춘다.

---

## 5. 확대 비교 (Close-up, 파랑)

메인 화면이 "다글다글"해지면 컴포넌트를 따로 프레임으로 뺀다. 사용자가 빈 프레임(스테이징 컴포넌트 + Figma 컴포넌트)을 준비해 주면 그 안에 정리한다.

- 이름: 컴포넌트명 프레임 + 왼쪽 위에 파란 글자 배지 (`QA close-up A`)
- 글자는 화면마다 A부터. 항목을 지우거나 옮기면 다시 매기고, 본 화면 배지와 확대 비교 배지를 같이 바꾼다. 빈자리는 왼쪽/위로 당겨 채운다.
- 확대 비교 관련 표시는 모두 **파랑 #2663EB** (변수 없음, hex).
- 메인 스테이징 화면: 해당 영역에 파란 박스 + 연결선 + 파란 글자 배지 + 한 줄 (`Upload media · see close-up A below`). Figma 원본 쪽 배지도 같은 글자로 파랗게.
- 프레임 구성
  - 흰 배경. 왼쪽 As is(스테이징), 오른쪽 To be(Figma)
  - 높이: `[` 브래킷 (`M 4 0 L 0 0 L 0 h L 4 h`) + 왼쪽에 `56px` 라벨 (13 Medium)
  - 폭: 위쪽 치수선 (`M 0 4 L 0 0 L w 0 L w 4`) + `74px` 라벨
  - 아래에 스펙 블록 두 열: `As is (staging)` / `To be (Figma)` 제목 Bold + 한 줄씩 (13 Medium, 줄간격 20)
  - 높이 라벨이 프레임 밖으로 잘리면 프레임을 왼쪽으로 늘리고 자식은 같은 만큼 오른쪽으로 옮겨 캔버스 위치를 유지
- 대상이 작아 연결선이 한 점으로 몰리면, 전체 수치는 연결선 없이 `Sizes` 블록으로 모으고 특정 줄만 곧은 수평선으로 연결.

---

## 6. 섹션 정리 규칙

- **섹션 합치기**: 상위 섹션으로 감싸거나 한쪽 섹션을 넓혀 다른 쪽을 넣는다. 모든 하위 요소의 **캔버스 위치는 그대로** 유지하고, 비어버린 섹션은 지운다. 지라 번호(PD-19 등)가 붙은 섹션은 섹션째 유지하는 것을 기본으로 한다.
- **중복 정리**: 두 섹션을 전부 훑어 완전히 겹치는 항목/같은 요소의 다른 내용/한쪽에만 있는 항목으로 나눈 뒤, 더 자세한 쪽을 남기고 다른 쪽에만 있던 정보는 남는 쪽에 한 줄로 옮긴다. 지우기 전에 사용자 확인.
- **공통 항목**: 여러 화면(Image editing, Video editing 등)에 공통인 수정은 `Overall` 섹션에 묶는다. 옮길 때는 스테이징 화면을 복사해 넣고 관련 박스/연결선/배지/확대 비교를 같은 상대 위치로 옮긴 뒤, 원본에서 지운다.
- **순서**: 전체 텍스트/크기 기준 같은 넓은 변경을 먼저, 삭제/동작/개별 요소 수정을 뒤에.
- 빈 공간이 생기면 블록을 당기고 섹션 크기를 내용에 맞게 줄인다.

---

## 7. Figma 작업 공통 규칙

- 색상/텍스트는 파일의 실제 변수와 텍스트 스타일에 바인딩한다. 하드코딩은 해당 토큰이 없을 때만.
- 사용자가 둔 섹션/페이지 위치를 마음대로 다른 페이지로 옮기지 않는다 (같은 섹션 안 배치 조정은 OK).
- 다른 사람(예: Jeong) 작업, 사용자가 직접 만든 노트는 수정하지 않는다. 필요하면 말로 알린다.
- 내가 만든 이전 QA 노트를 다시 만들 때는 기존 그룹을 지우고 새로 만든다. 사용자가 그룹을 풀어버린 경우가 있으니 흩어진 `QA mark/area/leader/label` 이 남아 있는지 확인한다.
- 지우기 전에 대상이 내 노트인지 꼭 확인한다 (점선 필터로 다른 프레임의 점선까지 지운 적 있음).
- 라이브러리 컴포넌트 문제(예: 셀 안 아이콘이 찌그러짐)는 인스턴스에서 크기 덮어쓰기가 막혀 있다. 라이브러리 수정 vs Detach 중 사용자에게 먼저 묻는다.

**Plugin API 주의사항**
- 텍스트에 U+2028 문자가 있으면 JSON 응답이 깨진다. 출력 전에 ASCII로 정리. 코드 안에 ` ` 정규식을 쓰면 전송 중 실제 줄바꿈이 되어 문법 오류가 나므로 `String.fromCharCode(8232)` 를 쓴다.
- `fontSize`, `fontName` 이 mixed(symbol)일 수 있으니 문자열 변환 전에 처리.
- 오토레이아웃 안에 넣는 표시 요소는 `layoutPositioning = 'ABSOLUTE'`.
- **GRID 오토레이아웃 안에 새 요소를 끼워 넣지 않는다.** 플러그인 렌더에선 보여도 실제 Figma 화면에서 다른 카드에 가려질 수 있다. 일반 프레임 안에 x/y를 직접 지정해서 넣는다.
- 그룹 자식 좌표는 그룹의 부모(섹션) 기준. 그룹 자식을 clone하면 위치가 틀어질 수 있다.
- slice 스크린샷에서 image fill은 안 보일 수 있다.
- `setPluginData` 는 지원 안 됨 (`setSharedPluginData` 사용).
- 스크립트 중간에 에러가 나면 그 호출의 변경은 전부 되돌려진다. 다시 실행 전에 상태를 확인.
- 라이브러리 인스턴스 안쪽 노드의 크기/위치/rescale은 덮어쓰기 불가.

---

## 8. 기타 노트 스타일

**핸드오프 노트 (Notes 프레임)**: 짧은 영어 제목 + 1~3줄 + `[KR]` 블록. 숫자/ID/파일명 없이. 프레임 이름은 2단계 (`Notes · Meta Ads Performance`).

**사용자의 파란 QA 노트 (`QA · Notes` 프레임)**: 짧은 영어 문장. 새 노트가 필요하면 기존 노트를 복제해 같은 스타일로.

**변경 표시**: 필요 없는 섹션은 연한 빨강, 필요 없는 화면은 파란 점선 + 섹션 끝으로 이동, 새 화면은 파란 실선 + 파란 노트. 큰 구조 변경은 텍스트 계획을 먼저 보여주고 OK 받은 뒤 작업.

**UI 문구**: "Paid" 대신 "Meta Ads".

**개발자 답변/코멘트**: 짧고 부드러운 영어. 이유 한 줄 + 요청 한 줄. 예:
> Hi! Since the other columns are all left-aligned, I think it would look better to left-align this one too. Could you set the column width based on the longest label, "Informative Educational", and then left-align the text? Thank you!

---

## 9. 지라 티켓 양식

영어, em dash 금지. 섹션의 영역 순서대로.

```
Title
[Design QA] <화면>: <주요 항목 나열> (<날짜>)

Description
Design QA for the <화면>. Staging was compared with the Figma design. Details and references are in the Figma section `<섹션 이름>`.
Figma: <섹션 링크>

1. <영역 이름>
- <요소>: <변경>
...

Question (no change yet)
- <확인 질문>

Acceptance criteria
- <완료 기준>
```

- 노트가 모호하면 화면 표시(파란 선, 박스)를 보고 해석해서 쓰고, 그렇게 해석했다고 채팅에 알린다.
- 확정이 아닌 제안은 "please consider ..." 로.

---

## 10. 업무 보고 양식

**영어 (보고용)**: 불렛 목록형, em dash 금지.

```
AI Social Media (Pulse): <범위> Design QA

* <화면/영역>: Reviewed ..., documenting approximately N issues across ...
* <화면/영역>:
   * <하위>: ...
* QA Documentation & Handoff: Created N As-Is / To-Be comparisons, ...
* Overall: Reviewed N screens ..., documenting approximately N UI issues and N detailed component comparisons.
```

**한국어 (간략 정리)**: 화면별 굵은 제목 + 불렛, 마지막에 "남은 결정 사항".

---

## 11. 다른 컴퓨터에서 이어서 하기

1. 저장소를 받는다: `git clone git@github.com:formee-design/formee-education.git` (이미 있으면 `git pull`)
2. 그 폴더에서 Claude Code를 연다. `CLAUDE.md` 가 이 가이드를 읽으라고 안내한다.
3. Claude Code에서 Figma MCP 연결을 확인한다.
4. 시작 메시지 예시:
   > `docs/design-qa-guide.md` 규칙대로 QA 해줘. 스테이징: <노드 링크>, Figma 원본: <노드 링크>
5. 채팅 보고는 한국어, Figma 노트는 영어.
6. 새 규칙이 생기면 이 파일에 추가하고 커밋/푸시해서 다른 컴퓨터와 맞춘다.
