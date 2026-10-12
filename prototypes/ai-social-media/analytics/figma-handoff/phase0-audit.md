# 0단계 — 토큰·컴포넌트 대조 (2026-10-12)

대상 Figma: `N8AXYZVtz82rgHcCRHKzEl`
- 화면: 섹션 **new** `12616:521591` (250, 4382 · 17692×7026)
- 새 컴포넌트: 섹션 **Component** `12617:521623` (250, 11805 · 7742×4028, 현재 비어 있음)

## 1. 디자인 토큰 대조

### 1-1. 색 — 전부 있음 ✅
HTML이 쓰는 색 변수 18개가 모두 Figma 변수 "AI Social Media / Colors"에 같은 값으로 있다.

| HTML 변수 | Figma 변수 | 값 |
|---|---|---|
| --color-neutral-0 / 50 / 75 / 100 / 150 / 200 / 400 / 500 / 700 / 900 | neutral/0 … neutral/900 | 같음 |
| --color-brand-primary / -dark / -light / -mid / -pale | brand/primary, primary-dark, primary-light, primary-mid, primary-pale | #4f6de6 · #1e5fd9 · #dce7fb · #a8cbff · #cad4ff |
| --color-brand-link | brand/link | #3182f6 |
| --color-badge-green-text | badge/green/text | #027a48 |

차트 색 매핑(이 순서 그대로 쓴다)
- 플랫폼: Instagram brand/primary-dark · TikTok brand/primary · Facebook brand/link · REDnote brand/primary-mid · LinkedIn brand/primary-pale
- 유형: Video brand/primary · Image brand/primary-mid · Carousel brand/primary-pale · Multi-Image Post brand/primary-light · 0건 neutral/200

### 1-2. 텍스트 스타일 — 전부 있음 ✅
| HTML (크기/줄높이 + 굵기) | Figma 텍스트 스타일 |
|---|---|
| display-sm 22/30 Bold, -0.1 | Display/sm |
| text-xl 16/24 SemiBold (지표 값) | Text/xl SemiBold |
| text-md 14/22 SemiBold (순위) | Text/md SemiBold |
| text-sm 13/20 Regular / Medium / SemiBold | Text/sm Regular / Medium / SemiBold |
| text-xs 12/18 Regular / Medium / SemiBold | Text/xs Regular / Medium / SemiBold |
| 차트 축·라벨 12 | Text/xs Regular (막대 합계·선택 띠 라벨은 Text/xs SemiBold) |

### 1-3. 간격·모서리 — 하나 빼고 있음
| HTML 값 | Figma 변수 |
|---|---|
| 2 · 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 56 | spacing/2 · xs · sm · md · lg · xl · 2xl · 3xl · 4xl · 6xl |
| 3 · 6 · 7 · 10 · 14 · 28 | spacing/3 · 6 · 7 · 10 · 14 · 28 |
| **60** (Main Content 아래 여백) | ❌ **없음** |
| radius 4 · 6 · 8 · 12 · 9999 | radius/sm · md · lg · xl · full |
| 테두리 1 | border/width-1 |
| 선 차트 영역 투명도 60% | opacity/60 |

크기 값(열 폭 120·110·140·220, 날짜 칸 240, 범례 280, 도넛 180, 차트 높이 200·260, 썸네일 56·40, 팝오버 376)은 간격 토큰이 아니라 레이아웃 크기다. Figma에서도 고정 폭으로 두고 변수는 연결하지 않는다.

### 1-4. 효과
- 카드: 그림자 없음
- 딥링크 링(3px, brand/primary-mid): 효과 스타일이 없다. 색만 변수로 연결하고 spread 3 그림자로 그린다 (A5·A6 전용)
- 팝오버(Date Picker, 옵션 목록): 컴포넌트에 들어 있는 그림자를 그대로 쓴다

## 2. 컴포넌트 대조

### 2-1. 그대로 쓰는 것
| 용도 | Figma 컴포넌트 | 쓰는 방법 |
|---|---|---|
| 사이드바 | Nav / Navigation `383:6230` State=expanded | Nav / Item Analytics Active=true |
| 상단 바 | Nav / App TopBar `1773:19830` | 경로 "Analytics" / "Analytics › Post Performance" (2단 경로는 1단계에서 지원 여부 확인) |
| 기간 선택 | **Controls / Segmented Control** `3174:1775` (안에 Segment Chip `2131:1321`) | Show Segment 3·4 켜기, 라벨 30 days / 90 days / All time / Custom |
| 카드 탭 (Platform/Type 등) | Controls / Segmented Control `3174:1775` | 2개·3개·4개(Views/Likes/Comments/CPL) |
| 날짜 칸 | Input `1956:51741` Size=SM · 36, **Type=Date**, Filled=True (Default / Focused) | 폭 240 |
| 날짜 선택 | **Date Picker** `12624:11616` Time=Without time, View=Days / Month | new 섹션에 놓아둔 인스턴스 3개(`12631:523304`·`523464`·`523305`)를 그대로 옮겨 씀 |
| Apply | Actions / Button `2921:1107` Style=Primary | |
| KPI 줄 | Stats summary `11530:112377` | Show sublabel(Analytics on / Post Performance off) |
| 섹션 머리 | Trends / Section Header `11667:181974` | Show badge "Integration Pending", Show description |
| 필터 pill | Controls / Filter / Select `3544:1796` | 기본 = State=Inactive · Light, 선택됨 = State=Active · Dark ("× Platform \| REDnote") |
| 옵션 목록 | Controls / Context Menu `5478:111500` Type=Option list + Menu / Option detail `5478:3046` | |
| 칩 | Feedback / Status Chip `5004:126953` | Best = Green · Paid = Blue · Organic = Secondary |
| View all → / View posts → / Show 20 more | Actions / Text Button `2207:57022` Size=36 (표 안 링크는 Size=24) | |
| 빈 상태 | empty-state `11998:470231` Type=No content, Size=Default (페이지) / Size=Compact (섹션) | |
| 표 머리·행 기반 | Schedule / List Column Head `9137:132243`, Schedule / List Row `9137:132233` | 구조 참고용. 열 구성이 달라 새 행 컴포넌트를 만든다(2-3) |
| 차트 툴팁 | Editor / Panel Action Row/Tooltip `4554:89321` | 선 차트 호버 |
| 아이콘 | icon / social / instagram · tiktok · facebook · linkedin, icon / chevron-right, icon / ai / sparkle-outline-color, icon / eye, icon / shape / heart, icon / shape / chat, icon / data / trending-up · chart-column-big, icon / nav / library · billing, icon / ui / spinner, icon / circle-alert | 전부 있음 |

### 2-2. 기존 컴포넌트에 추가가 필요한 것
| 컴포넌트 | 필요한 것 | 제안 |
|---|---|---|
| Stats summary | Post Performance는 5칸 | **Show 5th item** 불리언 + Value 5 / Label 5 / Icon 5 추가. 기본값 off라 기존 화면은 바뀌지 않는다 |
| Nav / App TopBar | 2단 경로 "Analytics › Post Performance" | 기존 Breadcrumb 속성으로 되면 그대로 쓰고, 안 되면 Breadcrumb 2단 옵션 추가 |

### 2-3. 새로 만들 컴포넌트 (Component 섹션 `12617:521623`)

> 2026-10-12 수정: 사용자 요청으로 **꼭 필요한 것만** 남겼다. 남은 것 = C6 · C7(+ Series Dot) · C9 · C10 · C11 · C14. C1 · C2 · C3 · C4 · C5 · C8 · C12 · C13은 삭제하고 화면에서는 기존 컴포넌트 인스턴스(Segmented Control, Input Type=Date, Actions / Button, empty-state, 툴팁) + 프레임으로 구성했다. 판단 기준: 기존 컴포넌트 조합으로 되거나 도형·텍스트뿐인 것은 만들지 않는다. 열 구성과 상태가 있는 표 행처럼 기존 컴포넌트로 대체할 수 없는 반복 패턴만 만든다.
이름은 HTML 클래스와 맞추고 앞에 `Analytics /`를 붙인다.

| # | 컴포넌트 | 변형 / 속성 | 쓰는 곳 |
|---|---|---|---|
| C1 | Analytics / Period Row | Period=30 days·90 days·All time·Custom. Custom이면 날짜 칸 2개 + "to" + Apply 표시 (안에서 Segmented Control, Input Date, Button 인스턴스 사용) | 두 화면 헤더 |
| C2 | Analytics / Chart Legend Item | Series=플랫폼 5 + 유형 4, Size=8 · 10 | Over Time 범례 |
| C3 | Analytics / Bar Segment | Series=플랫폼 5, State=Default · Hover (흰 2px 안쪽 테두리) | 누적 막대 |
| C4 | Analytics / HBar Row | 라벨 · 값 텍스트, State=Default · Hover | Published Mix · Platform |
| C5 | Analytics / Donut Legend Row | 라벨 · 값, Zero=false · true, State=Default · Hover | Published Mix · Type |
| C6 | Analytics / Perf Table Head | Name 라벨(Platform / Content type), Best 라벨(Best format / Best platform) | Content Performance |
| C7 | Analytics / Perf Row | Level=Group · Sub, Expanded=false · true, Mark=Icon · Dot, State=Default · Hover | Content Performance |
| C8 | Analytics / Insight Banner | 문구 텍스트 | Content Performance 아래 |
| C9 | Analytics / Top Post Row | 순위 · 썸네일 · 제목 · 부제 · 지표 4칸(Views · Likes · Comments · Engagement) | Top Organic Posts |
| C10 | Analytics / Posts Table Head | Paid columns=false · true | Post Performance 표 |
| C11 | Analytics / Posts Row | Status=Organic · Paid, Paid columns=false · true | Post Performance 표 |
| C14 | icon / social / rednote (placeholder) | 20×20 프레임 + 점(brand/primary-mid). 컴포넌트로 만들어 두면 한 번에 교체 가능 | Content Performance, 필터 |
| C12 | Analytics / Empty Panel | 섹션 빈 상태 = neutral/100 계열 패널 + empty-state Compact (글리프 아이콘 바꿈 가능) | 모든 섹션 빈 상태 |
| C13 | Analytics / Line Chart Marker | 점선 가이드 + 점 + 툴팁 | 선 차트 호버 |

차트 본체(막대 높이, 도넛 조각 각도, 선 모양)는 데이터마다 달라서 컴포넌트로 고정하지 않는다. 화면마다 프레임으로 그리되 모든 색·간격은 변수에 연결하고, 반복되는 조각(C2·C3·C4·C5·C13)만 인스턴스로 쓴다.

## 3. new 섹션 배치 계획
가로 간격 200, 세로 줄 사이 400. 각 줄 위에 줄 제목, 각 프레임 위에 케이스 라벨(4단계에서 추가).

| 줄 | y (섹션 기준) | 내용 |
|---|---|---|
| 01 Analytics · 화면 | 600 | A1 · A2 · A3 · A4 · A5 · A6 · 90 days · All time |
| 02 Analytics · 상태 조각 | 약 2800 | A2-1 · A2-2 · A7 · A8 · A9 · A10 · A11 |
| 03 Post Performance · 화면 | 약 4400 | P1 · P2 · P3 · P4 · P4-1 · P5 · P6 · P8 · P9 |
| 04 Post Performance · 상태 조각 | 약 7000 | P7 · P10 |

- 지금 섹션 높이(7026)로는 부족하다. 그리면서 섹션을 아래로 늘린다.
- 지금 y 257에 있는 Date Picker 3개는 A2-1·A2-2 조각으로 옮겨서 쓴다.

## 4. 결정 사항 (2026-10-12 사용자 확정)
1. **Figma에 토큰이 없는 값(spacing 60 등)은 값 그대로 쓴다.** 새 변수는 만들지 않는다
2. **Stats summary에 5번째 칸 옵션을 추가한다:** Show 5th item + Value 5 / Label 5 / Icon 5 / Sublabel 5. 기본값 off
3. **HTML 확인 항목은 이관 전에 정하고 반영했다** (README 5절). Figma는 반영된 HTML을 기준으로 그린다
4. **REDnote 아이콘:** 다른 소셜 아이콘과 같은 20×20 프레임 안에 점을 넣는다. 레이어 이름은 `icon / social / rednote (placeholder)`로 해서 나중에 사용자가 교체하기 쉽게 둔다
